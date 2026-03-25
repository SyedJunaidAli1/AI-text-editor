"use client";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "./components/AnimatedThemeToggler";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex gap-4 min-h-screen w-full max-w-3xl items-center py-2 sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to AI Text Editor</h1>
        <AnimatedThemeToggler />
        <div>
          <Link href="/app">
            <Button>Get started</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
