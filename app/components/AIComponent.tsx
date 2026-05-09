"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { aiMutation } from "@/lib/tanstack-queries/ai";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpIcon, Sparkles } from "lucide-react";

const AIComponent = () => {
  const { mutateAsync: askMutation, isPending } = useMutation(aiMutation.ask());

  return (
    <div className="flex flex-col h-screen border-l bg-background">
      {/* HEADER */}
      <div className="border-b px-4 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Ask AI to write, summarize, or improve text</p>

          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Example AI message */}
        <div className="rounded-xl bg-muted py-2 px-3 text-sm max-w-[80%]">
          Hello 👋 Ask me anything about your document.
        </div>

        {/* Example user message */}
        <div className="ml-auto rounded-xl bg-primary text-primary-foreground py-2 px-3 text-sm max-w-[80%]">
          Summarize this document
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t p-4 border-blue-600">
        <InputGroup className="rounded-2xl border bg-background shadow-sm">
          <InputGroupTextarea placeholder="Ask AI anything..." />

          <InputGroupAddon align="block-end">
            <InputGroupButton variant="default" className="ml-auto rounded-xl">
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
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

export default AIComponent;
