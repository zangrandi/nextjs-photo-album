import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const deletePicture = async (id: number) => {
  try {
    const deletedPicture = await prisma.picture.delete({
      where: { id },
    });

    return true
  } catch (error) {
    return false
  }
};


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const success = deletePicture(parseInt(id))

  if (success) {
    return NextResponse.json({ message: "Picture deleted successfully!" });
  } else {
    return NextResponse.json({ error: "Error deleting picture" }, { status: 422 });
  }
}
