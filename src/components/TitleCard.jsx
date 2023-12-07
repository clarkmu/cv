import React from "react";
import SocialIcons from "./SocialIcons";
// import { WithSpriteContext, useSpriteContext } from "../context/SpriteContext";

export default function TitleCard({
  title,
  bg,
  showSocial = true,
  extra = null,
}) {
  // const { Canvas } = useSpriteContext();

  const isPortfolio = title === "Portfolio";
  const overlaysClass = isPortfolio ? "z-10 rounded-lg m-0 p-0 " : "";

  return (
    <div className="flex-1 text-center lg:max-w-[33vw] transition-all duration-500">
      <div className={`sticky top-0 h-screen flex flex-col ${bg}`}>
        {/* {isPortfolio && <Canvas />} */}
        <div className="flex-1 flex flex-col gap-4 items-center justify-center">
          <h1
            className={
              overlaysClass +
              "text-white text-7xl font-bold tracking-wide whitespace-break-spaces select-none"
            }
          >
            {title}
          </h1>
          {extra && extra()}
        </div>
        {showSocial && (
          <div
            className={
              overlaysClass +
              "rounded-lg flex-0 flex justify-center items-center"
            }
          >
            <SocialIcons />
          </div>
        )}
      </div>
    </div>
  );
}

// export default WithSpriteContext(TitleCard);
