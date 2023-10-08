import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface IProps {
  filterOptions: string[];
  responsive: boolean;
  filterLabel: string;
  filterIcon: string;
}

const Filter = ({
  filterOptions,
  responsive,
  filterLabel,
  filterIcon,
}: IProps) => {
  return (
    <>
      <div className={` ${responsive && "lg:hidden"}`}>
        <Select>
          <SelectTrigger className="min-h-[56px] w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((filterOption) => (
              <SelectItem
                key={filterOption}
                value={filterOption}
                className="flex justify-between gap-2"
              >
                {filterOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {responsive && (
        <div className="hidden gap-4 lg:flex">
          {filterOptions.map((filterOption) => (
            <Link
              key={filterOption}
              href={`/?query=${filterOption}`}
              className="flex justify-between gap-2"
            >
              <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                {filterOption}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Filter;
