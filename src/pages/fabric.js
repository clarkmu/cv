import React, { Suspense, lazy } from "react";

const GravitySimulator = lazy(() =>
  import("../components/fabric/GravitySimulator")
);

export default function fabric(params) {
  return (
    <div className="w-screen h-screen">
      <Suspense fallback={<div>Loading Simulator</div>}>
        <GravitySimulator />
      </Suspense>
    </div>
  );
}
