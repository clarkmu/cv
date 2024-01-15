import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={className + "bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 "}
      {...props}
    >
      {children}
    </button>
  );
}
