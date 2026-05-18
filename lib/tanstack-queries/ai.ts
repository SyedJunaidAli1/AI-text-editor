import { askAi } from "@/server/aisearch";

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
};
