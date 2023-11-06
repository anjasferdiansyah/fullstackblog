import prisma from "@/lib/connectdb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: any) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: true,
        cat: true,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};
