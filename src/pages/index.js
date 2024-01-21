import React, { lazy, Suspense } from "react";
import Intro from "../components/portfolio/Intro";
import "react-medium-image-zoom/dist/styles.css";

const About = lazy(() => import("../components/portfolio/About"));
const Portfolio = lazy(() => import("../components/portfolio/Portfolio"));
const Contact = lazy(() => import("../components/portfolio/Contact"));

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
      <Intro />
      <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Portfolio location={location} />
        <Contact />
      </Suspense>
    </>
  );
}
