import React from "react";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

const PopularCard = ({
  category,
  desc,
  userName,
  createdAt,
  slug,
}: {
  category: string;
  desc: string;
  userName: string;
  createdAt: string;
  slug: string;
}) => {
  return (
    <div className="w-full">
      <Link
        href={`/categories?cat=${category}`}
        className={`${badgeVariants({ variant: "default" })} capitalize`}
      >
        {category}
      </Link>
      <div className="">
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
        <div className="text-sm text-accent-foreground font-bold">
          <Link href={`/posts/${slug}}`}>{userName}</Link>
          <span className="text-muted-foreground font-medium">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
