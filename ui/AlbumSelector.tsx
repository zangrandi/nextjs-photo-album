'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AlbumSelector: React.FC = () => {
  const [albumId, setAlbumId] = useState("");
  const router = useRouter();

  const handleGoToAlbum = () => {
    if (albumId.trim()) {
      router.push(`/album/${albumId}`);
    } else {
      alert("Please enter a valid album ID.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side: Explanation */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Discover Your Memories</h1>
        <p className="text-lg mb-6 max-w-md text-center leading-relaxed">
          Welcome to our photo album website! Simply enter your album code to access your personalized collection of pictures.
          If the album doesn’t exist, we’ll create it for you. Start storing and sharing memories effortlessly.
        </p>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex justify-center items-center bg-white p-8">
        <div className="w-full max-w-sm bg-gray-100 p-8 shadow-lg rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Enter the Album Code</h1>
          <input
            type="text"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            placeholder="Super secret code"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGoToAlbum}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Album
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumSelector;
