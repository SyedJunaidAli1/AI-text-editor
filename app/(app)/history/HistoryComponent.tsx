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
    <div className="px-2 py-6 w-full h-screen">
      <h1 className="text-2xl font-bold">My Documents</h1>
      <p className="text-sm text-muted-foreground">
        Review and manage your documents history.
      </p>
      <div className="flex gap-2 mt-8 ">
        {docs?.map((doc) => (
          <div
            key={doc.id}
            onClick={() => router.push(`/app?docId=${doc.id}`)}
            className="px-4 py-6 h-56 w-2xs rounded-lg bg-sidebar border cursor-pointer hover:bg-muted transition"
          >
            <div>
              <p className="text-xs text-muted-foreground mb-3">
                {new Date(doc.updated_at).toLocaleString()}
              </p>
            </div>
            <p className="font-semibold mb-2">{doc.title || "Untitled"}</p>
            <p className="text-sm text-muted-foreground max-w-full w-full">
              {doc.description}
            </p>
            <p className="text-sm text-muted-foreground">
              Created at :-
              {new Date(doc.created_at).toLocaleString()}
            </p>

            <div>
              <p className="text-xs text-muted-foreground">
                {/*{doc.content.split(" ").length} words*/} 200 words
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryComponent;
