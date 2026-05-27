"use client";
import AIComponent from "@/app/components/AIComponent";
import Tiptap from "@/app/components/Tiptap";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RobotIcon } from "@phosphor-icons/react";

export default function AppComponent({ docId }: { docId?: string }) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Superscript,
      Subscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-no`,
      },
    },
    immediatelyRender: false,
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
      <main className="flex-1 p-4">
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
