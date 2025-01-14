import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

// Disable automatic body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file) => {
  const uploadDir = path.join(process.cwd(), "/public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = path.join(uploadDir, file.name);
  fs.writeFileSync(filePath, buffer);

  return `/uploads/${file.name}`;
};

const savePicture = async (filePath, albumId) => {
  const picture = await prisma.picture.create({
    data: {
      title: "Uploaded Picture",
      url: filePath,
      albumId: parseInt(albumId),
    },
  });

  return picture;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file') as File[];
    const file = files[0];
    const albumId = formData.getAll('albumId');

    saveFile(file).then((filePath) => {
      savePicture(filePath, albumId);
    })

    return NextResponse.json({ message: "File uploaded successfully!", file });
  } catch (error) {
    return NextResponse.json({ error: "File upload failed." }, { status: 500 });
  }
}
