"use client";
import Tiptap from "@/app/components/Tiptap";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ docId?: string }>;
}) {
  const { docId } = use(searchParams);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex min-h-screen w-full px-4 py-4">
      {/* EDITOR */}
      <main className="flex-1">
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold outline-none w-full max-w-xl bg-transparent"
        />

        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-sm text-muted-foreground outline-none w-full bg-transparent"
        />
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
