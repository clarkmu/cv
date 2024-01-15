import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "border-2 border-gray-400 bg-gray-500 " +
        "focus:outline-none w-[5ch] rounded px-1 " +
        className
      }
    />
  );
}
