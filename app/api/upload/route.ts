import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { formidable } from "formidable";

// Disable automatic body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// API Route
export async function POST(req: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), "/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const formData = await req.formData();
    const files = formData.getAll('file') as File[];
    const file = files[0];

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    console.log("Uploaded file:", file);
    return NextResponse.json({ message: "File uploaded successfully!", file });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json({ error: "File upload failed." }, { status: 500 });
  }
}
