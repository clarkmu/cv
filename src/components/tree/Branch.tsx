import React from "react";
import { useBranchContext } from "./context/BranchContext";
import useDim from "./context/useDim";

export default function Branch() {
  const [dim] = useDim();

  const { ref, baseRotation } = useBranchContext();

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 overflow-visible"
      width={dim}
      height={dim}
      style={{
        transform: `rotate(${baseRotation}rad)`,
      }}
    />
  );
}
