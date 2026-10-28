"use client";

import DragAIComponent from "./DragAIComponent";
import DemoTiptap from "@/app/components/DemoTiptap";
import { useState } from "react";

const DragCenter = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="flex w-full h-full justify-between bg-background overflow-hidden">
      {/* Editor pane — real Tiptap editor */}
      <section className="flex-1 h-full overflow-hidden">
        <DemoTiptap onAIClick={() => setShow(!show)} />
      </section>

      {/* AI sidebar */}
      <div
        className={`h-full transition-all ease-in-out duration-300 shrink-0 overflow-hidden
        ${show ? "w-[340px]" : "w-0"}
      `}
      >
        <DragAIComponent />
      </div>
    </div>
  );
};

export default DragCenter;
