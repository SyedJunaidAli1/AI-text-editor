import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SparkleIcon, ArrowUpIcon } from "@phosphor-icons/react";

const DragAIComponent = ({ onclose }: { onclose: () => void }) => {
  return (
    <div
      className={`bg-background h-screen border-background border-l-2 transition-all duration-500 ease-in-out
        ${onclose ? "w-0" : "w-85"}`}
    >
      <section className="flex flex-col px-2 py-4 gap-2 border-b">
        <div className="flex items-center gap-2">
          <SparkleIcon size={32} className="text-primary" />
          <p>AI Assistant</p>
        </div>

        <p className="text-xs text-muted-foreground">
          Ask AI to write, summarize, or improve text
        </p>
      </section>

      {/*chat section*/}
      <section className="flex flex-col gap-2 h-110 px-2 overflow-y-scroll mt-3">
        <p className="rounded-xl py-2 px-3 text-sm max-w-[80%] bg-primary text-primary-foreground ml-auto">
          hey can you check the document
        </p>

        <p className="rounded-xl py-2 px-3 text-sm max-w-[80%] bg-muted text-primary-foreground mr-auto">
          i checked he document there are few incoming meetings
        </p>
      </section>

      {/*input section*/}
      <div className="border-t p-4">
        <InputGroup className="rounded-2xl border bg-background shadow-sm">
          <InputGroupTextarea placeholder="Ask AI anything..." />

          <InputGroupAddon align="block-end">
            <InputGroupButton variant="default" className="ml-auto rounded-xl">
              <ArrowUpIcon size={32} className="w-4 h-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <p className="text-xs text-muted-foreground">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default DragAIComponent;
