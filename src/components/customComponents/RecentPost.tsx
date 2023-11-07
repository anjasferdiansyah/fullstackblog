import React from "react";
import RecentPostCard from "./RecentPostCard";
import Pagination from "./Pagination";

const getPosts = async (page: any, cat: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}&cat=${
      cat || ""
    }`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const RecentPost = async ({ page, cat }: any) => {
  const { posts, count } = await getPosts(page, cat);

  const POST_PER_PAGE = 3;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  return (
    <div className="md:col-span-2 row-start-4 md:row-start-1 md:row-span-4 md:col-start-1">
      <h1 className="text-2xl font-bold py-4 mt-4">Recent Post</h1>
      {posts &&
        posts.map((post: any) => (
          <RecentPostCard
            key={post.id}
            image={post.img}
            description={post.desc.substring(0, 100).concat("...")}
            title={post.title}
            user={post.userEmail}
            category={post.catSlug}
            date={post.createdAt.substring(0, 10)}
            slug={post.slug}
          />
        ))}
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};

export default RecentPost;
