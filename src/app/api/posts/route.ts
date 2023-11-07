import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/connectdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 3;

  const query: any = {
    take: POST_PER_PAGE,
    skip: (Number(page) - 1) * POST_PER_PAGE,
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  const session: any = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json({ post, message: "Success" }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const { slug } = await req.json();
    console.log(slug);

    const post = await prisma.post.delete({
      where: {
        slug,
      },
    });

    return NextResponse.json({ post, message: "Success" }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};
