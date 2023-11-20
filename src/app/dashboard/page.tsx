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
  return <TablePosts />;
};

export default Dashboard;
