import prisma from "@/lib/connectdb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      views: "desc",
    },
    take: 5,
  });

  return new NextResponse(JSON.stringify(posts), {
    status: 200,
  });
};
