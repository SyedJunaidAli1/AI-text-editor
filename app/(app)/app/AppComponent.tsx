"use client";
import AIComponent from "@/app/components/AIComponent";
import Tiptap from "@/app/components/Tiptap";
import { useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RobotIcon } from "@phosphor-icons/react";
import { editorExtensions } from "@/lib/tiptap-extensions";

export default function AppComponent({ docId }: { docId?: string }) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const editor = useEditor({
    extensions: editorExtensions,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-no`,
      },
    },
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();

        setIsAIOpen(true);

        setTimeout(() => {
          textareaRef.current?.focus();
        }, 100);
      }
      if (e.key === "Escape") {
        setIsAIOpen(false);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      {/* EDITOR */}
      <main className="flex-1 pt-4 pr-4">
        <div className="flex justify-end mb-2">
          <Button onClick={() => setIsAIOpen((prev) => !prev)}>
            <RobotIcon size={32} /> AI
          </Button>
        </div>
        {/* 👇 pass docId */}
        <Tiptap docId={docId} editor={editor} />
      </main>

      {/* AI PANEL */}
      <div
        className={`transition-all duration-300 overflow-hidden h-screen ${isAIOpen ? "sm:w-3/6 lg:w-98 opacity-100" : "w-0 opacity-0"}`}
      >
        {isAIOpen && (
          <AIComponent
            documentId={docId}
            editor={editor}
            textarearef={textareaRef}
          />
        )}
      </div>
    </div>
  );
}
