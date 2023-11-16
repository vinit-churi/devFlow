import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const GlobalResult = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
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
      filters
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>
    </div>
  );
};

export default GlobalResult;
