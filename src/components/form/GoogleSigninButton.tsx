import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "../ui/use-toast";

const GoogleSigninButton = ({ children }: { children: React.ReactNode }) => {
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <div>
      <Button
        className="w-full flex items-center gap-2"
        onClick={loginWithGoogle}
      >
        <Image
          src="/google.png"
          width={20}
          height={20}
          alt="Google"
          className="rounded-full"
        />
        {children}
      </Button>
    </div>
  );
};

export default GoogleSigninButton;
