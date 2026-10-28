"use client";

import DragAIComponent from "./DragAIComponent";
import DemoTiptap from "@/app/components/DemoTiptap";
import { useState } from "react";

const DragCenter = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="flex w-full justify-between bg-background h-screen">
      {/* Editor pane — now uses a real Tiptap editor */}
      <section className="w-full overflow-hidden">
        <DemoTiptap onAIClick={() => setShow(!show)} />
      </section>

      {/* AI sidebar */}
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
