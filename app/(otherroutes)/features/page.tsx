import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Text Editor | Features",
  description: "Features of AI Text Editor",
};
const page = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-175 mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">Features</h1>
            <p className="mt-2 text-sm">
              Discover the powerful tools that make writing, editing, and refining your content a breeze.
            </p>
          </header>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-medium">1. Intelligent Auto-Complete</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Experience seamless writing with our context-aware AI auto-complete. It anticipates your next words, helping you draft documents faster and with greater fluency.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-medium">2. AI-Powered Summarization</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Instantly condense long articles or documents into concise, easy-to-read summaries. Perfect for quickly grasping the main points of extensive research or lengthy reports.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-medium">3. Tone and Style Adjustment</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Easily adapt your writing to suit any audience. Whether you need a professional, casual, persuasive, or objective tone, our AI can rewrite your text to match your desired style.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-medium">4. Real-time Grammar and Spell Check</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Beyond simple spell checking, our advanced AI analyzes the context of your sentences to suggest structural improvements, vocabulary enhancements, and correct complex grammatical errors.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-medium">5. Interactive AI Chat Assistant</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Brainstorm ideas, ask questions, or request specific content generation through an intuitive chat interface that lives right alongside your document.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-medium">6. Seamless Export and Sharing</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Export your polished documents to various formats (PDF, Word, Markdown) or share them directly via secure, collaborative links.
            </p>
          </div>

          <div className="w-full h-px bg-neutral-50/15" />

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              Updated: June 2026
            </p>
            <div className="text-sm text-muted-foreground">
              <span>Write smarter • Think clearer</span>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default page;
