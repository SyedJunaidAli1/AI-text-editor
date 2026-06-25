"use client";

import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="bg-[url(/hero-image-bg.png)] relative h-[800px] w-full rounded-lg mt-12 pt-16 overflow-hidden">
      <motion.div
        drag
        dragMomentum={false}
        className="absolute inset-x-0 mx-auto w-5xl h-[700px] bg-background rounded-lg border shadow-2xl"
      ></motion.div>
    </section>
  );
};

export default HeroSection;
