import { askAi } from "@/server/aisearch";
import { JSONContent } from "@tiptap/react";

export const aiMutation = {
  ask: () => ({
    mutationFn: ({
      documentId,
      query,
      editorcontent,
    }: {
      documentId: string;
      query: string;
      editorcontent: JSONContent;
    }) => askAi({ documentId, query, editorcontent }),
  }),
};
