import React, { Suspense, lazy, useState } from "react";

const GravitySimulator = lazy(() =>
  import("../components/fiber/GravitySimulator")
);

const VortexSimulator = lazy(() => import("../components/fiber/Vortex"));

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
      "transition-all hover:font-bold cursor-pointer px-1 rounded " +
      (selected ? "border-2 border-gray-500" : "")
    }
  >
    {children}
  </div>
);

const SCENES = {
  CLARKMU: "ClarkMU",
  GRAVITY: "Gravity",
  VORTEX: "Vortex",
};

const SceneClarkMU = () => (
  <div className="w-full h-full bg-black flex flex-col gap-4 justify-center items-center">
    <div className="flex flex-col gap-4 text-center w-1/2">
      <div className="text-white text-4xl font-bolder">
        ClarkMU Fiber Portfolio
      </div>
      <div className="text-white text-2xl">
        A collection of inspiring animations with UI to toggle scenes.
      </div>
      <div className="text-white text-2xl">
        Select scenes from the menu below.
      </div>
      <div className="text-blue-500 underline">
        <a href="https://clarkmu.com">Full Portfolio Website</a>
      </div>
    </div>
  </div>
);

export default function Fiber() {
  const [scene, setScene] = useState(SCENES.VORTEX);

  const SceneMenu = () => (
    <div
      className={
        "flex gap-2 absolute bottom-0 rounded left-1/2 translate-x-[-50%] " +
        "transition-all bg-[rgba(255,255,255,0.75)] hover:bg-[rgba(255,255,255,0.9)] " +
        "p-2 hover:px-4 hover:py-3 hover:scale-110 " +
        "select-none"
      }
    >
      {Object.keys(SCENES).map((key) => (
        <MenuItem
          key={key}
          selected={scene === SCENES[key]}
          onClick={() => setScene(SCENES[key])}
        >
          {SCENES[key]}
        </MenuItem>
      ))}
    </div>
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="relative w-full h-full">
        {scene === SCENES.CLARKMU ? (
          <SceneClarkMU />
        ) : scene === SCENES.GRAVITY ? (
          <GravityScene />
        ) : (
          <VortexScene />
        )}
        <SceneMenu />
      </div>
    </div>
  );
}
