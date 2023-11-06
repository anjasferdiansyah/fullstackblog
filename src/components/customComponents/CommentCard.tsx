"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommentCard = ({
  userName,
  userImage,
  commentDate,
  commentDesc,
}: {
  userName: string;
  userImage: string;
  commentDate: string;
  commentDesc: string;
}) => {
  return (
    <div className="mb-10" id="commentCard">
      <div className="flex items-center gap-2">
        {userImage && (
          <Avatar>
            <AvatarImage src={userImage} alt="Avatar" />
            <AvatarFallback>AF</AvatarFallback>
          </Avatar>
        )}
        <div className="leading-tight">
          <h1 className="font-semibold">{userName}</h1>
          <p className="text-muted-foreground text-sm">{commentDate}</p>
        </div>
      </div>
      <div>
        <p>{commentDesc}</p>
      </div>
    </div>
  );
};

export default CommentCard;
