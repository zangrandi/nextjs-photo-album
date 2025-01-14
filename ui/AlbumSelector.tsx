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
    <div className="flex items-center justify-center bg-gray-100" style={{ height: '88vh' }}>
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Input the Album ID</h1>
        <input
          type="text"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          placeholder="Enter album ID"
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
  );
};

export default AlbumSelector;
