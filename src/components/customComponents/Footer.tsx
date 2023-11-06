import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full relative py-8 flex items-center justify-between border-t-2 bg-white border-stone-200/60">
      <div className="container max-w-5xl w-full flex flex-wrap gap-y-4 gap-x-40 justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Avatar className="border-2">
              <AvatarImage src="https://github.com/anjasferdiansyah.png" />
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">AnjasDev_</h1>
          </div>
          <p className="text-sm leading-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            voluptates accusamus reprehenderit iste
          </p>
          <small className="text-sm mt-2">Made with ❤ Copyright © 2023</small>
        </div>
        <div className="flex flex-1 w-full self-center">
          <div id="links" className="w-full">
            <h1 className="font-semibold">Links</h1>
            <ul className="text-sm text-muted-foreground flex flex-col py-2">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div id="social-media" className="w-full">
            <h1 className="font-semibold">Social</h1>
            <ul className="text-sm text-muted-foreground py-2">
              <li>
                <Link href="#">Facebook</Link>
              </li>
              <li>
                <Link href="#">Github</Link>
              </li>
              <li>
                <Link href="#">Instagram</Link>
              </li>
            </ul>
          </div>
          <div id="tags" className="w-full">
            <h1 className="font-semibold">Tags</h1>
            <ul className="text-sm text-muted-foreground py-2">
              <li>
                <Link href="#">Lifestyle</Link>
              </li>
              <li>
                <Link href="#">Travel</Link>
              </li>
              <li>
                <Link href="#">Programming</Link>
              </li>
              <li>
                <Link href="#">Photography</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
