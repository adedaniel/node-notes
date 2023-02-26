import cn from "classnames";
import React from "react";
import { HashLoader } from "react-spinners";

export default function Loader({ fullPage, size, className }) {
  return (
    <div
      className={cn(
        "flex w-full justify-center items-center",
        fullPage && "min-h-screen",
        className
      )}
    >
      <HashLoader color="teal" size={size || (fullPage ? 70 : 30)} />
    </div>
  );
}
