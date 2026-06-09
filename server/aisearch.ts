"use server";

import Groq from "groq-sdk";
import { createClientReadOnly } from "@/lib/supabase/server-read";
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
        - Maximum response length: 100 words unless user asks for more.
        `,
      },
      {
        role: "user",
        content: `Here is the document:${editorContent} User request: ${query} Respond briefly and helpfully.`,
      },
    ],
  });

  const response = completion.choices[0]?.message?.content || "";

  await supabase.from("ai_searches").insert({
    document_id: documentId,
    query,
    response,
  });

  return response;
}

export async function getAISearchHistory(documentId: string) {
  const supabase = await createClientReadOnly();

  const { data, error } = await supabase
    .from("ai_searches")
    .select("*")
    .eq("document_id", documentId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function clearAIHistory(documentId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("unauthorized");

  const { error } = await supabase
    .from("ai_seaches")
    .delete()
    .eq("document_id", documentId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  return true;
}
