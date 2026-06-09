"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  documentsMutation,
  documentsQuery,
} from "@/lib/tanstack-queries/document";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/components/Loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { DotsThreeOutlineVerticalIcon } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JSONContent } from "@tiptap/react";
import { generateText } from "@tiptap/react";
import { toast } from "sonner";
import { editorExtensions } from "@/lib/tiptap-extensions";
import { aiMutation } from "@/lib/tanstack-queries/ai";

const HistoryComponent = () => {
  const { data: docs, isLoading } = useQuery(documentsQuery.all());
  const queryClient = useQueryClient();
  const { mutate: deleteDoc } = useMutation({
    ...documentsMutation().delete(),
    onSuccess: () => {
      toast.success("Document deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: clearHistory } = useMutation({
    ...aiMutation.clearHistory(),
    onSuccess: () => {
      toast.success("History cleared");

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const router = useRouter();

  const getWordCount = (content: JSONContent): number => {
    let text = "";

    const extractText = (node: JSONContent) => {
      if (node.type === "text") {
        text += node.text + " ";
      }

      if (node.content) {
        node.content.forEach(extractText);
      }
    };

    extractText(content);

    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleExport = (doc: any) => {
    const text = generateText(doc.content, editorExtensions);
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${doc.title || "untitled"}.txt`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="mt-6 px-4 w-full h-screen overflow-y-auto">
      <div className="mb-6">
        <h2>My Documents</h2>
        <p className="text-sm text-muted-foreground">
          Review and manage your documents history.
        </p>
      </div>
      {docs?.length === 0 && <p>No documents found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 content-start">
        {docs?.map((doc) => (
          <Card
            key={doc.id}
            className="hover:bg-muted/50 transition rounded-md h-64 flex flex-col"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(doc.updated_at), {
                    addSuffix: true,
                  })}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <DotsThreeOutlineVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Document</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleExport(doc)}>
                        Export as TXT
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => clearHistory(doc.id)}>
                        Clear AI Conversation
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deleteDoc(doc.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardTitle className="text-xl">
                {doc.title || "Untitled"}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground flex-1 overflow-hidden">
              <p className="line-clamp-4">
                {doc.description || "No description available"}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <span className="font-semibold">
                {getWordCount(doc.content)} words
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/app?docId=${doc.id}`);
                }}
              >
                Open Editor
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryComponent;
