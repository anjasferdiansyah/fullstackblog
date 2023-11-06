import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import prisma from "@/lib/connectdb";
import { Button } from "@/components/ui/button";
import { AlertDialogDelete } from "@/components/customComponents/AlertDialogDelete";
import TablePosts from "@/components/customComponents/TablePosts";

const getUserPost = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const Dashboard = async () => {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const post = await getUserPost();
  return (
    <div className="mt-14 w-full h-[calc(100vh-9rem)] flex">
      <div className="w-[20%] bg-slate-100 fixed">
        <div className="container h-[calc(100vh-9rem)]">
          <h1 className="text-2xl py-4 font-bold">Tinker Blog</h1>
          <div className="flex flex-col">
            <Link href={"/"}>Home</Link>
            <Link href={"/dashboard/profile"}>Profile</Link>
            <Link href={"/dashboard/write"}>Create Post</Link>
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-auto pl-10 overflow-scroll">
        <h1 className="text-2xl font-bold py-4 pl-2 tracking-tight">
          Posts List
        </h1>
        <TablePosts />
      </div>
    </div>
  );
};

export default Dashboard;
