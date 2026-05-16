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
import { use } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ docId?: string }>;
}) {
  const { docId } = use(searchParams);

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
    content: `
    <h1>AI Text Editor Demo 🚀</h1>

    <p>This is a <strong>bold</strong>, <em>italic</em>, <s>strikethrough</s>, and <u>underline</u> text example.</p>

    <h2>Code & Inline Code</h2>
    <p>You can write inline code like <code>const x = 10;</code> inside text.</p>

    <pre><code>function greet() {
      console.log("Hello from code block!");
    }</code></pre>

    <h2>Blockquote</h2>
    <blockquote>
      <p>This is a blockquote. It should have a left border and styled text.</p>
    </blockquote>

    <h2>Lists</h2>

    <p>Bullet List:</p>
    <ul>
      <li>First bullet item</li>
      <li>Second bullet item</li>
      <li>Third bullet item</li>
    </ul>

    <p>Ordered List:</p>
    <ol>
      <li>Step one</li>
      <li>Step two</li>
      <li>Step three</li>
    </ol>

    <p>Task List:</p>
    <ul data-type="taskList">
      <li data-type="taskItem">
        <label><input type="checkbox" /></label>
        <div><p>Write some content</p></div>
      </li>
      <li data-type="taskItem">
        <label><input type="checkbox" checked /></label>
        <div><p>Build editor toolbar</p></div>
      </li>
      <li data-type="taskItem">
        <label><input type="checkbox" /></label>
        <div><p>Add AI features later 🤖</p></div>
      </li>
    </ul>

    <h2>Alignment</h2>
    <p style="text-align: left;">This text is left aligned.</p>
    <p style="text-align: center;">This text is center aligned.</p>
    <p style="text-align: right;">This text is right aligned.</p>

    <h2>Superscript & Subscript</h2>
    <p>Water formula: H<sub>2</sub>O</p>
    <p>Math example: x<sup>2</sup> + y<sup>2</sup></p>

    <h3>Final Note</h3>
    <p>Try editing everything above 👆 — your editor should handle all of it.</p>
    `,
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-no`,
      },
    },
    immediatelyRender: false,
  });
  return (
    <div className="flex min-h-screen w-full px-4 py-4">
      {/* EDITOR */}
      <main className="flex-1">
        {/* 👇 pass docId */}
        <Tiptap docId={docId} editor={editor} />
      </main>

      {/* AI PANEL */}
      <div className="w-[30%] border border-red-600 h-screen px-2">
        <AIComponent documentId={docId} editor={editor} />
      </div>
    </div>
  );
}
