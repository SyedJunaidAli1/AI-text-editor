import { createClient } from "@/lib/supabase/client";

export default async function Home() {
  const supabase = createClient();

  // const { data, error } = await supabase.from("Todos").select("*");

  // if (error) {
  //   console.log(error);
  // }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-2 sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to AI Text Editor</h1>
        {/*<p>{JSON.stringify(data, null, 2)}</p>*/}
      </main>
    </div>
  );
}
