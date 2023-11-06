import prisma from "@/lib/connectdb";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const userSchema = z.object({
  name: z.string().min(1, "Fullname is required"),
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, name } = userSchema.parse(body);

    const existingUsernameByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUsernameByEmail) {
      return NextResponse.json(
        { user: null, message: "Email already in use" },
        {
          status: 409,
        }
      );
    }

    const existingUsernameByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsernameByUsername) {
      return NextResponse.json(
        { user: null, message: "Username already in use" },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
      },
    });

    //remove hash password from response
    const { password: _, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export const GET = async (req: Request) => {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(JSON.stringify({ user: null }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      posts: true,
    },
  });

  return new NextResponse(JSON.stringify({ user }), {
    status: 200,
  });
};
