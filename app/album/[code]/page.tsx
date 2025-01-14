import React from "react";
import Album from "@/ui/Album";

export default async function AlbumPage({ params }: { params: { code: string } }) {
  const { code } = await params;

  return <Album code={code} />
}
