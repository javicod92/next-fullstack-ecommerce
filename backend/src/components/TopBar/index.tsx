"use client";

import { ContextStates } from "@/context/MenuContext";
import { useContext } from "react";

export default function TopBar() {
  const { setShowSidebar } = useContext(ContextStates)!;

  return (
    <div className="bg-gray-200 w-full md:hidden flex items-center">
      <button
        className="p-2"
        type="button"
        onClick={() => setShowSidebar((prevState) => !prevState)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div>Admin Panel</div>
    </div>
  );
}
