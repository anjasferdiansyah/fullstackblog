import CategoryList from "@/components/customComponents/CategoryList";
import EditorsPick from "@/components/customComponents/EditorsPick";
import PopularCategoryList from "@/components/customComponents/PopularCategoryList";
import PopularList from "@/components/customComponents/PopularList";
import RecentPost from "@/components/customComponents/RecentPost";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <main className="w-full min-h-[calc(100vh-3.5rem)] mt-14 py-10">
      <div className="container mt-4 grid sm:grid-cols-2 gap-5 md:max-w-5xl mx-auto">
        <Image
          src="/blog.png"
          className="w-full h-full object-cover"
          alt="random"
          width={1400}
          height={900}
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-light">
            <span className="font-bold bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Hey, Anjas is here!
            </span>{" "}
            Tuliskan apapun yang ada dalam pikiranmu disini
          </h1>
        </div>
      </div>
      <PopularCategoryList />
      <div className="container grid gap-10 md:grid-cols-3 mx-auto md:max-w-5xl">
        <RecentPost page={page} />
        <PopularList />
        <CategoryList />
        <EditorsPick />
      </div>
    </main>
  );
}
