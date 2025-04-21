"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";

export default function AddMovieModal() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [shortName, setShortName] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState<string[]>([]);
  const [starCast, setStarCast] = useState<string[]>([]); // Changed to string[]
  const [director, setDirector] = useState("");
  const [creator, setCreator] = useState("");
  const [quality, setQuality] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]); // Changed to string[]
  const [downloadLinks, setDownloadLinks] = useState([
    { resolution: "480p", link: "" },
    { resolution: "720p", link: "" },
  ]);
  const [trailer, setTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [isWebSeries, setIsWebSeries] = useState(false);
  const [episodes, setEpisodes] = useState<string[]>([]); // Changed to string[]
  const [zipFileLink, setZipFileLink] = useState("");

  const handleDownloadLinkChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedLinks = [...downloadLinks];
    updatedLinks[index][field] = value;
    setDownloadLinks(updatedLinks);
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


  const handleAddDownloadLink = () => {
    setDownloadLinks([...downloadLinks, { resolution: "", link: "" }]);
  };

  const handleSubmit = async () => {
    const movieData = {
      title,
      poster,
      shortName,
      rating,
      genre,
      starCast,
      director,
      creator,
      quality,
      language,
      category,
      screenshots,
      downloadLinks,
      trailer,
      description,
      isWebSeries,
      episodes,
      zipFileLink,
    };

    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${API_BASE_URL}/api/movies/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify(movieData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Movie added successfully!");
        // Clear form
        setTitle("");
        setPoster("");
        setShortName("");
        setRating("");
        setGenre([]);
        setStarCast([]);
        setDirector("");
        setCreator("");
        setQuality("");
        setLanguage("");
        setCategory("");
        setScreenshots([]);
        setDownloadLinks([
          { resolution: "480p", link: "" },
          { resolution: "720p", link: "" },
        ]);
        setTrailer("");
        setDescription("");
        setIsWebSeries(false);
        setEpisodes([]);
        console.log("Movie added:", data);
      } else {
        toast.error(data?.error || "Failed to add movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      toast.error("Something went wrong while adding movie.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Movie</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="space-y-4 pb-4">
          <h2 className="text-lg font-semibold">Add New Movie</h2>
          {/* Scrollable form section */}
          <div
            className="space-y-4 overflow-y-auto pr-2"
            style={{ maxHeight: "70vh" }}
          >
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Poster</Label>
              <Input
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
              />
            </div>
            <div>
              <Label>Sort name</Label>
              <Input
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </div>
            <div>
              <Label>Rating</Label>
              <Input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div>
              <Label>Genre</Label>
              <Input
                value={genre}
                onChange={(e) => setGenre(e.target.value.split(","))}
              />
            </div>

            <div>
              <Label>Star Cast (comma-separated, Optional)</Label>
              <Input
                value={starCast}
                onChange={(e) => setStarCast(e.target.value.split(","))}
              />
            </div>
            <div>
              <Label>Director (Optional)</Label>
              <Input
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <div>
              <Label>Creator (Optional)</Label>
              <Input
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>
            <div>
              <Label>Quality</Label>
              <Input
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              />
            </div>
            <div>
              <Label>Language</Label>
              <Input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <Label>Screenshots (comma-separated URLs)</Label>
              <Textarea
                value={screenshots}
                onChange={(e) => setScreenshots(e.target.value.split(","))}
                rows={4} // Adjust the number of rows to make the textarea larger
                placeholder="Enter comma-separated URLs"
              />
            </div>

            {/* Updated: resolution instead of quality */}
            <div>
              <Label>Download Links</Label>
              {downloadLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={link.resolution}
                    onChange={(e) =>
                      handleDownloadLinkChange(
                        index,
                        "resolution",
                        e.target.value
                      )
                    }
                    placeholder="Resolution (e.g., 480p)"
                  />
                  <Input
                    value={link.link}
                    onChange={(e) =>
                      handleDownloadLinkChange(index, "link", e.target.value)
                    }
                    placeholder="Download Link"
                  />
                </div>
              ))}
              <Button onClick={handleAddDownloadLink} className="mt-2">
                Add Another Download Link
              </Button>
            </div>

            <div>
              <Label>Trailer Link (Optional)</Label>
              <Input
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Checkbox
                checked={isWebSeries}
                onChange={(e) => setIsWebSeries(e.target.checked)}
              />
              <Label>Is this a Web Series?</Label>
            </div>

            {isWebSeries && (
              <>
                <div>
                  <Label>Episodes (comma-separated links)</Label>
                  <Input
                    value={episodes}
                    onChange={(e) => setEpisodes(e.target.value.split(","))}
                  />
                </div>
                <div>
                  <Label>Zip File Link (for Web Series)</Label>
                  <Input
                    value={zipFileLink}
                    onChange={(e) => setZipFileLink(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
