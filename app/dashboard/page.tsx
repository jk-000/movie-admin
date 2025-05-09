"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddMovieModal from "./AddMovieModel";
import { Button } from "@/components/ui/button";

// Define Movie type
interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string[] | string; // This can be a single string or an array of strings
  rating: number;
}

const DashboardPage = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]); // Use Movie[] type
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/"); // Redirect to login if not authenticated
    } else {
      setIsCheckingAuth(false); // If authenticated, stop checking
    }
  }, [router]);

  useEffect(() => {
    if (isCheckingAuth) return; // Skip if still checking authentication

    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/movies`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setMovies(data);
        } else if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          setMovies([]); // If no movies, set empty array
        }
      } catch (error) {
        console.error("Failed to fetch movies", error);
        setMovies([]); // Set empty array if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [isCheckingAuth]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/"); // Redirect to login page after logout
  };

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">🎬 Dashboard</h2>
        <div className="flex gap-3">
          <AddMovieModal />
          <Button
            className="bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading movies...</div>
      ) : (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white border rounded-xl shadow hover:shadow-md transition duration-200 overflow-hidden"
            >
              <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {Array.isArray(movie.genre)
                    ? movie.genre.join(", ")
                    : movie.genre}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ⭐ Rating: {movie.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
