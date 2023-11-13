"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentSearchParams = new URLSearchParams(searchParams);
  const filter = currentSearchParams.get("filter");
  const active = filter || HomePageFilters[0].value;
  function handleFilterChange(value: string) {
    currentSearchParams.set("filter", value);
    router.push(`${pathname}?${currentSearchParams.toString()}`);
  }
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleFilterChange(filter.value)}
          className={`body-medium rounded-md px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 "
          }`}
        >
          {filter.value}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
