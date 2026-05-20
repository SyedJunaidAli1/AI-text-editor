"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import { aiMutation, aiQuery } from "@/lib/tanstack-queries/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowUpIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { Editor } from "@tiptap/react";

const AIComponent = ({
  documentId,
  editor,
}: {
  documentId: string;
  editor: Editor | null;
}) => {
  const { mutateAsync: askMutation, isPending } = useMutation(aiMutation.ask());
  const { data: history, isLoading: isLoadingHistory } = useQuery(
    aiQuery.history(documentId),
  );
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  const historyMassages =
    history?.flatMap((item) => [
      {
        role: "user" as const,
        content: item.query,
      },
      {
        role: "assistant" as const,
        content: item.response,
      },
    ]) || [];

  const allMessages = [...historyMassages, ...messages];

  const handleAsk = async () => {
    if (!editor) return;
    if (!query.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: query,
      },
    ]);

    try {
      const response = await askMutation({
        documentId,
        query,
        editorContent: editor.getText(),
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);
    } catch (error) {
      console.error(error);
    }

    setQuery("");
  };

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
        {/* AI message */}
        {allMessages.length === 0 && <p>No messages yet.</p>}
        {isLoadingHistory && <p>Loading history...</p>}
        {allMessages.map((message, index) => (
          <div
            key={index}
            className={`rounded-xl py-2 px-3 text-sm max-w-[80%] ${
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="border-t p-4">
        <InputGroup className="rounded-2xl border bg-background shadow-sm">
          <InputGroupTextarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI anything..."
          />

          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              className="ml-auto rounded-xl"
              onClick={handleAsk}
              disabled={isPending}
            >
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <ArrowUpIcon className="w-4 h-4" />
                </>
              )}
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
