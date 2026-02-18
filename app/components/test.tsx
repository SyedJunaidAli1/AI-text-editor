import { createClient } from "@/lib/supabase/server";

export default async function Test() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return <div>Hello {user?.email}

  <p>{user?.is_anonymous}</p>
  </div>;
}
