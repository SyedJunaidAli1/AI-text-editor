"use client";
import Image from "next/image";

const FeatureSection = () => {
  return (
    <>
      <section className="mt-18 leading-wide tracking-wide">
        <p className="text-muted-foreground">Built for personal use</p>
        <h2 className="text-3xl max-w-md mt-4">
          Text Editor + AI Chat in one place.
        </h2>
        <section className="mt-12 grid gap-2 lg:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-2xl border p-2 bg-card">
            <div className="relative h-100 rounded-xl bg-[url('/card.jpg')] bg-cover bg-center overflow-hidden">
              <div className="absolute top-16 -right-8 w-[92%]">
                <Image
                  src="/ui1.png"
                  alt="Editor preview"
                  width={900}
                  height={900}
                  loading="lazy"
                  className="rounded-xl shadow-2xl ring-1 ring-black/10"
                />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold leading-wide tracking-wide">
                Rich text editing with AI
              </h3>

              <p className="mt-2 text-muted-foreground">
                A distraction-free writing experience with formatting, history,
                Markdown export and an AI assistant always one click away.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border bg-card p-2">
            <div className="relative h-100 rounded-xl bg-[url('/card2.jpg')] bg-cover bg-center overflow-hidden">
              <div className="absolute top-16 -left-8 w-[92%]">
                <Image
                  src="/ui2.png"
                  alt="AI preview"
                  width={900}
                  height={900}
                  loading="lazy"
                  className="rounded-xl shadow-2xl ring-1 ring-black/10"
                />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold leading-wide tracking-wide">
                AI assistance while you write
              </h3>

              <p className="mt-2 text-muted-foreground">
                Summarize notes, rewrite paragraphs, brainstorm ideas and
                improve your writing without leaving the document.
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default FeatureSection;
