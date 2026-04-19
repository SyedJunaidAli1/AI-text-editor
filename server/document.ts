"use server";

import { createClient } from "@/lib/supabase/server";
import { createClientReadOnly } from "@/lib/supabase/server-read";

export async function saveDocument({
  id,
  content,
  title,
}: {
  id?: string;
  content: string;
  title?: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // 👉 UPDATE if id exists
  if (id) {
    const { error } = await supabase
      .from("documents")
      .update({
        user_id: user.id,
        content,
        title,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw new Error(error.message);

    return { id };
  }

  // 👉 CREATE new doc
  const { data, error } = await supabase
    .from("documents")
    .insert({
      user_id: user.id,
      content,
      title,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  return { id: data.id };
}

export async function getAllDocuments() {
  const supabase = await createClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getDocumentsById(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
