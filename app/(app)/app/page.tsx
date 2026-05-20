import AppComponent from "@/app/(app)/app/AppComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Text Editor | Editor",
  description: "In this Page you can edit your doc and use AI Features",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ docId?: string }>;
}) => {
  const { docId } = await searchParams;

  return (
    <>
      <AppComponent docId={docId} />
    </>
  );
};

export default Page;
