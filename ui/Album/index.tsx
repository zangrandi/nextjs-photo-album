"use client"

import React, { useState, useEffect } from "react";
import UploadForm from "@/ui/Picture/UploadForm";
import Picture from "@/ui/Picture";
import { Picture as PictureType, Album as AlbumType } from "@prisma/client";

interface Params {
  code: string;
}

const Album: React.FC<Params> = ({ code }) => {
  const [album, setAlbum] = useState<AlbumType & { pictures: PictureType[] } | null>(null);

  const fetchAlbum = async () => {
    const response = await fetch(`/api/album/${code}`).then((res) => res.json());
    setAlbum(response);
  };

  const deletePicture = async (pictureId: number) => {
    await fetch(`/api/picture/${pictureId}`, {
      method: "DELETE",
    });

    fetchAlbum();
  }

  useEffect(() => {
    fetchAlbum();
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {album ? (
        <>
          <h1 className="text-3xl font-bold text-center" style={{ marginTop: '5rem' }}>Album {album.code}</h1>
          <UploadForm albumId={album.id} fetchAlbum={fetchAlbum} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {album.pictures?.map((picture) => (
              <Picture key={picture.id} picture={picture} deletePicture={deletePicture} />
            ))}
          </div>
        </>
      ) : <div className="text-center">Loading...</div>}
    </div>
  );
}

export default Album;
