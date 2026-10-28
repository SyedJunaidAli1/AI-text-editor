"use client";

import { EditorContent, useEditor, useEditorState, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef, useCallback } from "react";
import { editorExtensions } from "@/lib/tiptap-extensions";
import {
  ArrowCounterClockwiseIcon,
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  CodeBlockIcon,
  CodeIcon,
  RobotIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextIndentIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextSubscriptIcon,
  TextSuperscriptIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { DotmHex1 } from "@/components/ui/dotm-hex-1";

// The document content to type out, as Tiptap-compatible JSON blocks
const DEMO_CONTENT = [
  {
    type: "heading",
    attrs: { level: 2 },
    content: [{ type: "text", text: "Project Kickoff Notes" }],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Weekly planning meeting for the upcoming product release.",
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This week we'll focus on improving the editor experience, polishing the AI assistant, and preparing the first public release.",
      },
    ],
  },
  {
    type: "heading",
    attrs: { level: 3 },
    content: [{ type: "text", text: "Upcoming Tasks" }],
  },
  {
    type: "bulletList",
    content: [
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Finish the landing page interactions.",
              },
            ],
          },
        ],
      },
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Improve AI response animations.",
              },
            ],
          },
        ],
      },
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Add document export functionality.",
              },
            ],
          },
        ],
      },
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Optimize mobile responsiveness.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "heading",
    attrs: { level: 3 },
    content: [{ type: "text", text: "Meeting Schedule" }],
  },
  {
    type: "bulletList",
    content: [
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Product Review — 9:00 AM • 11 July 2026",
              },
            ],
          },
        ],
      },
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Design Sync — 2:00 PM • 15 July 2026",
              },
            ],
          },
        ],
      },
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Launch Planning — 10:00 AM • 22 July 2026",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "blockquote",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: '"Build tools that help people write faster without getting in their way."',
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Highlight any paragraph and ask AI to summarize, rewrite, or improve it instantly.",
      },
    ],
  },
];

// Helper: extract the plain text from a Tiptap JSON node recursively
function extractText(node: Record<string, unknown>): string {
  if (node.type === "text") return (node.text as string) || "";
  if (Array.isArray(node.content)) {
    return (node.content as Record<string, unknown>[])
      .map((child) => extractText(child))
      .join("");
  }
  return "";
}

// Helper: build a sequence of { text, node } pairs for typing
function buildTypingSequence(
  blocks: Record<string, unknown>[],
): { text: string; node: Record<string, unknown> }[] {
  const seq: { text: string; node: Record<string, unknown> }[] = [];
  for (const block of blocks) {
    const text = extractText(block);
    seq.push({ text, node: block });
  }
  return seq;
}

interface DemoTiptapProps {
  onAIClick?: () => void;
}

