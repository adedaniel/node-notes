import React from "react";
import { HashLoader } from "react-spinners";

export default function PageLoadAnimation() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <HashLoader size={50} />
    </div>
  );
}
