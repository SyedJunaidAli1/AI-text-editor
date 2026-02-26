import Tiptap from "@/app/components/Tiptap";

const app = () => {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="min-h-screen w-full max-w-3xl items-center py-2 sm:items-start">
        <h1 className="text-4xl font-bold">AI Text Editor welcome to app</h1>
        <Tiptap />
      </main>
    </div>
  );
};

export default app;
