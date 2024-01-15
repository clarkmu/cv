import React from "react";

export default function Input({ clasName, ...props }) {
  return (
    <input
      {...props}
      className={`border-2 border-black bg-gray-500 w-[5ch] rounded px-1 ${clasName}`}
    />
  );
}
