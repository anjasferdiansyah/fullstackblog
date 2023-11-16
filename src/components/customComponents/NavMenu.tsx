"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { User } from "@prisma/client";

const NavMenu = () => {
  const { data, status }: { data: any; status: any } = useSession();

  return (
    <NavigationMenu className="">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-4">
            {/* <div className="flex gap-3 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/anjasferdiansyah.png" />
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
              <div>Mohammad Anjas F</div>
            </div> */}
            {status === "authenticated" && "Welcome, " + data?.user?.name}
            {status === "unauthenticated" && "TinkerBlog"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[400px] md:grid-cols-2">
              <li
                className={cn(
                  "select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground row-span-3 flex justify-center items-center"
                )}
              >
                {status === "authenticated" && (
                  <NavigationMenuLink className="flex flex-col gap-4 items-center justify-center">
                    <Avatar className="w-16 h-16 md:w-16 md:h-16 mt-4 mx-auto">
                      <AvatarImage
                        src={
                          data?.user?.image ? data?.user?.image : "default.jpg"
                        }
                      />
                      <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-center font-bold leading-none">
                      <div className="w-full text-sm">{data?.user?.name}</div>
                    </div>
                    <Button
                      onClick={() => {
                        signOut();
                        toast({
                          title: "Sign Out Success",
                          description: "You have successfully signed out",
                          variant: "destructive",
                        });
                      }}
                      variant={"destructive"}
                      size={"sm"}
                    >
                      Sign Out
                    </Button>
                  </NavigationMenuLink>
                )}
                {status === "unauthenticated" && (
                  <NavigationMenuLink>
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "default" })}
                    >
                      Login
                    </Link>
                  </NavigationMenuLink>
                )}
              </li>
              <ListItem href="/" title="Home">
                Back to Home
              </ListItem>
              <ListItem href="/about" title="About">
                About this project
              </ListItem>
              <ListItem href="/dashboard" title="Dashboard">
                Edit your profile, add a post, etc.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">
            <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              {title}
            </span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavMenu;
