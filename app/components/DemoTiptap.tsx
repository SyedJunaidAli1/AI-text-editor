"use client";

import { EditorContent, useEditor, useEditorState, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LinkComponent from "@/app/components/LinkComponent";
import { useEffect, useState, useRef, useCallback } from "react";
import { editorExtensions } from "@/lib/tiptap-extensions";
import {
  ArrowCounterClockwiseIcon,
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  CaretDownIcon,
  CodeBlockIcon,
  CodeIcon,
  HighlighterIcon,
  LinkBreakIcon,
  ListChecksIcon,
  ListIcon,
  ListNumbersIcon,
  ProhibitIcon,
  RobotIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextHFourIcon,
  TextHIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextIndentIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextSubscriptIcon,
  TextSuperscriptIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { DotmHex1 } from "@/components/ui/dotm-hex-1";

type DemoBlock =
  | {
      type: "heading";
      level: 1 | 2 | 3 | 4 | 5 | 6;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "bulletList";
      items: string[];
    }
  | {
      type: "blockquote";
      text: string;
    };

const DEMO_BLOCKS: DemoBlock[] = [
  {
    type: "heading",
    level: 2,
    text: "Project Kickoff Notes",
  },
  {
    type: "paragraph",
    text: "Weekly planning meeting for the upcoming product release.",
  },
  {
    type: "paragraph",
    text: "This week we'll focus on improving the editor experience, polishing the AI assistant, and preparing the first public release.",
  },
  {
    type: "heading",
    level: 3,
    text: "Upcoming Tasks",
  },
  {
    type: "bulletList",
    items: [
      "Finish the landing page interactions.",
      "Improve AI response animations.",
      "Add document export functionality.",
      "Optimize mobile responsiveness.",
    ],
  },
  {
    type: "heading",
    level: 3,
    text: "Meeting Schedule",
  },
  {
    type: "bulletList",
    items: [
      "Product Review — 9:00 AM • 11 July 2026",
      "Design Sync — 2:00 PM • 15 July 2026",
      "Launch Planning — 10:00 AM • 22 July 2026",
    ],
  },
  {
    type: "blockquote",
    text: `"Build tools that help people write faster without getting in their way."`,
  },
  {
    type: "paragraph",
    text: "Highlight any paragraph and ask AI to summarize, rewrite, or improve it instantly.",
  },
];

function blockToNode(
  block: DemoBlock,
  partialIndex?: number,
  partialItemChar?: number,
) {
  if (block.type === "heading") {
    const text =
      partialIndex !== undefined ? block.text.slice(0, partialIndex) : block.text;
    return {
      type: "heading",
      attrs: { level: block.level },
      content: text ? [{ type: "text", text }] : [],
    };
  }

  if (block.type === "paragraph") {
    const text =
      partialIndex !== undefined ? block.text.slice(0, partialIndex) : block.text;
    return {
      type: "paragraph",
      content: text ? [{ type: "text", text }] : [],
    };
  }

  if (block.type === "blockquote") {
    const text =
      partialIndex !== undefined ? block.text.slice(0, partialIndex) : block.text;
    return {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: text ? [{ type: "text", text }] : [],
        },
      ],
    };
  }

  if (block.type === "bulletList") {
    const itemsNodes = [];
    const maxItems =
      partialIndex !== undefined ? partialIndex + 1 : block.items.length;

    for (let i = 0; i < maxItems; i++) {
      let itemText = block.items[i];
      if (
        partialIndex !== undefined &&
        i === partialIndex &&
        partialItemChar !== undefined
      ) {
        itemText = itemText.slice(0, partialItemChar);
      }
      itemsNodes.push({
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: itemText ? [{ type: "text", text: itemText }] : [],
          },
        ],
      });
    }

    return {
      type: "bulletList",
      content: itemsNodes,
    };
  }

  return null;
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
        class: `prose dark:prose-invert prose-sm prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:py-0.5 prose-code:rounded focus:outline-none max-w-none`,
      },
    },
  });

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      }),
    [],
  );

  useEffect(() => {
    if (!editor) return;

    const ctrl = { active: true };
    animationRef.current = ctrl;

    setTitleText("");
    setDescText("");
    setIsAnimating(true);
    editor.commands.setContent({ type: "doc", content: [] }, false);

    const runAnimation = async () => {
      await sleep(350);
      if (!ctrl.active) return;

      // 1. Type Title
      const fullTitle = "Project Kickoff Notes";
      for (let i = 0; i <= fullTitle.length; i++) {
        if (!ctrl.active) return;
        setTitleText(fullTitle.slice(0, i));
        await sleep(28);
      }
      if (!ctrl.active) return;

      await sleep(180);

      // 2. Type Description
      const fullDesc = "Project Related stuff";
      for (let i = 0; i <= fullDesc.length; i++) {
        if (!ctrl.active) return;
        setDescText(fullDesc.slice(0, i));
        await sleep(20);
      }
      if (!ctrl.active) return;

      await sleep(250);

      // 3. Type Document Blocks cleanly via structural JSON updates
      const completedBlocks: DemoBlock[] = [];

      for (let blockIdx = 0; blockIdx < DEMO_BLOCKS.length; blockIdx++) {
        if (!ctrl.active) return;
        const currentBlock = DEMO_BLOCKS[blockIdx];

        if (currentBlock.type === "bulletList") {
          for (let itemIdx = 0; itemIdx < currentBlock.items.length; itemIdx++) {
            if (!ctrl.active) return;
            const itemText = currentBlock.items[itemIdx];

            for (let c = 1; c <= itemText.length; c++) {
              if (!ctrl.active) return;
              const partialNode = blockToNode(currentBlock, itemIdx, c);
              const nodes = [
                ...completedBlocks.map((b) => blockToNode(b)),
                partialNode,
              ].filter(Boolean);

              editor.commands.setContent(
                { type: "doc", content: nodes as any },
                false,
              );
              await sleep(12);
            }

            await sleep(80);
          }
        } else {
          const text = currentBlock.text;
          for (let c = 1; c <= text.length; c++) {
            if (!ctrl.active) return;
            const partialNode = blockToNode(currentBlock, c);
            const nodes = [
              ...completedBlocks.map((b) => blockToNode(b)),
              partialNode,
            ].filter(Boolean);

            editor.commands.setContent(
              { type: "doc", content: nodes as any },
              false,
            );
            await sleep(15);
          }

          const lastChar = text[text.length - 1];
          if (lastChar === "." || lastChar === '"') {
            await sleep(90);
          }
        }

        completedBlocks.push(currentBlock);
        await sleep(120);
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
      {/* Top Header: Title, Description, Replay & AI button */}
      <section className="px-3 pt-2 pb-1 w-full shrink-0">
        <div className="flex w-full justify-between items-center">
          <Input
            ref={titleInputRef}
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="!text-2xl font-bold px-0 border-none bg-transparent focus-visible:ring-0 w-full h-8"
            placeholder="Enter Title..."
            readOnly={isAnimating}
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReplay}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground h-7 px-2"
              title="Restart writing simulation"
            >
              {isAnimating ? (
                <DotmHex1
                  size={12}
                  dotSize={2.5}
                  colorPreset="solid-mint"
                  bloom
                  animated={true}
                />
              ) : (
                <ArrowCounterClockwiseIcon className="text-primary size-3.5" />
              )}
              Replay
            </Button>
            {onAIClick && (
              <Button size="sm" className="h-7 text-xs gap-1 px-2.5" onClick={onAIClick}>
                <RobotIcon size={16} /> AI
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
          className="text-muted-foreground px-0 focus-visible:ring-0 border-none w-full max-w-xl bg-transparent text-xs h-6 -mt-1"
          readOnly={isAnimating}
        />
      </section>

      {/* Full Tiptap Toolbar */}
      <DemoToolbar editor={editor} />

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

// Complete Tiptap Toolbar with all features from Tiptap.tsx
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
      isBulletList: ctx.editor.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor.isActive("orderedList") ?? false,
      isTaskList: ctx.editor.isActive("taskList") ?? false,
      isHighlight: ctx.editor.isActive("highlight") ?? false,
      isLink: ctx.editor.isActive("link") ?? false,
    }),
  });

  const headings = [
    { level: 1, label: "Heading 1", icon: <TextHOneIcon size={16} /> },
    { level: 2, label: "Heading 2", icon: <TextHTwoIcon size={16} /> },
    { level: 3, label: "Heading 3", icon: <TextHThreeIcon size={16} /> },
    { level: 4, label: "Heading 4", icon: <TextHFourIcon size={16} /> },
  ];

  const colors = [
    "#facc15",
    "#4ade80",
    "#60a5fa",
    "#c084fc",
    "#f87171",
  ];

  return (
    <div className="w-full flex flex-wrap items-center border-b px-2 py-1 gap-1 shrink-0 bg-background/50">
      {/* Undo / Redo */}
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
      >
        <ArrowUUpLeftIcon size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
      >
        <ArrowUUpRightIcon size={16} />
      </Button>

      <Separator orientation="vertical" className="h-4 mx-0.5" />

      {/* Headings dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-1.5 gap-0.5">
            <div className="flex items-center gap-0.5">
              {headings.find((h) =>
                editor.isActive("heading", { level: h.level }),
              )?.icon || <TextHIcon size={16} />}
              <CaretDownIcon size={12} />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {headings.map((h) => {
            const isActive = editor.isActive("heading", { level: h.level });
            return (
              <DropdownMenuItem
                key={h.level}
                onClick={() => {
                  if (isActive) {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: h.level as 1 | 2 | 3 | 4 })
                      .run();
                  }
                }}
                className={isActive ? "bg-accent" : ""}
              >
                {h.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Lists dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-1.5 gap-0.5">
            {editorState.isBulletList && <ListIcon size={16} />}
            {editorState.isOrderedList && <ListNumbersIcon size={16} />}
            {editorState.isTaskList && <ListChecksIcon size={16} />}
            {!editorState.isBulletList &&
              !editorState.isOrderedList &&
              !editorState.isTaskList && (
                <div className="flex items-center gap-0.5">
                  <ListIcon size={16} />
                  <CaretDownIcon size={12} />
                </div>
              )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListIcon size={16} className="mr-2" />
            Bulleted List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListNumbersIcon size={16} className="mr-2" />
            Ordered List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <ListChecksIcon size={16} className="mr-2" />
            Task List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Blockquote & Code Block */}
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Blockquote"
      >
        <TextIndentIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Code Block"
      >
        <CodeBlockIcon size={16} />
      </Toggle>

      <Separator orientation="vertical" className="h-4 mx-0.5" />

      {/* Inline styles */}
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <TextBIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <TextItalicIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strike"
      >
        <TextStrikethroughIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Code"
      >
        <CodeIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <TextUnderlineIcon size={16} />
      </Toggle>

      {/* Highlighter dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <HighlighterIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex items-center gap-1.5 p-2">
          {colors.map((color) => (
            <DropdownMenuItem
              key={color}
              className="w-4 h-4 p-0 rounded-full border cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => {
                editor.chain().focus().setHighlight({ color }).run();
              }}
            />
          ))}
          <Separator orientation="vertical" className="h-4" />
          <DropdownMenuItem
            className="p-0.5 cursor-pointer"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            title="Remove Highlight"
          >
            <ProhibitIcon size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Link */}
      {editorState.isLink ? (
        <Toggle
          size="sm"
          className="h-7 w-7 p-0"
          pressed
          onPressedChange={() => editor.chain().focus().unsetLink().run()}
        >
          <LinkBreakIcon size={16} />
        </Toggle>
      ) : (
        <LinkComponent editor={editor} />
      )}

      <Separator orientation="vertical" className="h-4 mx-0.5" />

      {/* Sub / Super */}
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isSuperscript}
        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
        aria-label="Superscript"
      >
        <TextSuperscriptIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isSubscript}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        aria-label="Subscript"
      >
        <TextSubscriptIcon size={16} />
      </Toggle>

      <Separator orientation="vertical" className="h-4 mx-0.5" />

      {/* Text alignment */}
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isAlignLeft}
        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
        aria-label="Align Left"
      >
        <TextAlignLeftIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isAlignCenter}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        aria-label="Align Center"
      >
        <TextAlignCenterIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isAlignRight}
        onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
        aria-label="Align Right"
      >
        <TextAlignRightIcon size={16} />
      </Toggle>
      <Toggle
        size="sm"
        className="h-7 w-7 p-0"
        pressed={editorState.isAlignJustify}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        aria-label="Align Justify"
      >
        <TextAlignJustifyIcon size={16} />
      </Toggle>
    </div>
  );
};

export default DemoTiptap;
