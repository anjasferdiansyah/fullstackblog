import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "../ui/button";

import React from "react";
import { Button } from "../ui/button";
import { merriweather } from "@/app/font";
import Link from "next/link";
import Image from "next/image";

const RecentPostCard = ({
  category,
  user,
  title,
  description,
  date,
  slug,
  image,
}: {
  category: string;
  user: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
}) => {
  return (
    <Card className="block md:flex overflow-hidden mb-4">
      <CardHeader className="p-0 md:w-1/3">
        {image ? (
          <Image
            src={image ?? ""}
            className="w-full h-full object-cover"
            alt=""
            width={1400}
            height={900}
          />
        ) : (
          <Image
            src="https://source.unsplash.com/1400x900?lifestyle"
            alt={title}
            width={1400}
            height={900}
            className="w-full h-full object-cover"
          />
        )}
      </CardHeader>
      <CardContent className="md:w-2/3 p-8 flex flex-col gap-3">
        <CardDescription>
          {date} -{" "}
          <span className="uppercase text-accent-foreground text-blue-400">
            {category}
          </span>
        </CardDescription>
        <CardTitle>{title}</CardTitle>

        <CardDescription>Penulis : {user}</CardDescription>
        <div
          className={`py-8`}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <Link
          className={`${buttonVariants({ variant: "link" })} w-1/3`}
          href={`/posts/${slug}`}
        >
          Read More
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecentPostCard;
