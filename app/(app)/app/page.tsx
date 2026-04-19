"use client";
import Tiptap from "@/app/components/Tiptap";
import { use } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ docId?: string }>;
}) {
  const { docId } = use(searchParams);

  return (
    <div className="flex min-h-screen w-full px-2">
      {/* EDITOR */}
      <main className="flex-1">
        <h1 className="mt-6">
          AI Text Editor welcome to app
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">This is your Editor.</p>
        {/* 👇 pass docId */}
        <Tiptap docId={docId} />
      </main>

      {/* AI PANEL */}
      <div className="w-[30%] border border-red-600 h-screen px-2">
        <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
      </div>
    </div>
  );
}
