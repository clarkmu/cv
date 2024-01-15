import React, { useState } from "react";

export default function Menu({ children, showMoveable = true }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    //   user menu overlay component
    <div className="w-[15ch] absolute top-2 left-2 flex flex-col gap-4 bg-[rgba(255,255,255,0.25)] p-4 rounded select-none">
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
      {!collapsed && children}
      {showMoveable && !collapsed && (
        <span className="bg-white text-black text-sm px-2 py-1">
          Pan and zoom to move around.
        </span>
      )}
    </div>
  );
}
