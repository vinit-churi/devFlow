"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface IProps {
  pageSize: number;
  total: number;
}
const Paginate = ({ pageSize, total }: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageBefore = () => {
    console.log("page before");
    if (page === 1) return;
    router.push(`?page=${page - 1}`);
  };
  const pageForward = () => {
    console.log(total, page, pageSize);
    if (total < page * pageSize) return;
    console.log("page forward");
    router.push(`?page=${page + 1}`);
  };
  return (
    <div className="flex items-center gap-4">
      <Button className="btn-secondary" onClick={pageBefore}>
        previous
      </Button>
      <div>{page}</div>
      <Button className="btn-secondary" onClick={pageForward}>
        next
      </Button>
    </div>
  );
};

export default Paginate;
