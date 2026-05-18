"use server";

import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAi({
  documentId,
  query,
  editorContent,
}: {
  documentId: string;
  query: string;
  editorContent: string;
}) {
  const supabase = await createClient();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
        You are an AI assistant inside a text editor app.

        Your job is to help users improve, explain, summarize, rewrite, or analyze their documents.

        Rules:
        - Keep responses concise and conversational.
        - Do NOT generate huge articles unless explicitly asked.
        - Prefer short paragraphs or bullet points.
        - Answer directly.
        - Focus only on the user's request.
        - If user asks to explain a document, summarize it briefly.
        - Maximum response length: 150 words unless user asks for more.
        `,
      },
      {
        role: "user",
        content: `Document: ${editorContent} User Request: ${query}`,
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
