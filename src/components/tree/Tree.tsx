import React from "react";
import Branch from "./Branch";
import { branchColors } from "./branching";
import BranchContextProvider from "./context/BranchContext";
import { WithTreeContext, useTreeContext } from "./context/TreeContext";

function TreeComponent() {
  const {
    state: { dim, displayIndex, isSmallScreen, restartedAt },
    branches,
    containerRef,
  } = useTreeContext();

  const tempDim =
    window.innerHeight < window.innerWidth
      ? window.innerHeight
      : window.innerWidth;

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center h-screen w-screen"
    >
      <div className="absolute left-0 top-0 h-screen w-1/2 bg-secondary"></div>
      <div
        className={`absolute right-0 top-0 h-screen w-1/2 ${
          isSmallScreen ? "bg-secondary" : "bg-primary"
        }`}
      ></div>
      <div
        className="relative overflow-hidden bg-bg rounded-full"
        style={{
          width: (dim || tempDim / 2) + "px",
          height: (dim || tempDim / 2) + "px",
        }}
      >
        {!!dim &&
          displayIndex.map((i) => (
            <BranchContextProvider
              dim={dim}
              key={`tree-${i}-${dim}-${restartedAt}`}
              // dim={dim}
              strokeStyle={branchColors[i]}
              i={i}
              branches={branches[i]}
              isLastBranch={i === branches.length - 1}
              isSecondToLastBranch={i === branches.length - 2}
            >
              <Branch />
            </BranchContextProvider>
          ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <div
            className={`${isSmallScreen ? "text-xl" : "text-3xl"} font-bold`}
          >
            Michael Clark
          </div>
          <div
            className={`${isSmallScreen ? "text-lg" : "text-2xl"} font-bolder`}
          >
            Research Developer
          </div>
        </div>
      </div>
    </div>
  );
}

const Tree = WithTreeContext(TreeComponent);

export default Tree;
