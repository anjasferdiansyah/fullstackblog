"use client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CommentCard from "./CommentCard";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

const createComment = async (desc: string) => {
  const res = await fetch("http://localhost:3000/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ desc }),
  });
};

const Comment = ({ postSlug }: { postSlug: string }) => {
  const [desc, setDesc] = React.useState("");
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };

  console.log(data);

  return (
    <div className="w-full py-8">
      <h1 className="text-2xl font-bold col-span-2">Comment</h1>
      <div>
        {status === "authenticated" ? (
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Write a comment"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Button size={"sm"} onClick={handleSubmit}>
              Comment
            </Button>
          </div>
        ) : (
          <Link href="/login">Login to write a comment</Link>
        )}
      </div>
      <div className="py-8" id="commentContainer">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.map((comment: any) => (
            <CommentCard
              key={comment.id}
              userImage={comment.user?.image}
              userName={comment.user?.name}
              commentDate={comment.createdAt}
              commentDesc={comment.desc}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
