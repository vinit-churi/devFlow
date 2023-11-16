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
      className="absolute top-16 flex h-40 w-full items-center justify-center rounded-lg bg-red-400"
    >
      GlobalResult
    </div>
  );
};

export default GlobalResult;
