"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import HeroSection from "./components/HeroSection";
import TryNowSection from "./components/TryNowSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 max-w-7xl w-full p-4 mx-auto">
      <Nav />
      <section className="flex flex-col">
        <h1 className="text-4xl mt-16 leading-wide tracking-wide max-w-md">
          AI Text Editor is your digital text editor with AI-powered features.
        </h1>
        <div className="mt-10">
          <Link href="/app">
            <Button>Get started</Button>
          </Link>
        </div>
        <HeroSection />
      </section>
      <TryNowSection />
      <Footer />
    </main>
  );
}

