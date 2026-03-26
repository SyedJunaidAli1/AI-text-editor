"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
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
  ListOrdered,
  ListTodo,
  List,
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Superscript,
      Subscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
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
    immediatelyRender: false,
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
        isCode: ctx.editor.isActive("code") ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false, // ✅ Fixed typo
        isTaskList: ctx.editor.isActive("taskList") ?? false,
      };
    },
  });

  return (
    <section className="flex mb-1 items-center justify-start">
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2">
            {editorState.isHeading1 && (
              <div className="flex gap-0 p-0">
                <Heading1 />
                <ChevronDown />
              </div>
            )}
            {editorState.isHeading2 && (
              <div className="flex gap-0 p-0">
                <Heading2 />
                <ChevronDown />
              </div>
            )}
            {editorState.isHeading3 && (
              <div className="flex gap-0 p-0">
                <Heading3 />
                <ChevronDown />
              </div>
            )}
            {editorState.isHeading4 && (
              <div className="flex gap-0 p-0">
                <Heading4 />
                <ChevronDown />
              </div>
            )}
            {!editorState.isHeading1 &&
              !editorState.isHeading2 &&
              !editorState.isHeading3 &&
              !editorState.isHeading4 && (
                <div className="flex gap-0 p-0">
                  <Heading />
                  <ChevronDown />
                </div>
              )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editorState.isHeading1 ? "bg-accent" : ""}
          >
            Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editorState.isHeading2 ? "bg-accent" : ""}
          >
            Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={editorState.isHeading3 ? "bg-accent" : ""}
          >
            Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={editorState.isHeading4 ? "bg-accent" : ""}
          >
            Heading 4
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ Fixed: value now reflects orderedList correctly */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2 gap-0">
            {editorState.isBulletList && <List className="w-4 h-4" />}
            {editorState.isOrderedList && <ListOrdered className="w-4 h-4" />}
            {editorState.isTaskList && <ListTodo className="w-4 h-4" />}
            {!editorState.isBulletList &&
              !editorState.isOrderedList &&
              !editorState.isTaskList && (
                <div className="flex gap-0 p-0">
                  <List />
                  <ChevronDown />
                </div>
              )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="w-4 h-4 mr-2" />
            Bulleted List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="w-4 h-4 mr-2" />
            Ordered List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <ListTodo className="w-4 h-4 mr-2" />
            Task List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <SquareCodeIcon className="w-4 h-4" />
      </Toggle>

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
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
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
          onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
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
  );
};

export default Tiptap;
