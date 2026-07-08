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
import { Toggle } from "@/components/ui/toggle";

const DragCenter = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="flex w-full justify-between bg-background h-screen">
      <section className="px-2 py-2 w-full">
        <div className="flex w-full justify-end">
          <Input
            type="text"
            defaultValue={"Project Kickoff"}
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
          defaultValue={"Project Related stuff"}
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
        <h2 className="text-2xl font-bold mb-2">Project Kickoff Notes</h2>

        <p className="text-muted-foreground mb-6">
          Weekly planning meeting for the upcoming product release.
        </p>

        <p className="mb-4">
          This week we'll focus on improving the editor experience, polishing
          the AI assistant, and preparing the first public release.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Upcoming Tasks</h3>

        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Finish the landing page interactions.</li>
          <li>Improve AI response animations.</li>
          <li>Add document export functionality.</li>
          <li>Optimize mobile responsiveness.</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Meeting Schedule</h3>

        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Product Review — 9:00 AM • 11 July 2026</li>
          <li>Design Sync — 2:00 PM • 15 July 2026</li>
          <li>Launch Planning — 10:00 AM • 22 July 2026</li>
        </ul>

        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
          "Build tools that help people write faster without getting in their
          way."
        </blockquote>

        <p>
          Highlight any paragraph and ask AI to summarize, rewrite, or improve
          it instantly.
        </p>
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