const DemoTiptap = ({ onAIClick }: DemoTiptapProps) => {
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const animationRef = useRef<{ active: boolean }>({ active: true });
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: editorExtensions,
    immediatelyRender: false,
    editable: true,
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-sm prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-none`,
      },
    },
  });

  // Sleep helper
  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      }),
    [],
  );

  // Typewriter animation using Tiptap's editor commands
  useEffect(() => {
    if (!editor) return;

    const ctrl = { active: true };
    animationRef.current = ctrl;

    // Reset everything
    setTitleText("");
    setDescText("");
    setIsAnimating(true);
    editor.commands.setContent("", false);

    const runAnimation = async () => {
      await sleep(400);
      if (!ctrl.active) return;

      // 1. Type the title character by character
      const fullTitle = "Project Kickoff";
      for (let i = 0; i <= fullTitle.length; i++) {
        if (!ctrl.active) return;
        setTitleText(fullTitle.slice(0, i));
        await sleep(35);
      }
      if (!ctrl.active) return;

      await sleep(200);

      // 2. Type the description
      const fullDesc = "Project Related stuff";
      for (let i = 0; i <= fullDesc.length; i++) {
        if (!ctrl.active) return;
        setDescText(fullDesc.slice(0, i));
        await sleep(25);
      }
      if (!ctrl.active) return;

      await sleep(300);

      // 3. Type document content block by block, character by character
      const sequence = buildTypingSequence(DEMO_CONTENT);

      for (let blockIdx = 0; blockIdx < sequence.length; blockIdx++) {
        if (!ctrl.active) return;
        const { text, node } = sequence[blockIdx];

        // For each block, we insert the full structured node but type text progressively
        // Strategy: insert full node, then we let it appear naturally
        // For a more authentic feel, we type each character into the editor

        // Move cursor to end
        editor.commands.focus("end");

        // For list blocks that contain multiple items, insert the whole block at once
        // but with a slight delay for visual effect
        if (node.type === "bulletList" || node.type === "orderedList") {
          const items = (node.content as Record<string, unknown>[]) || [];
          for (let itemIdx = 0; itemIdx < items.length; itemIdx++) {
            if (!ctrl.active) return;
            const itemText = extractText(items[itemIdx]);

            // Type the list item character by character
            if (itemIdx === 0) {
              // Start a new bullet list
              editor.commands.focus("end");
              editor.chain().focus("end").toggleBulletList().run();
            } else {
              // Add a new list item by pressing Enter
              editor.commands.focus("end");
              editor.chain().focus("end").splitListItem("listItem").run();
            }

            for (let charIdx = 0; charIdx < itemText.length; charIdx++) {
              if (!ctrl.active) return;
              editor.commands.focus("end");
              editor.commands.insertContent(itemText[charIdx]);
              await sleep(15);
            }

            await sleep(100);
          }

          // Exit list by pressing Enter twice (creates empty item, then lifts it)
          editor.commands.focus("end");
          editor.chain().focus("end").splitListItem("listItem").run();
          editor.chain().focus("end").liftListItem("listItem").run();

          await sleep(150);
        } else {
          // For headings, paragraphs, blockquotes — set the block type first, then type
          editor.commands.focus("end");

          if (node.type === "heading") {
            const level = (node.attrs as { level: number })?.level || 2;
            editor
              .chain()
              .focus("end")
              .setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
              .run();
          } else if (node.type === "blockquote") {
            editor.chain().focus("end").setBlockquote().run();
          }

          // Type character by character
          for (let charIdx = 0; charIdx < text.length; charIdx++) {
            if (!ctrl.active) return;
            editor.commands.focus("end");
            editor.commands.insertContent(text[charIdx]);
            await sleep(15);
          }

          // Press Enter to move to next block
          editor.commands.focus("end");

          if (node.type === "blockquote") {
            // Exit blockquote
            editor.chain().focus("end").enter().run();
            editor.chain().focus("end").liftEmptyBlock().run();
          } else if (node.type === "heading") {
            // After heading, go back to paragraph
            editor.chain().focus("end").enter().run();
            editor.chain().focus("end").setParagraph().run();
          } else {
            editor.chain().focus("end").enter().run();
          }

          await sleep(100);

          // Extra pause after punctuation
          const lastChar = text[text.length - 1];
          if (lastChar === "." || lastChar === '"') {
            await sleep(100);
          }
        }
      }

      if (ctrl.active) {
        setIsAnimating(false);
      }
    };

    runAnimation();

    return () => {
      ctrl.active = false;
    };
  }, [editor, replayTrigger, sleep]);

  const handleReplay = () => {
    animationRef.current.active = false;
    setReplayTrigger((prev) => prev + 1);
  };

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor .ProseMirror .has-focus {
          caret-color: hsl(var(--primary));
        }
      `}</style>

      {/* Title + Description + Actions */}
      <section className="px-2 py-2 w-full shrink-0">
        <div className="flex w-full justify-between items-center mb-2">
          <Input
            ref={titleInputRef}
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="!text-3xl font-bold px-0 border-none bg-transparent focus-visible:ring-0 w-full"
            placeholder="Enter Title..."
            readOnly={isAnimating}
          />
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReplay}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              title="Restart writing simulation"
            >
              {isAnimating ? (
                <DotmHex1
                  size={14}
                  dotSize={3}
                  colorPreset="solid-mint"
                  bloom
                  animated={true}
                />
              ) : (
                <ArrowCounterClockwiseIcon className="text-primary" size={32} />
              )}
              Replay
            </Button>
            {onAIClick && (
              <Button onClick={onAIClick}>
                <RobotIcon size={24} /> AI
              </Button>
            )}
          </div>
        </div>

        <Input
          ref={descInputRef}
          type="text"
          placeholder="Enter Description..."
          value={descText}
          onChange={(e) => setDescText(e.target.value)}
          className="text-muted-foreground px-0 focus-visible:ring-0 border-none w-full max-w-xl bg-transparent"
          readOnly={isAnimating}
        />
      </section>

      {/* Toolbar */}
      <DemoToolbar editor={editor} />

      {/* Editor Content */}
      <div className={`flex-1 overflow-y-auto px-2 py-2 ${isAnimating ? "typing-cursor" : ""}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

// Toolbar — extracted, same formatting buttons as the real app but no API deps
const DemoToolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold") ?? false,
      isItalic: ctx.editor.isActive("italic") ?? false,
      isStrike: ctx.editor.isActive("strike") ?? false,
      isUnderline: ctx.editor.isActive("underline") ?? false,
      isCode: ctx.editor.isActive("code") ?? false,
      isSuperscript: ctx.editor.isActive("superscript") ?? false,
      isSubscript: ctx.editor.isActive("subscript") ?? false,
      isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
      isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
      isBlockquote: ctx.editor.isActive("blockquote") ?? false,
      isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
    }),
  });

  return (
    <div className="w-full flex flex-wrap items-center border-b gap-1 px-2 shrink-0">
      <Button
        variant="ghost"
        className="px-2"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <ArrowUUpLeftIcon size={24} />
      </Button>
      <Button
        variant="ghost"
        className="px-2"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <ArrowUUpRightIcon size={24} />
      </Button>

      <Toggle
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Blockquote"
      >
        <TextIndentIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Code Block"
      >
        <CodeBlockIcon size={24} />
      </Toggle>

      <Toggle
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <TextBIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <TextItalicIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strike"
      >
        <TextStrikethroughIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Code"
      >
        <CodeIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <TextUnderlineIcon size={24} />
      </Toggle>

      <Toggle
        pressed={editorState.isSuperscript}
        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
        aria-label="Superscript"
      >
        <TextSuperscriptIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isSubscript}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        aria-label="Subscript"
      >
        <TextSubscriptIcon size={24} />
      </Toggle>

      <Toggle
        pressed={editorState.isAlignLeft}
        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
        aria-label="Align Left"
      >
        <TextAlignLeftIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isAlignCenter}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        aria-label="Align Center"
      >
        <TextAlignCenterIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isAlignRight}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        aria-label="Align Right"
      >
        <TextAlignRightIcon size={24} />
      </Toggle>
      <Toggle
        pressed={editorState.isAlignJustify}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        aria-label="Align Justify"
      >
        <TextAlignJustifyIcon size={24} />
      </Toggle>
    </div>
  );
};

export default DemoTiptap;
