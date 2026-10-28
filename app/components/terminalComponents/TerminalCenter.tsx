"use client";

import TerminalAIComponent from "./TerminalAIComponent";
import DemoTiptap from "@/app/components/DemoTiptap";
import { useState } from "react";

const TerminalCenter = () => {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div
      className="relative flex w-full bg-background overflow-hidden"
      style={{ height: "calc(100% - 0px)" }}
    >
      {/* Editor pane — real Tiptap editor */}
      <section className="w-full overflow-hidden">
        <DemoTiptap onAIClick={() => setAiOpen(true)} />
      </section>

      {/* AI panel — fullscreen overlay on mobile */}
      <TerminalAIComponent isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
};

export default TerminalCenter;
