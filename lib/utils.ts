import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

export const shortenNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export function getJoinedDate(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    .toString();
}

interface IUrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({
  params,
  key,
  value,
}: IUrlQueryParams): string => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface IRemoveKeysFromQuery {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: IRemoveKeysFromQuery): string => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
