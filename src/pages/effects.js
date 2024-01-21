import React, { useEffect, useMemo, useState } from "react";

const randomBoolean = () => Math.random() > 0.5;
// const randomThird = () => Math.random() > 0.66;
// const randomI8 = () => Math.floor(Math.random() * 255);
function checkI8(i) {
  if (i > 255) return 250;
  if (i < 0) return 5;
  return i;
}

function cancelAllAnimationFrames() {
  var id = window.requestAnimationFrame(function () {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
}

const Shader = () => {
  const [circles, setCircles] = useState([]);
  const [color, setColor] = useState("b");
  const [isDark, setIsDark] = useState(false);

  const defaultColor = useMemo(() => (isDark ? 0 : 255), [isDark]);

  function init() {
    const dim = Math.hypot(window.innerWidth, window.innerHeight);

    setCircles(
      [...Array(10).keys()].map((i) => ({
        i,
        r: initColor("r", i),
        g: initColor("g", i),
        b: initColor("b", i),
        radius: Math.floor(dim / (i + 1)),
      }))
    );

    requestAnimationFrame(run);
  }
  useEffect(init, [init]);
  useEffect(() => {
    // console.log("REINIT");
    cancelAllAnimationFrames();
    init();
  }, [color, isDark]);

  function initColor(selectedColor, i) {
    if (selectedColor !== color) return defaultColor;
    return 255 - i * 2;
  }

  function updateColor(c, selectedColor) {
    if (selectedColor !== color) return defaultColor;
    return checkI8(c + (randomBoolean() ? 1 : -1));
  }

  function run() {
    setCircles((c) =>
      c.map(({ r, g, b, ...circle }) => ({
        r: updateColor(r, "r"),
        g: updateColor(g, "g"),
        b: updateColor(b, "b"),
        ...circle,
      }))
    );
    setTimeout(() => requestAnimationFrame(run), 100);
  }

  const Circle = ({ r, g, b, radius, i }) => {
    const rgb = `${r},${g},${b}`;
    return (
      <div
        style={{
          width: radius,
          height: radius,
          backgroundColor: `rgb(${rgb})`,
          //   zIndex: i,
          inset: 0,
          position: "absolute",
          borderRadius: "999px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      ></div>
    );
  };

  return (
    <div className="w-screen h-screen relative">
      {/* Circles */}
      {circles.map((circle, i) => (
        <Circle key={`circle_${i}`} {...circle} />
      ))}
      {/* Blur Filter to smooth out edges  */}
      <div className="absolute inset-0 backdrop-blur-md"></div>
      {/* Menu */}
      <div className="absolute top-0 left-0 flex flex-col gap-2">
        <div className="flex gap-2">
          <button onClick={() => setColor("r")}>R</button>
          <button onClick={() => setColor("g")}>G</button>
          <button onClick={() => setColor("b")}>B</button>
        </div>
        <input placeholder="Enter r,g,b" className="w-[8ch]" />

        <label htmlFor="isDark">IsDark</label>
        <input
          id="isDark"
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark((b) => !b)}
        />
      </div>
    </div>
  );
};

export default function effects(params) {
  return <Shader />;
}
