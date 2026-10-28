"use client";

import TerminalAIComponent from "./TerminalAIComponent";
import DemoTiptap from "@/app/components/DemoTiptap";
import { useState } from "react";

const TerminalCenter = () => {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="relative flex w-full h-full bg-background overflow-hidden">
      {/* Editor pane — real Tiptap editor */}
      <section className="flex-1 h-full overflow-hidden">
        <DemoTiptap onAIClick={() => setAiOpen(true)} />
      </section>

      {/* AI panel — fullscreen overlay on mobile */}
      <TerminalAIComponent isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
};

export default TerminalCenter;
