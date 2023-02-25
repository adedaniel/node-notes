import React from "react";
import { HashLoader } from "react-spinners";

export default function PageLoadAnimation() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <HashLoader color="teal" size={70} />
    </div>
  );
}
