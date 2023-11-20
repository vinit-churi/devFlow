import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./search/GlobalFilters";
import { searchAll } from "@/lib/actions/search.action";
const GlobalResult = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>([
    {
      type: "question",
      id: 1,
      title: "Next.js: How to use useSearchParams hook?",
    },
    {
      type: "answer",
      id: 1,
      title: "To use useSearchParams hook?...",
    },
    {
      type: "tag",
      id: 1,
      title: "Next.js",
    },
  ]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  function renderLink(type: string, id: string) {
    return "";
  }
  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const data = await searchAll({ searchQuery: global || "" });
        console.log(data, "current data");
        setResult(data.result);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setIsOpen]);

  return (
    <div
      ref={ref}
      className=" absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400"
    >
      <GlobalFilters />
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Matches
        </p>
        {loading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">
              Browsing the whole database
            </p>
          </div>
        ) : (
          <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
            {result.length > 0 ? (
              result.map((item: any, index: number) => {
                return (
                  <Link
                    href={renderLink(item.type, item.id)}
                    key={item.type + item.id + index}
                    className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50 "
                  >
                    <Image
                      src="/assets/icons/tag.svg"
                      width={18}
                      height={18}
                      alt="tags"
                      className="invert-colors mt-1 cursor-pointer object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="text-dark200_light800 body-regular line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-dark200_light800 small-medium mt-1 line-clamp-1 font-bold ">
                        {item.type}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
