"use client";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "./components/AnimatedThemeToggler";
import Link from "next/link";
import Nav from "@/app/components/Nav";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center font-sans">
      <main className="flex gap-4  w-full justify-center py-2">
        <Nav />
        {/*<h1 className="text-4xl font-bold">Welcome to AI Text Editor</h1>
        <AnimatedThemeToggler />
        <div>
          <Link href="/app">
            <Button>Get started</Button>
          </Link>
        </div>*/}
      </main>
    </div>
  );
}
