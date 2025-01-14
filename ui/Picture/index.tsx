"use client"

import React from 'react';
import { Picture as PictureType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  picture: PictureType; // Define the object structure or use `Record<string, any>` for generic objects
  deletePicture: (id: number) => void;
}

const Picture: React.FC<Params> = ({ picture, deletePicture }) => {
  return (
    <div key={picture.id} className='relative'>
      <img
        src={picture.url}
        alt={picture.title}
        className="w-full h-auto rounded-lg"
      />
      <button
        onClick={() => deletePicture(picture.id)}
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default Picture;
