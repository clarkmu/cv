import React, { useState } from "react";
import Button from "./Button";
import CenterDivOnClick, { centerOnClickClassname } from "./CenterDivOnClick";

export default function PortfolioCard({
  children,
  title,
  body,
  backgroundImage,
  backgroundColor,
  isLastCard,
  isActive,
}) {
  const [expanded, setExpanded] = useState(false);
  const containerHeight = expanded ? "min-h-screen" : "h-screen";

  return (
    <CenterDivOnClick>
      <div
        className={`${containerHeight} ${centerOnClickClassname} ${
          !isLastCard && "border-b-bg border-b-4"
        } ${isActive ? "block" : "hidden"} transition-all`}
      >
        <div
          className={`${containerHeight} flex py-12 ${centerOnClickClassname}`}
          style={{
            background: backgroundColor || `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <div
            className={`cursor-auto p-8 flex flex-col gap-4 bg-bg rounded-3xl w-full border shadow`}
            style={{ margin: "auto 2rem" }}
          >
            <h1 className="text-3xl font-bold whitespace-break-spaces m-0 p-0">
              {title}
            </h1>
            <div className="italic">{body}</div>
            <div
              className={
                "flex flex-col gap-4 " +
                "transition-[all 1s ease]" +
                (expanded ? "opacity-1" : "opacity-0 hidden")
              }
            >
              {children}
            </div>
            <div className="mt-2">
              <Button
                onClick={() => setExpanded((b) => !b)}
                className={centerOnClickClassname}
              >
                {expanded ? "Collapse" : "Find Out More"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CenterDivOnClick>
  );
}
