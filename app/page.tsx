import React from "react";

import { Hero } from "../components/Hero";
import { AboutMe } from "@/components/AboutMe";

export default function Home() {
  return (
    <>
      {/* <main className="h-screen pb-36 w-full rounded-md flex md:items-center md:justify-center bg-neutral-100 dark:bg-black/[0.96] dark:bg-grid-white/[0.03] bg-grid-black/[0.04] relative overflow-hidden"> */}
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <Hero />
      {/* <AboutMe /> */}
      {/* </main> */}
    </>
  );
}
