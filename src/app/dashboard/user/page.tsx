"use client";
import Image from "next/image";
import React from "react";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
const ProfilePage = () => {
  const { data: session, update } = useSession();

  console.log(session);
  const router = useRouter();

  const [file, setFile]: any = useState(null);
  const [media, setMedia] = useState("");

  const storage = getStorage(app);

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
  }, [file, storage]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: media,
      }),
    });

    console.log(media);

    if (res.ok) {
      await update({
        ...session,
        user: {
          ...session?.user,
          image: media,
        },
      });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full h-44 bg-[url('https://source.unsplash.com/1600x900/?random')] bg-cover bg-center bg-no-repeat flex justify-center items-center border-b-2 border-gray-200">
        <div className="w-40 h-40 bg-red-300 rounded-full -mb-44 overflow-hidden border-gray-100 border-2">
          {media ? (
            <Image
              src={media}
              alt="profile"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={session?.user?.image ? session?.user?.image : "/default.jpg"}
              alt="profile"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          )}
          <form className="" onSubmit={handleSubmit}>
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={(e: any) => setFile(e.target.files[0])}
            />
            <label
              className="absolute top-[220px] right-[450px] p-1 bg-slate-200 rounded-full cursor-pointer"
              htmlFor="file"
            >
              <Pencil />
            </label>
            {/* <Button
              className="fixed top-[8px] right-[40px] z-50"
              variant={media ? "default" : "ghost"}
              disabled={!media}
              onClick={handleSubmit}
            >
              Save
            </Button> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="fixed top-[8px] right-[40px] z-50"
                  variant={media ? "default" : "ghost"}
                  disabled={!media}
                >
                  Save
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit" onClick={handleSubmit}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
      <div className="mt-24 w-full text-center">
        <h1 className="text-3xl font-bold">{session?.user?.name}</h1>
      </div>
    </>
  );
};

export default ProfilePage;
