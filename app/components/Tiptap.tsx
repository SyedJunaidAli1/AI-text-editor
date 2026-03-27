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
import Highlight from "@tiptap/extension-highlight";
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
  Highlighter,
  Ban,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: `
    <h1>AI Text Editor Demo 🚀</h1>

    <p>This is a <strong>bold</strong>, <em>italic</em>, <s>strikethrough</s>, and <u>underline</u> text example.</p>

    <h2>Code & Inline Code</h2>
    <p>You can write inline code like <code>const x = 10;</code> inside text.</p>

    <pre><code>function greet() {
      console.log("Hello from code block!");
    }</code></pre>

    <h2>Blockquote</h2>
    <blockquote>
      <p>This is a blockquote. It should have a left border and styled text.</p>
    </blockquote>

    <h2>Lists</h2>

    <p>Bullet List:</p>
    <ul>
      <li>First bullet item</li>
      <li>Second bullet item</li>
      <li>Third bullet item</li>
    </ul>

    <p>Ordered List:</p>
    <ol>
      <li>Step one</li>
      <li>Step two</li>
      <li>Step three</li>
    </ol>

    <p>Task List:</p>
    <ul data-type="taskList">
      <li data-type="taskItem">
        <label><input type="checkbox" /></label>
        <div><p>Write some content</p></div>
      </li>
      <li data-type="taskItem">
        <label><input type="checkbox" checked /></label>
        <div><p>Build editor toolbar</p></div>
      </li>
      <li data-type="taskItem">
        <label><input type="checkbox" /></label>
        <div><p>Add AI features later 🤖</p></div>
      </li>
    </ul>

    <h2>Alignment</h2>
    <p style="text-align: left;">This text is left aligned.</p>
    <p style="text-align: center;">This text is center aligned.</p>
    <p style="text-align: right;">This text is right aligned.</p>

    <h2>Superscript & Subscript</h2>
    <p>Water formula: H<sub>2</sub>O</p>
    <p>Math example: x<sup>2</sup> + y<sup>2</sup></p>

    <h3>Final Note</h3>
    <p>Try editing everything above 👆 — your editor should handle all of it.</p>
    `,
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert border-2 prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-none [&_ul[data-type="taskList"]]:list-none [&_ul[data-type="taskList"]]:pl-0 [&_li[data-type="taskItem"]]:flex [&_li[data-type="taskItem"]]:items-center [&_li[data-type="taskItem"]]:gap-2 [&_li[data-type="taskItem"]>label]:m-0 [&_li[data-type="taskItem"]>div]:flex-1`,
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
        isHighlight: ctx.editor.isActive("highlight") ?? false,
      };
    },
  });

  const headings = [
    { level: 1, label: "Heading 1", icon: <Heading1 /> },
    { level: 2, label: "Heading 2", icon: <Heading2 /> },
    { level: 3, label: "Heading 3", icon: <Heading3 /> },
    { level: 4, label: "Heading 4", icon: <Heading4 /> },
  ];

  const colors = [
    "#facc15", // yellow
    "#4ade80", // green
    "#60a5fa", // blue
    "#c084fc", // purple
    "#f87171", // red
  ];

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
            <div className="flex items-center gap-1">
              {headings.find((h) =>
                editor.isActive("heading", { level: h.level }),
              )?.icon || <Heading />}
              <ChevronDown />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {headings.map((h) => {
            const isActive = editor.isActive("heading", { level: h.level });

            return (
              <DropdownMenuItem
                key={h.level}
                onClick={() => {
                  if (isActive) {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: h.level })
                      .run();
                  }
                }}
                className={isActive ? "bg-accent" : ""}
              >
                {h.label}
              </DropdownMenuItem>
            );
          })}
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Highlighter className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex items-center gap-2 px-2 py-2">
          {colors.map((color) => (
            <DropdownMenuItem
              key={color}
              className="w-5 h-5 p-0 rounded-full border"
              style={{ backgroundColor: color }}
              onClick={() => {
                editor.chain().focus().setHighlight({ color }).run();
              }}
            />
          ))}
          <Separator orientation="vertical" />
          <DropdownMenuItem
            className="p-0 w-0"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
          >
            <Ban />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
