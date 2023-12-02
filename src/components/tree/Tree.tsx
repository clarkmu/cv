import React from "react";
import Branch from "./Branch";
import { branchColors } from "./branching";
import BranchContextProvider from "./context/BranchContext";
import { WithTreeContext, useTreeContext } from "./context/TreeContext";
import useDim from "./context/useDim";

function TreeComponent() {
  const {
    state: { displayIndex, isSmallScreen, restartedAt },
    branches,
  } = useTreeContext();

  const [dim] = useDim();

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="absolute left-0 top-0 h-screen w-1/2 bg-secondary"></div>
      <div
        className={`absolute right-0 top-0 h-screen w-1/2 ${
          isSmallScreen ? "bg-secondary" : "bg-primary"
        }`}
      ></div>
      <div
        className="relative overflow-hidden bg-bg rounded-full transition-all"
        style={{
          width: dim + "px",
          height: dim + "px",
        }}
      >
        {!!dim &&
          displayIndex.map((i) => (
            <BranchContextProvider
              key={`tree-${i}-${dim}-${restartedAt}`}
              dim={dim}
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
