import React from "react";
import PopularCard from "./PopularCard";

const getPopularPost = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/popular`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const PopularList = async () => {
  const popular = await getPopularPost();

  return (
    <div className="w-full">
      <div className="leading-none py-4">
        <h2 className="text-muted-foreground">What&lsquo;s Hot</h2>
        <h1 className="text-2xl font-bold">Most Popular</h1>
      </div>
      <div className="flex flex-col gap-6">
        {popular &&
          popular.map((post: any) => (
            <PopularCard
              slug={post.slug}
              key={post.id}
              category={post.catSlug}
              desc={post.title}
              userName={post.userName}
              createdAt={post.createdAt.substring(0, 10)}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularList;
