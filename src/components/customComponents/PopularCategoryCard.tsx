import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const PopularCategoryCard = ({
  categoriesTitle,
  image,
  categoryLink,
}: {
  categoriesTitle: string;
  image?: string;
  categoryLink: string;
}) => {
  const randomColor = () => {
    const bgColor = ["bg-[#99D5C9]", "bg-[#6C969D]", "bg-[#C9B99D]"];
    return bgColor[Math.floor(Math.random() * bgColor.length)];
  };

  return (
    <div>
      <Link
        href={categoryLink}
        className={`w-full h-12 ${randomColor()} rounded flex justify-center items-center gap-1`}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={image} />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
        <div className="text-sm text-center font-bold leading-none">
          <div>{categoriesTitle}</div>
        </div>
      </Link>
    </div>
  );
};

export default PopularCategoryCard;
