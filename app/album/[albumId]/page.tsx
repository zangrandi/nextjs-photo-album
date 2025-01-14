// app/album/[id]/page.tsx
import React from "react";
import { prisma } from "@/lib/prisma";

async function fetchAlbumPictures(albumId: string) {
  const album = await prisma.album.findFirst({
    where: {
      id: { equals: 1 }
    },
    include: { pictures: true }
  });

  if (!album) {
    throw new Error("Album not found");
  }

  return album;
}

export default async function AlbumPage({ params }: { params: { albumId: string } }) {
  const { albumId } = params;

  let album;
  try {
    album = await fetchAlbumPictures(albumId);
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Failed to load album.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{album.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {album.pictures.map((picture) => (
          <div key={picture.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={picture.url}
              alt={picture.title}
              className="w-full h-auto rounded-lg"
            />
            <h2 className="text-sm font-medium mt-2 truncate">{picture.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
