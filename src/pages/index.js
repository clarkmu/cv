import React, { lazy, Suspense } from "react";
import Intro from "../components/Intro";
import "react-medium-image-zoom/dist/styles.css";

// import meImg from "../images/me.jpeg";

const About = lazy(() => import("../components/About"));
const Portfolio = lazy(() => import("../components/Portfolio"));
const Contact = lazy(() => import("../components/Contact"));

// inspired by: https://melaniedaveid.com/

export function Head() {
  return (
    <>
      <html lang="en"></html>
      <title>Michael Clark Portfolio</title>
    </>
  );
}

export default function App({ location }) {
  return (
    <>
      {/* <div className="h-screen w-screen">
        <div className="rounded-full overflow-hidden border-5 border border-blue-900 w-fit">
          <img src={meImg} />
        </div>
      </div> */}
      <Intro />
      <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Portfolio location={location} />
        <Contact />
      </Suspense>
    </>
  );
}
