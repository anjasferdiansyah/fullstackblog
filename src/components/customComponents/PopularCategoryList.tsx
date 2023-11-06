import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PopularCategoryCard from "./PopularCategoryCard";

interface Category {
  id: string;
  title: string;
  img?: string;
  slug: string;
}

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const PopularCategoryList = async () => {
  const categories = await getCategories();
  return (
    <div className="container md:max-w-5xl mt-14 mx-auto">
      <h1 className="text-4xl font-bold">Popular Category</h1>
      <div
        id="categories-wrapper"
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 py-4"
      >
        {categories &&
          categories.map((category: Category) => (
            <PopularCategoryCard
              categoryLink={`/category?cat=${category.slug}`}
              key={category.id}
              categoriesTitle={category.title}
              image={category.img}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularCategoryList;
