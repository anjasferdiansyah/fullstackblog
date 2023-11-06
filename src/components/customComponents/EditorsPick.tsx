import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import EditorsPickCard from "./EditorsPickCard";

const getEditorsPick = async () => {
  const res = await fetch("http://localhost:3000/api/editorsPick", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

const EditorsPick = async () => {
  const editorsPick = await getEditorsPick();

  return (
    <div>
      <div className="leading-none py-4">
        <p className="text-muted-foreground">Chosen by Editor</p>
        <h1 className="text-2xl font-bold">EditorsPick</h1>
      </div>
      <div className="py-4">
        {editorsPick &&
          editorsPick.map((post: any) => (
            <EditorsPickCard
              key={post.id}
              title={post.title}
              image={post.user.image}
              category={post.catSlug}
              userName={post.user.name}
              createdAt={post.createdAt.substring(0, 10)}
            />
          ))}
      </div>
    </div>
  );
};

export default EditorsPick;
