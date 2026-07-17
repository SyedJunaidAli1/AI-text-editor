"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowRightIcon,
  SparkleIcon,
  LightningIcon,
} from "@phosphor-icons/react";

export default function TryNowSection() {
  return (
    <section className="relative my-24 overflow-hidden">
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 dark:opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.696 0.17 162.48), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 dark:opacity-5"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.508 0.118 165.612), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Border card */}
      <div className="relative rounded-2xl border border-border bg-gradient-to-b from-muted/60 to-background/80 backdrop-blur-sm px-8 py-16 text-center shadow-xl">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase"
        >
          <SparkleIcon size={12} weight="fill" />
          Free to get started
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl mx-auto leading-tight"
        >
          Your ideas deserve a{" "}
          <span
            className="inline-block"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.696 0.17 162.48), oklch(0.508 0.118 165.612))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            smarter editor.
          </span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
        >
          Write, refine, and publish with AI assistance built right into your
          document — no context switching required.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/app">
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-[1.03]"
            >
              <span className="flex items-center gap-2">
                <LightningIcon size={18} weight="fill" />
                Try it now — it&apos;s free
                <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
              {/* Shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                }}
              />
            </Button>
          </Link>
        </motion.div>

        {/* Social proof mini strip */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-6 text-xs text-muted-foreground/70"
        >
          No credit card required &nbsp;·&nbsp; Works in your browser
          &nbsp;·&nbsp; AI-powered
        </motion.p>
      </div>
    </section>
  );
}
