"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { SparkleIcon } from "@phosphor-icons/react";

interface InteractivePhotoCardProps {
  bgImage: string;
  previewImage: string;
  alt: string;
  badge: string;
  title: string;
  description: string;
  imagePosition: "right" | "left";
  index: number;
}

const InteractivePhotoCard = ({
  bgImage,
  previewImage,
  alt,
  badge,
  title,
  description,
  imagePosition,
  index,
}: InteractivePhotoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate values normalized between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid motion
  const mouseX = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 25 });

  // 3D Tilt transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  // Parallax translation for the floating UI screenshot (moves opposite to tilt for depth)
  const imageTranslateX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const imageTranslateY = useTransform(mouseY, [-0.5, 0.5], [-14, 14]);

  // Spotlight shine effect coordinates (percentage 0% to 100%)
  const glareX = useTransform(mouseX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [10, 90]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromLeft = e.clientX - rect.left;
    const mouseFromTop = e.clientY - rect.top;

    x.set(mouseFromLeft / width - 0.5);
    y.set(mouseFromTop / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl border border-border/80 bg-card p-2.5 transition-colors duration-300 hover:border-primary/40 hover:shadow-2xl"
      >
        {/* Photo Container with background image and shine overlay */}
        <div
          className="relative lg:h-100 h-80 rounded-xl bg-cover bg-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
          style={{ backgroundImage: `url('${bgImage}')` }}
        >
          {/* Subtle gradient vignette to add rich contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Interactive cursor spotlight shine */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle 260px at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 70%)`,
              ),
            }}
          />

          {/* Floating UI Image with 3D Parallax & Hover Elevation */}
          <motion.div
            style={{
              x: imageTranslateX,
              y: imageTranslateY,
              transformStyle: "preserve-3d",
            }}
            className={`absolute top-14 w-[92%] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] ${
              imagePosition === "right" ? "-right-8" : "-left-8"
            }`}
          >
            <div className="relative">
              <Image
                src={previewImage}
                alt={alt}
                width={900}
                height={900}
                loading="lazy"
                className="rounded-xl shadow-2xl ring-1 ring-black/20 dark:ring-white/10"
              />

              {/* Ambient neon rim glow on hover */}
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-emerald-400/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
            </div>
          </motion.div>

          {/* Badge over photo */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/20 text-xs font-medium shadow-md">
            <SparkleIcon size={13} className="text-primary" weight="fill" />
            <span>{badge}</span>
          </div>
        </div>

        {/* Text Details Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold leading-snug tracking-wide group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>

          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureSection = () => {
  return (
    <section className="mt-20 leading-wide tracking-wide">
      <div className="flex flex-col items-start">
        <span className="text-xs uppercase font-semibold tracking-widest text-primary mb-2">
          Built for personal use
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-lg">
          Text Editor + AI Chat in one place.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Card 1 */}
        <InteractivePhotoCard
          index={0}
          bgImage="/card.jpg"
          previewImage="/ui1.png"
          alt="Editor preview"
          badge="Editor Experience"
          title="Rich text editing with AI"
          description="A distraction-free writing experience with formatting, history, Markdown export, and an AI assistant always one click away."
          imagePosition="right"
        />

        {/* Card 2 */}
        <InteractivePhotoCard
          index={1}
          bgImage="/card2.jpg"
          previewImage="/ui2.png"
          alt="AI preview"
          badge="Smart Assistant"
          title="AI assistance while you write"
          description="Summarize notes, rewrite paragraphs, brainstorm ideas, and improve your writing without leaving the document."
          imagePosition="left"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
