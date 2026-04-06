"use client";

import { useQuery } from "@tanstack/react-query";
import { documentsQuery } from "@/lib/tanstack-queries/document";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/components/Loader";

const HistoryComponent = () => {
  const { data: docs, isLoading } = useQuery(documentsQuery.all());
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex gap-2 px-2 py-6 w-200 h-48 overflow-y-auto">
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
