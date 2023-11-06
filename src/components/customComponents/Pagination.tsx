"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Pagination = ({ page, hasNext, hasPrev }: any) => {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Prev
      </Button>
      <Button
        variant="outline"
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
