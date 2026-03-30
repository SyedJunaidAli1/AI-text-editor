"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveDocument({
  id,
  content,
  title,
}: {
  id?: string;
  content: any;
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
