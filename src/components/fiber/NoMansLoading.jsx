import React, { useState, useEffect, useRef } from "react";

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
const radiansToDegrees = (radians) => radians * (180 / Math.PI);

const count = 60;
const step = 360 / count;
const timer = 25;
const dots = [...Array(count).keys()];

export default function NoMansLoading() {
  const [currIndex, setCurrIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const updateCurrIndex = () => {
    setCurrIndex((c) => {
      if (!isRunning) {
        //let timer run but don't increment currIndex.
        //   This was a huge workaround for the ring run process
        return c;
      }
      const next = c + 1;
      return next >= count ? 0 : next;
    });
  };

  useEffect(() => {
    const pauseTimer = currIndex === count - 1;
    const pauseTimerLength = 3000;
    if (pauseTimer) {
      setIsRunning(false);
      setTimeout(() => setIsRunning(true), pauseTimerLength);
    }

    // attempting to make run slower as it approaches/leaves top of ring
    const newTimer = pauseTimer
      ? pauseTimerLength
      : timer + 50 * Math.sin(degreesToRadians((currIndex * step) / 2));
    // console.log({ newTimer, currIndex });
    setTimeout(updateCurrIndex, newTimer);
  }, [currIndex]);

  useEffect(updateCurrIndex, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative">
        {/* inner rings red */}
        <div className="absolute translate-y-3 translate-x-1">
          <div className="relative">
            {[110, 95, 80].map((dim) => (
              <div
                key={`dim_${dim}`}
                style={{ width: dim + "px", height: dim + "px" }}
                className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-red-700 border-4"
              ></div>
            ))}
          </div>
        </div>
        {/* animated ring */}
        {dots.map((i) => {
          let tier = Math.abs(currIndex - i);
          const max = 3;
          let isSpecial = tier < max;
          tier = isSpecial ? tier : max + 1;

          if (!isRunning) {
            isSpecial = false;
            tier = max + 1;
          }

          return (
            <div
              key={i}
              style={{
                rotate: `${i * step}deg`,
                background: isSpecial ? "red" : "white",
                height: 10 + (20 - tier) + "px",
                width: "4px",
                animationDuration: !isRunning ? "500ms" : "",
              }}
              className="transition-all absolute translate-y-[300%]"
            ></div>
          );
        })}
      </div>
    </div>
  );
}
