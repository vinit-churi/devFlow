"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Pagination = ({
  total,
  page,
  limit,
  otherClasses,
}: {
  total: number;
  page: number;
  limit: number;
  otherClasses?: string;
}) => {
  const route = useRouter();
  const pathname = usePathname();
  const nextPage = () => {
    route.push(`${pathname}?page=${page + 1}`);
  };
  const prevPage = () => {
    route.push(`${pathname}?page=${page - 1}`);
  };
  return (
    <div className={` flex w-max gap-4 text-white ${otherClasses}`}>
      {/* {`${total} ${page} ${limit}`} */}
      <Button
        onClick={prevPage}
        disabled={page === 1}
        className="primary-gradient"
      >
        Previous
      </Button>
      <Button disabled className="border-2 text-black">
        {page}
      </Button>
      <Button
        onClick={nextPage}
        disabled={page * limit >= total}
        className="primary-gradient"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
