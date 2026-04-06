import { getAllDocuments } from "@/server/document";

export const documentsQuery = {
  all: () => ({
    queryKey: ["documents"],
    queryFn: getAllDocuments,
  }),
};
