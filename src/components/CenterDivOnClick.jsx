import React, { useRef } from "react";

export const centerOnClickClassname = "center-div-on-click";

function whitelistCenterDivOnClick(e, ref) {
  const classIsWhitelisted = e.target.className.includes(
    centerOnClickClassname
  );

  if (classIsWhitelisted) {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  }
}

export default function CenterDivOnClick({ children }) {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      onClick={(e) => whitelistCenterDivOnClick(e, ref)}
      onKeyDown={(e) => whitelistCenterDivOnClick(e, ref)}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
