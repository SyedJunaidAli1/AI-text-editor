"use server";

import Groq from "groq-sdk";
import { JSONContent } from "@tiptap/react";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAi({
  documentId,
  query,
  editorcontent,
}: {
  documentId: string;
  query: string;
  editorcontent: JSONContent;
}) {
  const supabase = await createClient();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a helpful AI assistant",
      },
      {
        role: "user",
        content: `Document: ${editorcontent} User Request: ${query}`,
      },
    ],
  });

  const response = completion.choices[0]?.message?.content || "";

  await supabase.from("ai_search").insert({
    document_id: documentId,
    query,
    response,
  });

  return response;
}
