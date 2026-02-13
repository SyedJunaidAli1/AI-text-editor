import { AnimatedThemeToggler } from "./components/AnimatedThemeToggler";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex gap-4 min-h-screen w-full max-w-3xl items-center py-2 sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to AI Text Editor</h1>
        <AnimatedThemeToggler />
      </main>
    </div>
  );
}
