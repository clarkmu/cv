import React, { useState } from "react";

export default function Menu({ children, showMoveable = true }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    //   user menu overlay component
    <div className="text-white w-[15ch] absolute top-2 left-2 flex flex-col gap-4 bg-[rgba(155,155,155,0.25)] hover:border-white border-transparent border-2 p-4 rounded select-none">
      <div
        className="bg-[rgba(255,255,255,0.5)] text-center cursor-pointer"
        onClick={() => setCollapsed((b) => !b)}
      >
        <div
          className={
            " transition-all rotate-0 " + (collapsed && " !-rotate-90")
          }
        >
          V
        </div>
      </div>
      {showMoveable && !collapsed && (
        <span className="border-white text-base font-bolder border-2 rounded px-2 py-1">
          Pan and zoom to move around.
        </span>
      )}
      {!collapsed && children}
    </div>
  );
}
