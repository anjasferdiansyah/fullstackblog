import RecentPost from "@/components/customComponents/RecentPost";
import React from "react";

const BlogPage = ({ searchParams }: any) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] mt-12 py-10">
      <div className="container md:max-w-5xl mx-auto">
        <div>{cat} Blog</div>
        <RecentPost page={page} cat={cat} />
      </div>
    </div>
  );
};

export default BlogPage;
