"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Plus, FileImage, Upload, Video, XCircle } from "lucide-react";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "react-quill/dist/quill.bubble.css";
import { app } from "@/lib/firebase";
import useSWRImmutable from "swr/immutable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";

// ...

const storage = getStorage(app);

const fetcher = async (url: any) => {
  return fetch(url).then((res) => res.json());
};

const CreatePost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
  });

  if (status === "unauthenticated") {
    router.push("/login");
  }
  const { data } = useSWRImmutable(`/api/category`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile]: any = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const upload = () => {
      const name: any = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const slugify = (text: any) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: any) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: category,
      }),
    });

    if (res.ok) {
      toast({
        title: "Post created",
        description: "Your post has been created successfully",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full mt-12 py-10">
      <div className="container md:max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Title"
          className=" placeholder:text-4xl text-4xl font-bold tracking-tight px-3 w-full outline-none"
          onChange={(e: any) => setTitle(e.target.value)}
        />

        <div className="flex gap-2 py-6 px-3">
          <Button
            className="rounded-full flex items-center justify-center"
            size={"sm"}
            onClick={() => setOpen(!open)}
          >
            {open ? <XCircle /> : <Plus />}
          </Button>
          {open && (
            <>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e: any) => setFile(e.target.files[0])}
                className="hidden"
              />

              <Button
                size={"sm"}
                className="rounded-full"
                variant={"secondary"}
              >
                <label htmlFor="image" className="cursor-pointer">
                  <FileImage />
                </label>
              </Button>

              <Button
                size={"sm"}
                className="rounded-full"
                variant={"secondary"}
              >
                <Upload />
              </Button>
              <Button
                size={"sm"}
                className="rounded-full"
                variant={"secondary"}
              >
                <Video />
              </Button>
              <Select
                onValueChange={(selectedValue) =>
                  setCategory(slugify(selectedValue))
                }
              >
                <SelectTrigger className="w-auto rounded-full">
                  <SelectValue placeholder="Cat" />
                </SelectTrigger>
                <SelectContent>
                  {data &&
                    data.map((item: any) => (
                      <SelectItem value={item.title} key={item.id}>
                        {item.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story"
        />
        <Button
          size={"sm"}
          className="rounded-full fixed top-2 z-30 right-20"
          variant={"secondary"}
          onClick={handleSubmit}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
