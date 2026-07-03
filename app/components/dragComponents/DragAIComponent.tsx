import { SparkleIcon } from "@phosphor-icons/react";

const DragAIComponent = ({ onclose }: { onclose: () => void }) => {
  return (
    <div className="bg-background w-85 h-screen border-background border-l-2">
      <section className="flex flex-col px-2 py-4 gap-2 border-b">
        <div className="flex items-center gap-2">
          <SparkleIcon size={32} className="text-primary" />
          <p>AI Assistant</p>
        </div>

        <p className="text-xs text-muted-foreground">
          Ask AI to write, summarize, or improve text
        </p>
      </section>
    </div>
  );
};

export default DragAIComponent;
