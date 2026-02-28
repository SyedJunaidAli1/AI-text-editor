"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  Code,
  ItalicIcon,
  Redo2Icon,
  StrikethroughIcon,
  Underline,
  Undo2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Tiptap = () => {
  const editor = useEditor({
    // onUpdate({ editor }) {
    //   const json = editor.getJSON();
    //   console.log("Document JSON:", json);
    // },
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
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
      };
    },
  });
  return (
    <>
      <section className="flex gap-2 h-8 items-center justify-start">
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
      </section>
    </>
  );
};

export default Tiptap;
