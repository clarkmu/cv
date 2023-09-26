import React from "react";

export default function Button({ children, onClick, className }) {
  return (
    <button
      className={
        "more-button shadow-primary shadow-[0px_3px_12px] rounded-lg px-4 py-2 text-lg hover:bg-primary hover:text-white hover:shadow-none " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
