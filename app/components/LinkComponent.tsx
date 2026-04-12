"use client";

import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { Link as LinkIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  editor: Editor;
};

const LinkComponent = ({ editor }: Props) => {
  const [url, setUrl] = useState("");

  const isLink = editor.isActive("link");

  // 👉 auto-fill existing link
  useEffect(() => {
    if (isLink) {
      const current = editor.getAttributes("link").href;
      setUrl(current || "");
    } else {
      setUrl("");
    }
  }, [isLink, editor]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle pressed={isLink}>
          <LinkIcon className="w-4 h-4" />
        </Toggle>
      </PopoverTrigger>

      <PopoverContent className="w-64 space-y-2">
        <Input
          placeholder="Paste a link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-between">
          <Button
            size="sm"
            onClick={() => {
              if (!url) return;

              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }}
          >
            Apply
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              editor.chain().focus().unsetLink().run();
            }}
          >
            Remove
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LinkComponent;
