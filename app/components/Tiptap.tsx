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
  Redo2Icon,
  Undo2Icon,
  TextQuoteIcon,
  ListOrdered,
  ListTodo,
  List,
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Ban,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { saveDocument } from "@/server/document";
import LinkComponent from "@/app/components/LinkComponent";
import { useQuery } from "@tanstack/react-query";
import { documentsQuery } from "@/lib/tanstack-queries/document";
import {
  CaretDownIcon,
  CodeBlockIcon,
  CodeIcon,
  HighlighterIcon,
  LinkBreakIcon,
  ListChecksIcon,
  ListIcon,
  ListNumbersIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextSubscriptIcon,
  TextSuperscriptIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";

const Tiptap = ({ docId }: { docId?: string }) => {
  const [currentDocId, setCurrentDocId] = useState(docId || null);
  const [saving, setSaving] = useState(false);

  const { data: doc } = useQuery({
    ...documentsQuery.byId(docId!),
    enabled: !!docId, // 🔥 only run if exists
  });

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
        class: `prose dark:prose-invert border-2 prose-blockquote:border-l-3 prose-blockquote:border-primary [&_blockquote_p:first-of-type]:before:content-none [&_blockquote_p:last-of-type]:after:content-none prose-code:px-1.5 prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-secondary prose-code:font-normal prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none focus:outline-none max-w-no`,
      },
    },
    immediatelyRender: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(async () => {
        setSaving(true);

        const json = editor.getJSON();

        const res = await saveDocument({
          id: currentDocId,
          content: json,
          title: "Untitled",
        });

        if (!currentDocId) {
          setCurrentDocId(res.id);
          window.history.replaceState(null, "", `/app?docId=${res.id}`);
        }

        setSaving(false);
      }, 800);
    };

    editor.on("update", handler);

    return () => {
      editor.off("update", handler); // ✅ cleanup
    };
  }, [editor, currentDocId]);

  useEffect(() => {
    if (!editor || !doc) return;

    editor.commands.setContent(doc.content);
  }, [editor, doc]);

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
        isLink: ctx.editor.isActive("link") ?? false,
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
                  <ListIcon size={32} />
                  <CaretDownIcon size={32} />
                </div>
              )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListIcon size={32} />
            Bulleted List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListNumbersIcon size={32} />
            Ordered List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <ListChecksIcon size={32} />
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
        <CodeBlockIcon size={32} />
      </Toggle>

      <Separator orientation="vertical" />

      <Toggle
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <TextBIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <TextItalicIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strike"
      >
        <TextStrikethroughIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Code"
      >
        <CodeIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <TextUnderlineIcon size={32} />
      </Toggle>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <HighlighterIcon size={32} />
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
            className="p-0"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
          >
            <Ban />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() => editor.chain().focus().unsetLink().run()}
        >
          <LinkBreakIcon size={32} />
        </Toggle>
      ) : (
        <LinkComponent editor={editor} />
      )}

      <Separator orientation="vertical" />

      <Toggle
        pressed={editorState.isSuperscript}
        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
        aria-label="Superscript"
      >
        <TextSuperscriptIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isSubscript}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        aria-label="Subscript"
      >
        <TextSubscriptIcon size={32} />
      </Toggle>

      <Separator orientation="vertical" />

      <Toggle
        pressed={editorState.isAlignLeft}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        aria-label="Align Left"
      >
        <TextAlignLeftIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isAlignCenter}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        aria-label="Align Center"
      >
        <TextAlignCenterIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isAlignRight}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        aria-label="Align Right"
      >
        <TextAlignRightIcon size={32} />
      </Toggle>
      <Toggle
        pressed={editorState.isAlignJustify}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        aria-label="Align Justify"
      >
        <TextAlignJustifyIcon size={32} />
      </Toggle>
    </section>
  );
};

export default Tiptap;
