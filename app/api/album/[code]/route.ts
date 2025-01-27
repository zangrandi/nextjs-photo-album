import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function fetchAlbum(code: string) {
  try {
    const album = await prisma.album.upsert({
      where: { code },
      update: {},
      create: { code },
      include: { pictures: true },
    });

    return album;
  } catch (error) {
    console.error("Error fetching or creating album:", error);
    throw new Error("Could not fetch or create album");
  }
}

type Params = Promise<{ code: string  }>

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { code } = await params;
  const album = await fetchAlbum(code)

  if (!album) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json(album);
}
