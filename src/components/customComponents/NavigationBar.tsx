import React from "react";
import NavMenu from "./NavMenu";
import { Button } from "../ui/button";
import { ModeToggle } from "./DarkModeToggle";

const NavigationBar = () => {
  return (
    <div className="w-full z-[25] bg-white/40 backdrop-blur-sm fixed flex items-center top-0 left-0 h-14 gap-4 border-b-2 border-stone-200/60">
      <div className="container md:max-w-5xl flex justify-between items-center mx-auto">
        <NavMenu />
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationBar;
