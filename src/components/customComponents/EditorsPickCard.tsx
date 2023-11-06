import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const EditorsPickCard = ({
  image,
  category,
  title,
  userName,
  createdAt,
}: {
  image?: string;
  category: string;
  title: string;
  userName: string;
  createdAt: string;
}) => {
  return (
    <div className="flex gap-4 py-4 border-b-2 border-stone-200/60">
      {
        <Avatar className="w-20 h-20 m-auto">
          <AvatarImage src={image ? image : "default.jpg"} />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
      }
      <div className="">
        <Badge variant="secondary">{category}</Badge>
        <h1 className="text-lg font-bold py-1">{title}</h1>
        <p className="font-normal text-sm leading-none">
          Penulis : {userName}. <span className="text-sm">{createdAt}</span>
        </p>
      </div>
    </div>
  );
};

export default EditorsPickCard;
