"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SparkleIcon, ArrowUpIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

const DragAIComponent = () => {
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: React.ReactNode;
    }[]
  >([]);

  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) return;

    const userMessage = query;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setQuery("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: (
            <>
              <p>✨ Try the app to use AI on your documents.</p>
              <Link
                href="/app"
                className="mt-2 inline-flex text-xs text-primary hover:underline"
              >
                Open editor →
              </Link>
            </>
          ),
        },
      ]);
    }, 700);
  };

  return (
    <div className="bg-background h-full flex flex-col border-l transition-all duration-300 ease-in-out">
      {/* Header */}
      <section className="flex flex-col px-3 py-2.5 gap-1 border-b shrink-0">
        <div className="flex items-center gap-1.5">
          <SparkleIcon size={20} className="text-primary" />
          <p className="font-semibold text-sm">AI Assistant</p>
        </div>

        <p className="text-[11px] text-muted-foreground">
          Ask AI to write, summarize, or improve text
        </p>
      </section>

      {/* Chat messages */}
      <section className="flex flex-col gap-2 flex-1 px-3 py-2.5 overflow-y-auto">
        <p className="rounded-xl py-2 px-3 text-xs max-w-[85%] bg-primary text-primary-foreground ml-auto">
          hey can you check the document
        </p>

        <p className="rounded-xl py-2 px-3 text-xs max-w-[85%] bg-muted mr-auto">
          i checked the document there are few incoming meetings
        </p>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-xl py-2 px-3 text-xs max-w-[85%]
              ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted mr-auto"
              }`}
          >
            {message.content}
          </div>
        ))}
      </section>

      {/* Input section */}
      <div className="border-t p-2.5 shrink-0">
        <InputGroup className="rounded-xl border bg-background shadow-sm">
          <InputGroupTextarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask AI anything..."
            className="min-h-12 text-xs py-2"
          />

          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              className="ml-auto rounded-lg size-7 p-0"
              onClick={handleSubmit}
            >
              <ArrowUpIcon size={14} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <p className="text-[10px] text-muted-foreground mt-1 text-center">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default DragAIComponent;
