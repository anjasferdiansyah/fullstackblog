"use client";
import { AlertDialogDelete } from "@/components/customComponents/AlertDialogDelete";
import CategoryList from "@/components/customComponents/CategoryList";
import Comment from "@/components/customComponents/Comment";
import EditorsPick from "@/components/customComponents/EditorsPick";
import PopularList from "@/components/customComponents/PopularList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `http://localhost:3000/api/posts/${slug}`,
    fetcher,
    {
      refreshInterval: 0,
    }
  );

  const handleDelete = async (slug: any) => {
    const res = await fetch(`http://localhost:3000/api/posts/`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });

    if (res.ok) {
      toast({
        title: "Success",
        description: "Post deleted successfully",
        variant: "destructive",
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Oops, something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] mt-12 py-10">
      <div className="container md:max-w-5xl mx-auto gap-4">
        <div className="flex-1 flex-col flex justify-between">
          <div className="flex-1 flex justify-center items-center">
            <Image
              width={900}
              height={900}
              src="https://source.unsplash.com/1400x900?lifestyle"
              alt=""
              className="w-1/2 object-cover"
            />
          </div>
          <div>
            <Badge variant={"outline"}> {data?.cat.title} </Badge>
            <h1 className="text-5xl tracking-tight leading-snug font-bold">
              {data?.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="border-2 border-stone-200/60">
              <AvatarImage src={data?.user.image || "/default.jpg"} />
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <h4 className=" text-primary">{data?.user.name}</h4>
              <p>{data?.createdAt.substring(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container md:max-w-5xl grid gap-10 mx-auto py-10">
        <div className="w-full py-10 ">
          <div
            className="pb-10"
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div>
            <AlertDialogDelete onClick={() => handleDelete(slug)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
