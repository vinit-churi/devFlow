"use client";
import { Badge } from "@/components/ui/badge";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("type");
  const [active, setActive] = useState(currentFilter || "");
  function handleClick(item: string) {
    if (active === item) {
      setActive("");
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="text-dark300_light900 flex items-end  gap-3 px-5">
      <h3 className="text-sm font-normal">Filters</h3>
      <ul className="ml-6 flex gap-6 p-0">
        <li onClick={() => handleClick("question")}>
          <Badge
            className={`cursor-pointer bg-slate-200 dark:bg-slate-500 ${
              active === "question" ? "bg-primary-500 dark:bg-primary-500" : ""
            }`}
          >
            Question
          </Badge>
        </li>
        <li onClick={() => handleClick("answer")}>
          <Badge
            className={`cursor-pointer bg-slate-200 dark:bg-slate-500 ${
              active === "answer" ? "bg-primary-500 dark:bg-primary-500" : ""
            }`}
          >
            Answer
          </Badge>
        </li>
        <li onClick={() => handleClick("tag")}>
          <Badge
            className={`cursor-pointer bg-slate-200 dark:bg-slate-500 ${
              active === "tag" ? "bg-primary-500 dark:bg-primary-500" : ""
            }`}
          >
            Tag
          </Badge>
        </li>
        <li onClick={() => handleClick("user")}>
          <Badge
            className={`cursor-pointer bg-slate-200 dark:bg-slate-500 ${
              active === "user" ? "bg-primary-500 dark:bg-primary-500" : ""
            }`}
          >
            User
          </Badge>
        </li>
      </ul>
    </div>
  );
};

export default GlobalFilters;
