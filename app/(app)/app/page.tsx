import Tiptap from "@/app/components/Tiptap";

const app = () => {
  return (
    <div className="flex min-h-screen w-full py-4 px-2">
      {/* EDITOR (LEFT) */}
      <main className="flex-1">
        <h1 className="text-4xl font-bold mb-10">
          AI Text Editor welcome to app
        </h1>
        <Tiptap />
      </main>

      {/* AI PANEL (RIGHT) */}
      <div className="w-[30%] border border-red-600 h-screen px-2">
        <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
        {/* AI chat UI goes here */}
      </div>
    </div>
  );
};

export default app;
