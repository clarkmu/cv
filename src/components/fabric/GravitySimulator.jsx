import React, { Fragment, useEffect } from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Input = ({ clasName, ...props }) => (
  <input
    {...props}
    className={`border-2 border-black w-[5ch] rounded px-1 ${clasName}`}
  />
);

const InputContainer = ({ children, label }) => (
  <div className="flex gap-2 justify-between w-full">
    <label>{label}</label>
    {children}
  </div>
);

const randomHex = () =>
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

function Sphere({
  color,
  size,
  particle,
  calculateParticleVelocity,
  isParticle = false,
  ...props
}) {
  const ref = useRef();
  //   const [hovered, hover] = useState(false);
  //   const [clicked, click] = useState(false);

  useEffect(() => {
    ref.current.velocity = particle.velocity;
  }, []);

  useFrame((state, delta) => {
    if (!isParticle) {
      //   ref.current.rotation.x += delta;
      return;
    }

    const p = ref.current;

    const v = calculateParticleVelocity(p, delta);

    ref.current.velocity = v;

    ref.current.position.x -= v.x * delta;
    ref.current.position.y -= v.y * delta;
    ref.current.position.z -= v.z * delta;
  });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      position={Object.values(particle.position).map((v) => v)}
      //   scale={clicked ? 1.5 : 1}
      //   onClick={(event) => click(!clicked)}
      //   onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      //   onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color || randomHex()} />
    </mesh>
  );
}

const randomGravity = (i) => ({
  id: Math.random(),
  position: {
    x: i === 0 ? 0 : i === 1 ? -5 : Math.random() * 30,
    y: i === 0 ? 0 : i === 1 ? -5 : Math.random() * 30,
    z: i === 0 ? 0 : i === 1 ? -5 : Math.random() * 30,
  },
  velocity: { x: 0, y: 0, z: 0 },
  size: [2],
  color: randomHex(),
});
const randomParticle = () => ({
  id: Math.random(),
  position: {
    x: Math.random() * 30 - 15,
    y: Math.random() * 30 - 15,
    z: Math.random() * 30 - 15,
  },
  velocity: {
    x: Math.floor(Math.random() * 2 - 2),
    y: Math.floor(Math.random() * 2 - 2),
    z: Math.floor(Math.random() * 2 - 2),
  },
  size: [0.5],
  color: randomHex(),
});

const validateNumericInput = (e) => {
  // input.number allows empty no value >_>
  let v = parseInt(e.target.value);
  if (v === NaN) v = 0;
  return v;
};

export default function GravitySimulator() {
  const [gravityCount, setGravityCount] = useState(2);
  const [particleCount, setParticleCount] = useState(5);
  const [gravities, setGravities] = useState([]);
  const [particles, setParticles] = useState([]);
  const [speed, setSpeed] = useState(1);

  //TODO allow orbiting particles around gravity/particle
  //   const [satellites, setSatellites] = useState([]);

  const [regenerate, setRegenerate] = useState(0);

  const previousGravityCount = usePrevious(gravityCount);
  const previousParticleCount = usePrevious(particleCount);

  const calculateParticleVelocity = (particle, delta) => {
    //idky i got this random undefined error on count change sometimes
    if (!particle.velocity) {
      return { x: 0, y: 0, z: 0 };
    }

    let {
      velocity,
      position: { x, y, z },
    } = particle;

    gravities.forEach(({ position: { x: gx, y: gy, z: gz } }) => {
      const f =
        speed /
        Math.sqrt(
          Math.pow(x - gx, 2) + Math.pow(y - gy, 2) + Math.pow(z - gz, 2)
        );

      velocity.x += f * (x - gx) * delta;
      velocity.y += f * (y - gy) * delta;
      velocity.z += f * (z - gz) * delta;
    });

    return velocity;
  };

  useEffect(() => {
    // handle init and Regenerate button
    setGravities(
      Array(gravityCount)
        .fill()
        .map((v, i) => randomGravity(i))
    );

    setParticles(
      Array(particleCount)
        .fill()
        .map(() => randomParticle())
    );
  }, [regenerate]);

  useEffect(() => {
    // handle gravity and particle count changes , allowing
    // for counts to change from 5 -> 50 , keeps old particles/gravities

    if (previousParticleCount && previousParticleCount !== particleCount) {
      if (previousParticleCount < particleCount) {
        setParticles((p) => [
          ...p,
          ...Array(particleCount - previousParticleCount)
            .fill()
            .map(() => randomParticle()),
        ]);
      } else {
        setParticles((p) => p.slice(0, particleCount));
      }
    }

    if (previousGravityCount && previousGravityCount !== gravityCount) {
      if (previousGravityCount < gravityCount) {
        setGravities((g) => [
          ...g,
          ...Array(gravityCount - previousGravityCount)
            .fill()
            .map((v, i) => randomGravity(i + g.length)),
        ]);
      } else {
        setGravities((g) => g.slice(0, gravityCount));
      }
    }
  }, [gravityCount, particleCount]);

  const Menu = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      //   user menu overlay component

      <div className="w-[15ch] absolute top-2 left-2 flex flex-col gap-4 bg-[rgba(255,255,255,0.25)] p-4 rounded select-none">
        <div
          className="bg-[rgba(255,255,255,0.5)] text-center cursor-pointer"
          onClick={() => setCollapsed((b) => !b)}
        >
          <div
            className={
              " transition-all rotate-0 " + (collapsed && " !-rotate-90")
            }
          >
            V
          </div>
        </div>
        {!collapsed && (
          <>
            <InputContainer label="Gravities">
              <Input
                type="number"
                value={gravityCount}
                onChange={(e) => setGravityCount(validateNumericInput(e))}
                min={0}
              />
            </InputContainer>
            <InputContainer label="Particles">
              <Input
                type="number"
                value={particleCount}
                onChange={(e) => setParticleCount(validateNumericInput(e))}
                min={0}
              />
            </InputContainer>
            <InputContainer label="Speed">
              <Input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(validateNumericInput(e))}
                min={1}
                step={speed > 101 ? 100 : 10}
              />
            </InputContainer>
            <button
              className="bg-white hover:bg-gray-100 rounded px-2 py-1"
              onClick={() => setRegenerate(Math.random())}
            >
              Regenerate
            </button>
            <span className="bg-white text-black text-sm px-2 py-1">
              Pan and zoom to move around.
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-black w-full h-full relative">
      <Canvas>
        <pointLight position={[0, -3, -3]} decay={0} intensity={Math.PI} />
        {gravities.map((gravity, i) => (
          <Fragment key={`gravity_${gravity.id}`}>
            <ambientLight intensity={Math.PI / 2} position={gravity.position} />
            <Sphere
              particle={gravity}
              position={gravity.position}
              size={gravity.size}
              color={gravity.color}
              isParticle={false}
              calculateParticleVelocity={calculateParticleVelocity}
            />
          </Fragment>
        ))}
        {particles.map((particle, i) => (
          <Sphere
            key={`particle_${particle.id}`}
            particle={particle}
            position={particle.position}
            size={particle.size}
            color={particle.color}
            isParticle={true}
            calculateParticleVelocity={calculateParticleVelocity}
          />
        ))}
        <OrbitControls zoom0={10} />
      </Canvas>
      <Menu />
    </div>
  );
}
