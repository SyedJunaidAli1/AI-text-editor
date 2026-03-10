"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  Code,
  ItalicIcon,
  Redo2Icon,
  StrikethroughIcon,
  SuperscriptIcon,
  SubscriptIcon,
  Underline,
  Undo2Icon,
  AlignLeftIcon,
  AlignJustifyIcon,
  AlignRightIcon,
  AlignCenterIcon,
  TextQuoteIcon,
  SquareCodeIcon,
  Heading1Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tiptap = () => {
  const editor = useEditor({
    // onUpdate({ editor }) {
    //   const json = editor.getJSON();
    //   console.log("Document JSON:", json);
    // },
    extensions: [
      StarterKit,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<h1>abc</h1><p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert border-2 prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-none`,
      },
    },
    // autofocus: true,
    // editable: true,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    // injectCSS: false,
  });

  return (
    <>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};

const Toolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isUndoable: ctx.editor.isActive("undo") ?? false,
        isRedoable: ctx.editor.isActive("redo") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isAlignLeft: ctx.editor.isActive("alignLeft") ?? false,
        isAlignCenter: ctx.editor.isActive("alignCenter") ?? false,
        isAlignRight: ctx.editor.isActive("alignRight") ?? false,
        isAlignJustify: ctx.editor.isActive("alignJustify") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
      };
    },
  });

  const handleToggleHeading = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
      return;
    } else {
      const level = Number.parseInt(value.replace("heading", "")) as
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <>
      <section className="flex gap-2 h-8 mb-2 items-center justify-start">
        <div>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            variant="ghost"
          >
            <Undo2Icon />
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            variant="ghost"
          >
            <Redo2Icon />
          </Button>
        </div>

        <Separator orientation="vertical" />

        <div className="flex">
          <Select
            onValueChange={handleToggleHeading}
            value={
              editorState.isHeading1
                ? "heading1"
                : editorState.isHeading2
                  ? "heading2"
                  : editorState.isHeading3
                    ? "heading3"
                    : editorState.isHeading4
                      ? "heading4"
                      : editorState.isHeading5
                        ? "heading5"
                        : editorState.isHeading6
                          ? "heading6"
                          : "paragraph"
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Paragraph" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heading1">H1</SelectItem>
              <SelectItem value="heading2">H2</SelectItem>
              <SelectItem value="heading3">H3</SelectItem>
              <SelectItem value="heading4">H4</SelectItem>
              <SelectItem value="heading5">H5</SelectItem>
              <SelectItem value="heading6">H6</SelectItem>
              <Separator />
              <SelectItem value="paragraph">P</SelectItem>
            </SelectContent>
          </Select>

          <Toggle
            pressed={editorState.isBlockquote}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            aria-label="Blockquote"
          >
            <TextQuoteIcon className="w-4 h-4" />
          </Toggle>

          <Toggle
            pressed={editorState.isCodeBlock}
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
            aria-label="Code Block"
          >
            <SquareCodeIcon className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" />

        <div>
          <Toggle
            pressed={editorState.isBold}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
          >
            <BoldIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isItalic}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
          >
            <ItalicIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isStrike}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Strike"
          >
            <StrikethroughIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isCode}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            aria-label="Code"
          >
            <Code className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isUnderline}
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            aria-label="Underline"
          >
            <Underline className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" />

        <div>
          <Toggle
            pressed={editorState.isSuperscript}
            onPressedChange={() =>
              editor.chain().focus().toggleSuperscript().run()
            }
            aria-label="Superscript"
          >
            <SuperscriptIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isSubscript}
            onPressedChange={() =>
              editor.chain().focus().toggleSubscript().run()
            }
            aria-label="Subscript"
          >
            <SubscriptIcon className="w-4 h-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" />

        <div>
          <Toggle
            pressed={editorState.isAlignLeft}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
            aria-label="Align Left"
          >
            <AlignLeftIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isAlignCenter}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
            aria-label="Align Center"
          >
            <AlignCenterIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isAlignRight}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
            aria-label="Align Right"
          >
            <AlignRightIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            pressed={editorState.isAlignJustify}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("justify").run()
            }
            aria-label="Align Justify"
          >
            <AlignJustifyIcon className="w-4 h-4" />
          </Toggle>
        </div>
      </section>
    </>
  );
};

export default Tiptap;
