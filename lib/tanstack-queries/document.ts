import { getAllDocuments, getDocumentsById } from "@/server/document";

export const documentsQuery = {
  all: () => ({
    queryKey: ["documents"],
    queryFn: getAllDocuments,
  }),

  byId: (id: string) => ({
    queryKey: ["documents", id],
    queryFn: () => getDocumentsById(id),
  }),
};
