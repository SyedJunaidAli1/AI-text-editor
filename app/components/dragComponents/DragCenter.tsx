import { Input } from "@/components/ui/input";
import DragAIComponent from "./DragAIComponent";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

const DragCenter = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="flex w-full justify-between bg-background h-screen">
      <section className="px-2 py-2 w-full">
        <div className="flex w-full justify-end">
          <Input
            type="text"
            className="!text-3xl font-bold px-0 border-none bg-transparent focus-visible:ring-0"
            placeholder="Enter Title..."
          />
          <Button onClick={() => setShow(!show)}>
            <RobotIcon size={24} /> AI
          </Button>
        </div>

        <Input
          type="text"
          placeholder="Enter Description..."
          className="text-muted-foreground px-0 focus-visible:ring-0 border-none w-full max-w-xl bg-transparent"
        />
        <div className="w-full flex flex-wrap items-center border-b gap-1">
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
