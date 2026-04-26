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
    <div className="mt-6 px-4 w-full h-screen overflow-y-auto">
      <div className="mb-6">
        <h2>My Documents</h2>
        <p className="text-sm text-muted-foreground">
          Review and manage your documents history.
        </p>
      </div>
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
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
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
              <span>200 words</span>
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
