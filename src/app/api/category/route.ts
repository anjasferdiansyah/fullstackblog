import { NextResponse } from "next/server";
import prisma from "@/lib/connectdb";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({});

    return new NextResponse(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};
