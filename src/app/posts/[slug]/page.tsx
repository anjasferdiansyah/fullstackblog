import CategoryList from "@/components/customComponents/CategoryList";
import Comment from "@/components/customComponents/Comment";
import EditorsPick from "@/components/customComponents/EditorsPick";
import PopularList from "@/components/customComponents/PopularList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getSinglePost = async (slug: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const data = await getSinglePost(slug);

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] mt-12 py-10">
      <div className="container md:max-w-5xl mx-auto flex gap-4">
        <div className="flex-1 flex-col flex justify-between">
          <div>
            <Badge variant={"outline"}> {data?.cat.title} </Badge>
            <h1 className="text-5xl tracking-tight leading-snug font-bold">
              {data?.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="border-2 border-stone-200/60">
              {data.user.image ? (
                <AvatarImage src={data.user.image} />
              ) : (
                <AvatarFallback>AF</AvatarFallback>
              )}
            </Avatar>
            <div className="leading-tight">
              <h4 className=" text-primary">{data?.user.name}</h4>
              <p>{data?.createdAt.substring(0, 10)}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            width={500}
            height={500}
            src={
              data
                ? data?.img
                : `https://source.unsplash.com/500x500?${data?.cat.title}`
            }
            alt=""
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="container md:max-w-5xl grid gap-10 md:grid-cols-3 mx-auto py-10">
        <div className="w-full md:col-span-2 py-10 text-justify row-start-4 md:row-span-4 md:col-start-1">
          <div dangerouslySetInnerHTML={{ __html: data?.desc }} />
          <Comment postSlug={slug} />
          <Button>
            <Link href={"/"}>Back</Link>
          </Button>
        </div>
        <PopularList />
        <CategoryList />
        <EditorsPick />
      </div>
    </div>
  );
};

export default SinglePage;
