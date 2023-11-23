import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";

import { redirect } from "next/navigation";

const getUserPost = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const post = await getUserPost();
  return (
    <div className="mt-14 w-full h-[calc(100vh-9rem)] flex">
      <div className="w-[20%] bg-slate-100 dark:bg-slate-600 fixed">
        <div className="container h-[calc(100vh-9rem)]">
          <h1 className="text-2xl px-4 py-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500">
            Tinker Blog
          </h1>
          <Separator />
          <div className="flex flex-col">
            <Link
              className="px-4 py-2 rounded transition-all hover:bg-background hover:transition-all hover:duration-300"
              href={"/"}
            >
              Home
            </Link>
            <Separator />
            <Link
              className="px-4 py-2 rounded transition-all hover:bg-background hover:transition-all hover:duration-300"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Separator />
            <Link
              className="px-4 py-2 rounded transition-all hover:bg-background hover:transition-all hover:duration-300"
              href={`/dashboard/user/${session?.user?.id}`}
            >
              Profile
            </Link>
            <Separator />
            <Link
              className="px-4 py-2 rounded transition-all hover:bg-background hover:transition-all hover:duration-300"
              href={"/dashboard/write"}
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-auto relative overflow-scroll">{children}</div>
    </div>
  );
};

export default DashboardLayout;
