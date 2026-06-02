"use client";
import { GithubLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";

const AboutComponent = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-175 mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">
              About AI Text Editor
            </h1>
            <p className="mt-2 text-sm">
              An open-source AI-powered writing workspace for creating, editing,
              organizing, and improving documents.
            </p>
          </header>

          <div>
            <h2 className="text-lg font-medium">What this app does</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              AI Text Editor combines a modern document editor with an
              integrated AI assistant. Create documents, organize your ideas,
              and use AI to summarize, explain, rewrite, or improve your writing
              without leaving the editor. Every document includes its own AI
              conversation history, allowing you to continue your work and
              collaborate with AI in context.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">Design & Principles</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              The editor is designed around simplicity, speed, and focus.
              Documents should be easy to create, easy to find, and easy to
              improve. The goal is to remove distractions while giving users
              powerful AI-assisted writing tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">Open Source & Roadmap</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              The entire project is open source and actively maintained.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div>
              <h2 className="text-lg font-medium">Contact</h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed">
                For support, collaboration, or questions, email{" "}
                <Link
                  href="mailto:syedjunaidali790@gmail.com"
                  className="text-primary hover:underline"
                >
                  syedjunaidali790@gmail.com
                </Link>
                . You can also reach the maintainer on GitHub:
              </p>
            </div>

            <p className="pt-3 pr-2">
              <Link
                href="https://github.com/SyedJunaidAli1/AI-text-editor"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-medium"
              >
                <GithubLogoIcon size={32} />
              </Link>
            </p>
          </div>

          <div className="w-full h-px bg-neutral-50/15" />

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              v0.70
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

export default AboutComponent;
