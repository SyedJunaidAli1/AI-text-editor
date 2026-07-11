"use client";

import { Input } from "@/components/ui/input";
import DragAIComponent from "./DragAIComponent";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { animate, motion } from "motion/react";
import {
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
import { Toggle } from "@/components/ui/toggle";

const DOCUMENT_BLOCKS = [
  { id: "h2-1", type: "h2", text: "Project Kickoff Notes", className: "text-2xl font-bold mb-2" },
  { id: "p-1", type: "p", text: "Weekly planning meeting for the upcoming product release.", className: "text-muted-foreground mb-6" },
  { id: "p-2", type: "p", text: "This week we'll focus on improving the editor experience, polishing the AI assistant, and preparing the first public release.", className: "mb-4" },
  { id: "h3-1", type: "h3", text: "Upcoming Tasks", className: "text-lg font-semibold mt-6 mb-2" },
  { id: "li-1", type: "li", text: "Finish the landing page interactions.", className: "" },
  { id: "li-2", type: "li", text: "Improve AI response animations.", className: "" },
  { id: "li-3", type: "li", text: "Add document export functionality.", className: "" },
  { id: "li-4", type: "li", text: "Optimize mobile responsiveness.", className: "" },
  { id: "h3-2", type: "h3", text: "Meeting Schedule", className: "text-lg font-semibold mb-2" },
  { id: "li-5", type: "li", text: "Product Review — 9:00 AM • 11 July 2026", className: "" },
  { id: "li-6", type: "li", text: "Design Sync — 2:00 PM • 15 July 2026", className: "" },
  { id: "li-7", type: "li", text: "Launch Planning — 10:00 AM • 22 July 2026", className: "" },
  { id: "blockquote-1", type: "blockquote", text: `"Build tools that help people write faster without getting in their way."`, className: "border-l-4 border-primary pl-4 italic text-muted-foreground my-6" },
  { id: "p-3", type: "p", text: "Highlight any paragraph and ask AI to summarize, rewrite, or improve it instantly.", className: "" }
];

const DragCenter = () => {
  const [show, setShow] = useState(true);
  
  // Motion-driven animation states
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);
  const [typedText, setTypedText] = useState("");
  const [currentCursorTarget, setCurrentCursorTarget] = useState<"title" | "description" | "block" | "done">("title");
  const [replayTrigger, setReplayTrigger] = useState(0);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect using Motion animate
  useEffect(() => {
    let active = true;
    let controls: { stop: () => void } | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // Reset states
    setTitleText("");
    setDescText("");
    setCurrentBlockIndex(-1);
    setTypedText("");
    setCurrentCursorTarget("title");

    const runAnimation = async () => {
      // Small delay at start
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 300);
      });
      if (!active) return;

      // 1. Type Title using motion's animate
      const fullTitle = "Project Kickoff";
      controls = animate(0, fullTitle.length, {
        duration: fullTitle.length * 0.035, // 35ms per char
        ease: "linear",
        onUpdate: (latest) => {
          if (active) setTitleText(fullTitle.slice(0, Math.round(latest)));
        }
      });
      await controls;
      if (!active) return;

      // Small pause before description
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 200);
      });
      if (!active) return;
      setCurrentCursorTarget("description");

      // 2. Type Description
      const fullDesc = "Project Related stuff";
      controls = animate(0, fullDesc.length, {
        duration: fullDesc.length * 0.025, // 25ms per char
        ease: "linear",
        onUpdate: (latest) => {
          if (active) setDescText(fullDesc.slice(0, Math.round(latest)));
        }
      });
      await controls;
      if (!active) return;

      // Pause before document blocks
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 300);
      });
      if (!active) return;
      setCurrentCursorTarget("block");

      // 3. Type Blocks one by one
      for (let i = 0; i < DOCUMENT_BLOCKS.length; i++) {
        const block = DOCUMENT_BLOCKS[i];
        if (!active) return;
        setCurrentBlockIndex(i);
        setTypedText("");

        // Delay between paragraphs
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, 200);
        });
        if (!active) return;

        controls = animate(0, block.text.length, {
          duration: block.text.length * 0.015, // 15ms per char (faster typing)
          ease: "linear",
          onUpdate: (latest) => {
            if (active) setTypedText(block.text.slice(0, Math.round(latest)));
          }
        });
        await controls;
        if (!active) return;

        // Punctuation delay simulation
        const lastChar = block.text[block.text.length - 1];
        if (lastChar === "." || lastChar === `"`) {
          await new Promise((resolve) => {
            timeoutId = setTimeout(resolve, 150);
          });
        }
      }

      if (active) {
        setCurrentCursorTarget("done");
      }
    };

    runAnimation();

    return () => {
      active = false;
      if (controls) controls.stop();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [replayTrigger]);

  // Sync cursor/focus for inputs
  useEffect(() => {
    if (currentCursorTarget === "title" && titleInputRef.current) {
      titleInputRef.current.focus();
      const len = titleText.length;
      titleInputRef.current.setSelectionRange(len, len);
    } else if (currentCursorTarget === "description" && descInputRef.current) {
      descInputRef.current.focus();
      const len = descText.length;
      descInputRef.current.setSelectionRange(len, len);
    } else if (currentCursorTarget === "block" && document.activeElement instanceof HTMLElement) {
      if (document.activeElement === titleInputRef.current || document.activeElement === descInputRef.current) {
        document.activeElement.blur();
      }
    }
  }, [currentCursorTarget, titleText, descText]);

  const handleReset = () => {
    setReplayTrigger((prev) => prev + 1);
  };

  const renderBlocks = () => {
    const rendered: React.ReactNode[] = [];
    let currentListItems: React.ReactNode[] = [];
    let listKey = "";

    const flushList = () => {
      if (currentListItems.length > 0) {
        rendered.push(
          <motion.ul 
            key={`ul-${listKey}`} 
            className="list-disc pl-5 space-y-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {currentListItems}
          </motion.ul>
        );
        currentListItems = [];
      }
    };

    const blocksToRender = currentBlockIndex >= 0 
      ? DOCUMENT_BLOCKS.slice(0, currentBlockIndex + 1)
      : [];

    blocksToRender.forEach((block, index) => {
      const isCurrent = index === currentBlockIndex;
      const text = isCurrent ? typedText : block.text;
      
      const showCursor = isCurrent && currentCursorTarget === "block";
      const cursorSpan = showCursor ? (
        <span className="inline-block w-[2px] h-[1.1em] ml-0.5 bg-primary typing-cursor align-middle" />
      ) : null;

      if (block.type === "li") {
        if (currentListItems.length === 0) {
          listKey = block.id;
        }
        currentListItems.push(
          <motion.li 
            key={block.id} 
            className={block.className}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {text}
            {cursorSpan}
          </motion.li>
        );
      } else {
        flushList();

        if (block.type === "h2") {
          rendered.push(
            <motion.h2 
              key={block.id} 
              className={block.className}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {text}
              {cursorSpan}
            </motion.h2>
          );
        } else if (block.type === "h3") {
          rendered.push(
            <motion.h3 
              key={block.id} 
              className={block.className}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {text}
              {cursorSpan}
            </motion.h3>
          );
        } else if (block.type === "p") {
          rendered.push(
            <motion.p 
              key={block.id} 
              className={block.className}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {text}
              {cursorSpan}
            </motion.p>
          );
        } else if (block.type === "blockquote") {
          rendered.push(
            <motion.blockquote 
              key={block.id} 
              className={block.className}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {text}
              {cursorSpan}
            </motion.blockquote>
          );
        }
      }
    });

    flushList();
    return rendered;
  };

  return (
    <div className="flex w-full justify-between bg-background h-screen">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          animation: blink 0.8s infinite;
        }
      `}</style>
      <section className="px-2 py-2 w-full">
        <div className="flex w-full justify-between items-center mb-2">
          <Input
            ref={titleInputRef}
            type="text"
            value={titleText}
            onChange={(e) => {
              setTitleText(e.target.value);
              if (currentCursorTarget === "title") {
                setCurrentCursorTarget("description");
              }
            }}
            className="!text-3xl font-bold px-0 border-none bg-transparent focus-visible:ring-0 w-full"
            placeholder="Enter Title..."
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              title="Restart writing simulation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
                className={currentCursorTarget !== "done" ? "animate-spin" : ""}
              >
                <path d="M224,128a96,96,0,0,1-144,83.13l-4-2.3a8,8,0,1,1,8-13.85l4,2.3A80,80,0,1,0,108.6,67.63l-18,18H120a8,8,0,0,1,0,16H72a8,8,0,0,1-8-8V40a8,8,0,0,1,16,0V68.69l19.53-19.52A96,96,0,0,1,224,128Z"></path>
              </svg>
              Replay
            </Button>
            <Button onClick={() => setShow(!show)}>
              <RobotIcon size={24} /> AI
            </Button>
          </div>
        </div>

        <Input
          ref={descInputRef}
          type="text"
          placeholder="Enter Description..."
          value={descText}
          onChange={(e) => {
            setDescText(e.target.value);
            if (currentCursorTarget === "description") {
              setCurrentCursorTarget("block");
              setCurrentBlockIndex(0);
              setTypedText("");
            }
          }}
          className="text-muted-foreground px-0 focus-visible:ring-0 border-none w-full max-w-xl bg-transparent"
        />
        
        <div className="w-full flex flex-wrap items-center border-b gap-1 mb-4">
          <Button variant="ghost" className="px-2">
            <ArrowUUpLeftIcon size={24} />
          </Button>
          <Button variant="ghost" className="px-2">
            <ArrowUUpRightIcon size={24} />
          </Button>

          <Toggle aria-label="Blockquote">
            <TextIndentIcon size={24} />
          </Toggle>
          <Toggle aria-label="Code Block">
            <CodeBlockIcon size={24} />
          </Toggle>

          <Toggle aria-label="Bold">
            <TextBIcon size={24} />
          </Toggle>
          <Toggle aria-label="Italic">
            <TextItalicIcon size={24} />
          </Toggle>
          <Toggle aria-label="Strike">
            <TextStrikethroughIcon size={24} />
          </Toggle>
          <Toggle aria-label="Code">
            <CodeIcon size={24} />
          </Toggle>
          <Toggle aria-label="Underline">
            <TextUnderlineIcon size={24} />
          </Toggle>

          <Toggle aria-label="Superscript">
            <TextSuperscriptIcon size={24} />
          </Toggle>
          <Toggle aria-label="Subscript">
            <TextSubscriptIcon size={24} />
          </Toggle>

          <Toggle aria-label="Align Left">
            <TextAlignLeftIcon size={24} />
          </Toggle>
          <Toggle aria-label="Align Center">
            <TextAlignCenterIcon size={24} />
          </Toggle>
          <Toggle aria-label="Align Right">
            <TextAlignRightIcon size={24} />
          </Toggle>
          <Toggle aria-label="Align Justify">
            <TextAlignJustifyIcon size={24} />
          </Toggle>
        </div>

        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {renderBlocks()}
        </div>
      </section>
      <div
        className={`transition-all ease-in-out duration-300
        ${show ? "w-[42%]" : "w-0"}
      `}
      >
        <DragAIComponent />
      </div>
    </div>
  );
};

export default DragCenter;
