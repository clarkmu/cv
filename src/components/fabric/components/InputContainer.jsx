import React from "react";

export default function InputContainer({ children, label }) {
  return (
    <div className="flex gap-2 justify-between w-full">
      <label>{label}</label>
      {children}
    </div>
  );
}
