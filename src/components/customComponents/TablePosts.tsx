"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import Link from "next/link";
import { useSession } from "next-auth/react";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const TablePosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setUserPosts(data.user.posts);
    }
  }, [data, userPosts]);

  return (
    <Table className="max-w-5xl w-full mx-auto">
      <TableCaption>
        {userPosts.length === 0 ? "No posts yet." : "A list of your posts."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Desc</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userPosts &&
          userPosts.map((post: any) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell>{post.slug}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell
                dangerouslySetInnerHTML={{
                  __html: post.desc.substring(0, 100),
                }}
              ></TableCell>
              <TableCell>
                <Link
                  className={`${buttonVariants({ variant: "outline" })}`}
                  href={`/dashboard/detail/${post.slug}`}
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TablePosts;
