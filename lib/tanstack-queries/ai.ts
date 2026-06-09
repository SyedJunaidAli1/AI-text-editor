import { askAi, clearAIHistory, getAISearchHistory } from "@/server/aisearch";

export const aiMutation = {
  ask: () => ({
    mutationFn: ({
      documentId,
      query,
      editorContent,
    }: {
      documentId: string;
      query: string;
      editorContent: string;
    }) => askAi({ documentId, query, editorContent }),
  }),
  clearHistory: () => ({
    mutationFn: (documentId: string) =>
      clearAIHistory(documentId),
  }),
};

export const aiQuery = {
  history: (documentId: string) => ({
    queryKey: ["ai-history", documentId],
    queryFn: () => getAISearchHistory(documentId),
    enabled: !!documentId,
  }),
};
