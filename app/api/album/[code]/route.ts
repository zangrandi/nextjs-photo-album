import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function fetchAlbum(code: string) {
  let album = undefined

  album = await prisma.album.findFirst({
    where: {
      code: { equals: code }
    },
    include: { pictures: true }
  });

  if (!album) {
    album = await prisma.album.create({
      data: { code: code },
    });
  }

  return album;
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
