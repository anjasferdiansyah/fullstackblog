import RecentPost from "@/components/customComponents/RecentPost";
import React from "react";

const BlogPage = ({ searchParams, params }: any) => {
  const page = parseInt(searchParams.page) || 1;

  const cat = params.catSlug;

  const catBg = cat.charAt(0).toUpperCase() + cat.slice(1);
  console.log(catBg);
  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] mt-12 pt-2">
      <div
        className={`w-full flex justify-center items-center h-52 px-3 bg-[url('https://source.unsplash.com/1600x900')] text-center leading-tight font-bold text-4xl`}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)} Blog
      </div>
      <div className="container md:max-w-5xl mx-auto">
        <RecentPost page={page} cat={cat} />
      </div>
    </div>
  );
};

export default BlogPage;
