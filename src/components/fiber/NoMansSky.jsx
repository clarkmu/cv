import React, { Fragment, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { randomHex } from "./lib/randomHex";
import { usePrevious } from "./lib/usePrevious";

function Sphere({ color, size, particle, message, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useEffect(() => {
    ref.current.velocity = particle.velocity;
  }, []);

  useFrame((state, delta) => {
    //
  });

  // console.log({ ref });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      position={Object.values(particle.position).map((v) => v)}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color || randomHex()} />
      {message && <div>{message}</div>}
    </mesh>
  );
}

export default function GravitySimulator() {
  const [particles, setParticles] = useState([
    {
      id: "sun",
      position: {
        x: -50,
        y: -50,
        z: -50,
      },
      size: [20],
      color: "#fed1e3",
    },
    {
      id: "planet1",
      position: {
        x: -10,
        y: -1,
        z: -1,
      },
      size: [0.5],
      color: randomHex(),
      message: "hello",
    },
  ]);

  return (
    <div className="bg-black w-full h-full relative">
      <Canvas camera={{ position: [0.5, 0.5, 0.5] }}>
        <axesHelper />
        <Environment preset="sunset" />
        <pointLight position={[0, -3, -3]} decay={0} intensity={Math.PI} />
        {particles.map((particle, i) => (
          <Fragment key={particle.id}>
            {/* <pointLight
              position={Object.keys(particle.position).map((k, v) => v)}
              decay={0}
              intensity={Math.PI}
            /> */}
            <Sphere
              particle={particle}
              position={particle.position}
              size={particle.size}
              color={particle.color}
            />
          </Fragment>
        ))}
        <OrbitControls zoom0={10} position0={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
