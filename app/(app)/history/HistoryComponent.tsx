"use client";

import { useQuery } from "@tanstack/react-query";
import { documentsQuery } from "@/lib/tanstack-queries/document";
import { useRouter } from "next/navigation";

const HistoryComponent = () => {
  const { data: docs, isLoading } = useQuery(documentsQuery.all());
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="px-2 py-6 space-y-2">
      {docs?.map((doc) => (
        <div
          key={doc.id}
          onClick={() => router.push(`/app?docId=${doc.id}`)}
          className="px-4 py-8 rounded-lg border cursor-pointer hover:bg-muted transition"
        >
          <p className="font-medium">{doc.title || "Untitled"}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(doc.updated_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HistoryComponent;
