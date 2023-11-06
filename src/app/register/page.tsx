import SignupForm from "@/components/form/SignupForm";
import React from "react";

const RegisterPage = async () => {
  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] mt-12 py-10">
      <div className="container md:max-w-lg mx-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default RegisterPage;
