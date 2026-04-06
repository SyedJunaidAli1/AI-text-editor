import { Metadata } from "next";
import HistoryComponent from "@/app/(app)/history/HistoryComponent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { documentsQuery } from "@/lib/tanstack-queries/document";

export const metadata: Metadata = {
  title: "AI-Text Editor | History",
  description: "",
};

const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(documentsQuery.all());

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HistoryComponent />
      </HydrationBoundary>
    </>
  );
};

export default Page;
