import React, { Fragment, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Menu from "./components/Menu";
import InputContainer from "./components/InputContainer";
import Input from "./components/Input";
import { validateNumericInput } from "./lib/validateNumericInput";
import Button from "./components/Button";

const randomHex = () =>
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

export default function Vortex(params) {
  const [ij, setIJ] = useState(6);
  const [vw, setVw] = useState(0.5);
  const [vh, setVh] = useState(1.5);
  const [vz, setVz] = useState(0.5);
  const [ballSize, setBallSize] = useState(0.5);
  const [lights, setLights] = useState(true);

  const ii = 0.01;

  const [particles, setParticles] = useState(() => {
    const color = randomHex();

    return Array(1000)
      .fill()
      .map((_, i) => ({
        id: Math.random(),
        i,
        color,
        size: [ballSize],
        velocity: { x: 0, y: 0, z: 0 },
        position: {
          x: i * vw * Math.sin(ij * i + ii),
          y: i * vh,
          z: i * vz * Math.cos(ij * i + ii),
        },
      }));
  });

  function Sphere({ color, size, position, i, ...props }) {
    const ref = useRef();
    const negativeRef = useRef();

    useEffect(() => {
      ref.current.ii = 0;
    }, []);

    useFrame((state, delta) => {
      const newII = ref.current.ii + 0.01;
      ref.current.ii = negativeRef.current.ii = newII;

      const newX = i * vw * Math.sin(ij * i + ref.current.ii);
      ref.current.position.x = newX;
      negativeRef.current.position.x = -newX;

      const newY = i * vh;
      ref.current.position.y = newY;
      negativeRef.current.position.y = -newY;

      const newZ = i * vz * Math.cos(ij * i + ref.current.ii);
      ref.current.position.z = newZ;
      negativeRef.current.position.z = -newZ;
    });

    return [-1, 1].map((multiplier, i) => (
      <mesh
        key={`multiplier_${i}_${multiplier}`}
        {...props}
        ref={i ? ref : negativeRef}
        position={Object.values(position).map((v) => v * multiplier)}
      >
        <sphereGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    ));
  }

  useEffect(() => {
    setParticles((ps) => ps.map((p) => ({ ...p, size: [ballSize] })));
  }, [ballSize]);

  const VortexMenu = () => (
    <Menu>
      <div className="text-center text-white">PRESETS</div>
      <Button
        onClick={() => {
          setVw(0.5);
          setVh(0);
          setVz(0.5);
          setIJ(6.3);
        }}
      >
        Galactic
      </Button>
      <Button
        onClick={() => {
          setVw(0.5);
          setVh(1.5);
          setVz(0.5);
          setIJ(1.6);
        }}
      >
        Conical
      </Button>
      <Button
        onClick={() => {
          setVw(0.5);
          setVh(0);
          setVz(0.5);
          setIJ(6);
        }}
      >
        Vortex
      </Button>
      <Button
        onClick={() => {
          setVw(0.5);
          setVh(1.5);
          setVz(0.5);
          setIJ(6);
        }}
      >
        Reset
      </Button>
      <InputContainer label="C">
        <Input
          type="number"
          step={0.1}
          min={0}
          value={ij}
          onChange={(e) => setIJ(validateNumericInput(e))}
        />
      </InputContainer>
      <InputContainer label="Width">
        <Input
          type="number"
          step={0.5}
          min={0}
          value={vw}
          onChange={(e) => setVw(validateNumericInput(e))}
        />
      </InputContainer>
      <InputContainer label="Height">
        <Input
          type="number"
          step={0.5}
          min={0}
          value={vh}
          onChange={(e) => setVh(validateNumericInput(e))}
        />
      </InputContainer>
      <InputContainer label="Depth">
        <Input
          type="number"
          step={0.5}
          min={0}
          value={vz}
          onChange={(e) => setVz(validateNumericInput(e))}
        />
      </InputContainer>
      <InputContainer label="Ball Size">
        <Input
          type="number"
          step={0.5}
          min={0}
          value={ballSize}
          onChange={(e) => setBallSize(validateNumericInput(e))}
        />
      </InputContainer>
      <InputContainer label="Well Lit">
        <Input
          type="checkbox"
          step={0.5}
          min={0}
          checked={lights}
          onChange={(e) => setLights(e.target.checked)}
        />
      </InputContainer>
    </Menu>
  );

  return (
    <div className="bg-black w-full h-full relative">
      <Canvas camera={{ fov: 45, position: [-500, 50, 0] }}>
        <pointLight position={[-3, -3, -3]} decay={0} intensity={Math.PI} />
        <OrbitControls zoom0={10} />
        {particles.map(({ id, ...p }, i) => (
          <Fragment key={id}>
            {lights && (
              <ambientLight intensity={Math.PI / 2} position={p.position} />
            )}
            <Sphere key={id} {...p} />
          </Fragment>
        ))}
      </Canvas>
      <VortexMenu />
    </div>
  );
}
