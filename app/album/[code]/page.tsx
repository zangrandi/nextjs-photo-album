import React from "react";
import Album from "@/ui/Album";

type Params = Promise<{ code: string }>

export default async function AlbumPage({ params }: { params: Params }) {
  const { code } = await params;

  return <Album code={code} />
}
