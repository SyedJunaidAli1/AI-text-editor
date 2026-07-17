import Link from "next/link";
import { SparkleIcon } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/40 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <SparkleIcon size={18} weight="fill" className="text-primary" />
            </div>
            <span className="font-semibold text-lg">AI Text Editor</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm">
            The intelligent document editor that helps you write, refine, and
            publish faster with AI assistance built right in.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-4 text-sm">Product</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <Link href="/features" className="hover:text-foreground transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4 text-sm">Legal</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} AI Text Editor. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="https://x.com/Junaid383206" className="hover:text-foreground transition-colors">
            Twitter
          </Link>
          <Link href="https://github.com/SyedJunaidAli1/AI-text-editor" className="hover:text-foreground transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
