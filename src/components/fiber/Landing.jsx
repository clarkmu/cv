import React, { Suspense, lazy, useState, useEffect } from "react";
import NoMansLoading from "./NoMansLoading";

const GravitySimulator = lazy(() => import("./GravitySimulator"));

const VortexSimulator = lazy(() => import("./Vortex"));

const NoMansSkySimulator = () =>
  true ? <NoMansLoading /> : lazy(() => import("./NoMansSky"));

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
  NOMANSSKY: "No Man's Sky",
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
        Select scenes from the menu at the bottom of this page.
      </div>
      <div className="text-blue-500 underline">
        <a href="https://clarkmu.com">Full Portfolio Website</a>
      </div>
    </div>
  </div>
);

const SceneMenu = ({ scene, setScene }) => {
  const [hasSeenMenu, setHasSeenMenu] = useState(false);
  useEffect(() => {
    if (!hasSeenMenu && scene !== SCENES.CLARKMU) {
      setHasSeenMenu(true);
    }
  }, [scene]);
  return (
    <div
      className={
        "flex gap-2 absolute bottom-0 rounded left-1/2 translate-x-[-50%] " +
        "transition-all bg-[rgba(255,255,255,0.75)] hover:bg-[rgba(255,255,255,0.9)] " +
        "p-2 hover:px-4 hover:py-3 hover:scale-110 " +
        "select-none " +
        (!hasSeenMenu && "animate-pulse hover:animate-none")
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
};

export default function Landing({ location }) {
  const [scene, setScene] = useState(
    SCENES[location.hash.replace("#", "").toUpperCase()] || SCENES.NOMANSSKY
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="relative w-full h-full">
        {scene === SCENES.CLARKMU ? (
          <SceneClarkMU />
        ) : scene === SCENES.GRAVITY ? (
          <GravityScene />
        ) : scene === SCENES.NOMANSSKY ? (
          <NoMansSkySimulator />
        ) : (
          <VortexScene />
        )}
        <SceneMenu scene={scene} setScene={setScene} />
      </div>
    </div>
  );
}
