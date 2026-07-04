import { Input } from "@/components/ui/input";
import DragAIComponent from "./DragAIComponent";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RobotIcon } from "@phosphor-icons/react";

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
      </section>
      <div
        className={`transition-all duration-300
        ${show ? "w-[42%]" : "w-0"}
      `}
      >
        <DragAIComponent />
      </div>
    </div>
  );
};

export default DragCenter;
