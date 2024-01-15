import React from "react";

export default function Input({ clasName, ...props }) {
  return (
    <input
      {...props}
      className={`border-2 border-black w-[5ch] rounded px-1 ${clasName}`}
    />
  );
}
