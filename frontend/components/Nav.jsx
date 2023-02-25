import React, { useState, useEffect } from "react";
import Router from "next/router";
import cn from "classnames";

export default function Nav() {
  const [pastTop, setPastTop] = useState(false);

  useEffect(() => {
    const event = () => {
      if (window.scrollY <= 50) {
        setPastTop(false);
      } else {
        setPastTop(true);
      }
    };

    window.addEventListener("scroll", event);
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("notes_acccess_token");
    Router.push("/login");
  };

  return (
    <div
      className={cn(
        "w-full bg-white top-0 fixed flex justify-end py-6 px-[5%]",
        pastTop && "border-b"
      )}
    >
      <button onClick={logout} className="text-gray-400">
        Logout
      </button>
    </div>
  );
}
