import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const deletePicture = async (id: number) => {
  try {
    await prisma.picture.delete({
      where: { id },
    });

    return true
  } catch {
    return false
  }
};

type Params = Promise<{ id: string  }>

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const success = await deletePicture(parseInt(id))

  if (success) {
    return NextResponse.json({ message: "Picture deleted successfully!" });
  } else {
    return NextResponse.json({ error: "Error deleting picture" }, { status: 422 });
  }
}
