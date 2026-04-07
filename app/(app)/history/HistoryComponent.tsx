"use client";

import { useQuery } from "@tanstack/react-query";
import { documentsQuery } from "@/lib/tanstack-queries/document";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
      {docs?.map((doc) => (
        <Card
          key={doc.id}
          onClick={() => router.push(`/app?docId=${doc.id}`)}
          className="cursor-pointer hover:bg-muted/50 transition w-2xs h-64"
        >
          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground">
              {new Date(doc.updated_at).toLocaleString()}
            </p>
            <CardTitle className="text-base truncate">
              {doc.title || "Untitled"}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            <p className="line-clamp-3">
              {doc.description || "No description available"}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between text-xs text-muted-foreground">
            <span>200 words</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/app?docId=${doc.id}`)}
            >
              Open Editor
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HistoryComponent;
