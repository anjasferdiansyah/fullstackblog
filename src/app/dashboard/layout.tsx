import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
          <h1 className="text-2xl py-4 font-bold">Tinker Blog</h1>
          <div className="flex flex-col">
            <Link href={"/"}>Home</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={`/dashboard/user/${session?.user?.id}`}>Profile</Link>
            <Link href={"/dashboard/write"}>Create Post</Link>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-auto pl-10 overflow-scroll">{children}</div>
    </div>
  );
};

export default DashboardLayout;
