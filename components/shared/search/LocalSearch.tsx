"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
interface IProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<number | null>(null);
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log("searching", e.target.value);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = window.setTimeout(() => {
      const currentSearchParams = new URLSearchParams(searchParams);
      currentSearchParams.set("search", e.target.value);
      router.push(`${route}?${currentSearchParams.toString()}`);
    }, 1000);
  }
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleSearchChange}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
