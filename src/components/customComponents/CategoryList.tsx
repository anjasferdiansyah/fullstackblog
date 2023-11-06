import React from "react";

interface Category {
  id: string;
  title: string;
  img?: string;
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

const CategoryList = async () => {
  const categories = await getCategories();

  const randomColor = () => {
    const bgColor = ["bg-[#99D5C9]", "bg-[#6C969D]", "bg-[#C9B99D]"];
    return bgColor[Math.floor(Math.random() * bgColor.length)];
  };

  return (
    <div className="w-full">
      <div className="leading-none py-4">
        <p className="text-muted-foreground">Discover by topic</p>
        <h1 className="text-2xl font-bold">Category</h1>
      </div>
      <div className="w-full py-4 flex flex-wrap gap-2">
        {categories &&
          categories.map((category: Category) => (
            <div
              key={category.id}
              className={`py-2 px-4 w-full md:w-auto rounded ${randomColor()} font-bold text-white`}
            >
              {category.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
