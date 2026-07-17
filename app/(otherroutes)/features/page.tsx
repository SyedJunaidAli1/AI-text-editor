import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Text Editor | Features",
  description: "Explore the features of AI Text Editor.",
};

const page = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-175 mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">Features</h1>
            <p className="mt-2 text-sm">
              Everything you need to write, organize and improve your documents
              with an AI assistant built directly into your editor.
            </p>
          </header>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-medium">1. Rich Text Editor</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Create and edit documents using a clean writing experience with
              headings, lists, bold, italic, underline and other formatting
              options powered by Tiptap.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-medium">2. AI Chat Assistant</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Ask questions, brainstorm ideas or request writing help without
              leaving your document. The AI assistant stays alongside your editor
              so your workflow remains uninterrupted.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-medium">3. Conversation History</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Every AI conversation is saved with its document, making it easy to
              revisit previous responses whenever you need them.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-medium">4. Secure Authentication</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Sign in securely using Google or email authentication with Supabase
              to keep your documents private and accessible across devices.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-medium">5. Document Management</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Create, rename, organize and delete documents from a simple sidebar
              designed to keep your workspace clean and easy to navigate.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-medium">6. Responsive Interface</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              The editor and AI workspace adapt to desktop, tablet and mobile
              screens, providing a consistent writing experience wherever you
              work.
            </p>
          </div>

          <div className="w-full h-px bg-neutral-50/15" />

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              Updated: July 2026
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