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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Editor } from "@tiptap/react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpIcon, SparkleIcon } from "@phosphor-icons/react";

const AIComponent = ({
  documentId,
  editor,
}: {
  documentId: string;
  editor: Editor | null;
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: askMutation, isPending } = useMutation({
    ...aiMutation.ask(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ai-history", documentId],
      });
    },
  });

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
          <SparkleIcon size={32} className="text-primary" />
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

        {isLoadingHistory && (
          <div className="space-y-3">
            <div className="rounded-xl bg-muted/50 p-3 max-w-[80%]">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="rounded-xl bg-primary/80 px-2 py-4 max-w-[80%] ml-auto">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%] mt-2" />
            </div>
          </div>
        )}
        {allMessages.length === 0 && !isLoadingHistory && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <SparkleIcon
              size={32}
              className="w-10 h-10 text-muted-foreground mb-4"
            />

            <h3 className="font-semibold text-lg mb-1">Start a conversation</h3>

            <p className="text-sm text-muted-foreground max-w-xs">
              Ask AI to summarize, rewrite, explain, or improve your document.
            </p>
          </div>
        )}
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
                  <ArrowUpIcon size={32} className="w-4 h-4" />
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
