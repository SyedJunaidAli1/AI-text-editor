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
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Underline,
  Undo2Icon,
  AlignLeft,
  AlignJustifyIcon,
  AlignRightIcon,
  AlignCenterIcon,
  TextQuoteIcon,
  SquareCodeIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isAlignLeft: ctx.editor.isActive("alignLeft") ?? false,
        isAlignCenter: ctx.editor.isActive("alignCenter") ?? false,
        isAlignRight: ctx.editor.isActive("alignRight") ?? false,
        isAlignJustify: ctx.editor.isActive("alignJustify") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
      };
    },
  });
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
        
        <div>
          <Toggle
            pressed={editorState.isBlockquote}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Blockquote"
          >
           <TextQuoteIcon className="w-4 h-4" />
          </Toggle>
          
          <Toggle
            pressed={editorState.isCodeBlock}
            onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
            aria-label="Code Block"
          >
           <SquareCodeIcon  className="w-4 h-4" />
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
            <AlignLeft className="w-4 h-4" />
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
