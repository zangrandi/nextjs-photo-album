import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Url = (key) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

// Disable automatic body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const saveToS3 = async (file: File, albumId: FormDataEntryValue[]) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `${albumId}/${file.name}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  return s3Url(key);
}

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

    const url = await saveToS3(file, albumId);
    await savePicture(url, albumId);

    return NextResponse.json({ message: "File uploaded successfully!", file });
  } catch {
    return NextResponse.json({ error: "File upload failed." }, { status: 500 });
  }
}
