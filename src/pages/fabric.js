import React, { Suspense, lazy, useState } from "react";

const GravitySimulator = lazy(() =>
  import("../components/fabric/GravitySimulator")
);

const VortexSimulator = lazy(() => import("../components/fabric/Vortex"));

const GravityScene = () => (
  <Suspense fallback={<div>Loading Simulator</div>}>
    <GravitySimulator />
  </Suspense>
);

const VortexScene = () => (
  <Suspense fallback={<div>Loading Simulator</div>}>
    <VortexSimulator />
  </Suspense>
);

const MenuItem = ({ children, selected, ...props }) => (
  <div
    {...props}
    className={
      "transition-all hover:scale-110 cursor-pointer px-1 " +
      (selected ? "border-2 border-gray-500 rounded" : "")
    }
  >
    {children}
  </div>
);

const SCENES = {
  GRAVITY: "GRAVITY",
  VORTEX: "VORTEX",
};

export default function Fabric(params) {
  const [scene, setScene] = useState(SCENES.GRAVITY);

  const SceneMenu = () => (
    <div className="flex gap-2 absolute bottom-0 rounded left-1/2 translate-x-[-50%] bg-[rgba(255,255,255,0.9)] p-2">
      <MenuItem
        selected={scene === SCENES.GRAVITY}
        onClick={() => setScene(SCENES.GRAVITY)}
      >
        Gravity
      </MenuItem>
      <MenuItem
        selected={scene === SCENES.VORTEX}
        onClick={() => setScene(SCENES.VORTEX)}
      >
        Vortex
      </MenuItem>
    </div>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {scene === SCENES.GRAVITY ? <GravityScene /> : <VortexScene />}
      <SceneMenu />
    </div>
  );
}
