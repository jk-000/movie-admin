"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddMovieModal from "./AddMovieModel";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    if (isCheckingAuth) return;

    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/movies`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setMovies(data);
        } else if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Failed to fetch movies", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [isCheckingAuth]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
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
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading movies...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-200"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-40 sm:h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
                </p>
                <p className="text-sm text-gray-500 mt-1">⭐ Rating: {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
