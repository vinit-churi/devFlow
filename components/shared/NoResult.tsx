import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type TNoResultProps = {
  title: string;
  description: string;
  link: string;
  linkText: string;
};

const NoResult = ({ title, description, link, linkText }: TNoResultProps) => {
  return (
    <div className="text-dark100_light900 mt-12 flex flex-col items-center text-center">
      <Image
        className="object-contain dark:hidden"
        src="/assets/images/light-illustration.png"
        width={270}
        height={200}
        alt="no result"
      />
      <Image
        className="hidden object-contain dark:flex"
        src="/assets/images/dark-illustration.png"
        width={270}
        height={200}
        alt="no result"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium mt-5  min-h-[46px] rounded-lg bg-primary-500 px-4 py-3">
          {linkText}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
