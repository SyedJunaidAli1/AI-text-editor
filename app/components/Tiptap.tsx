"use client";

import { EditorContent, useEditorState, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useEffect, useRef, useState } from "react";
import { saveDocument } from "@/server/document";
import LinkComponent from "@/app/components/LinkComponent";
import { useQuery } from "@tanstack/react-query";
import { documentsQuery } from "@/lib/tanstack-queries/document";
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  CaretDownIcon,
  CodeBlockIcon,
  CodeIcon,
  HighlighterIcon,
  LinkBreakIcon,
  ListChecksIcon,
  ListIcon,
  ListNumbersIcon,
  ProhibitIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextHFourIcon,
  TextHIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextSubscriptIcon,
  TextSuperscriptIcon,
  TextUnderlineIcon,
  TextIndentIcon,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

const Tiptap = ({
  docId,
  editor,
}: {
  docId?: string;
  editor: Editor | null;
}) => {
  const [currentDocId, setCurrentDocId] = useState(docId || null);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isInitialLoad = useRef(true);

  const { data: doc } = useQuery({
    ...documentsQuery.byId(docId!),
    enabled: !!docId, // 🔥 only run if exists
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const save = useCallback(async () => {
    if (!editor || isInitialLoad.current) return;

    setSaving(true);

    const json = editor.getJSON();
    const cleanJson = JSON.parse(JSON.stringify(json));

    const res = await saveDocument({
      id: currentDocId,
      content: cleanJson,
      title,
      description,
    });

    if (!currentDocId) {
      setCurrentDocId(res.id);
      window.history.replaceState(null, "", `/app?docId=${res.id}`);
    }

    setSaving(false);
  }, [editor, currentDocId, title, description]);

  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      if (isInitialLoad.current) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(save, 800);
    };

    editor.on("update", handler);

    return () => {
      editor.off("update", handler);
    };
  }, [editor, save]);

  useEffect(() => {
    if (isInitialLoad.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(save, 800);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [title, description, save]);

  useEffect(() => {
    if (!editor) return;

    // ✅ NEW DOCUMENT CASE
    if (!docId) {
      isInitialLoad.current = true;

      setCurrentDocId(null);

      editor.commands.setContent("", false);

      setTitle("");
      setDescription("");

      setTimeout(() => {
        isInitialLoad.current = false;
      }, 0);

      return;
    }

    // ✅ WAIT until doc is fetched
    if (!doc) return;

    // ✅ EXISTING DOCUMENT CASE
    isInitialLoad.current = true;

    editor.commands.setContent(doc.content, false);

    setTitle(doc.title || "");
    setDescription(doc.description || "");

    setTimeout(() => {
      isInitialLoad.current = false;
    }, 0);
  }, [editor, doc, docId]);

  return (
    <>
      {editor && (
        <Toolbar
          editor={editor}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
        />
      )}
      <EditorContent editor={editor} />
    </>
  );
};

const Toolbar = ({
  editor,
  title,
  description,
  setTitle,
  setDescription,
}: {
  editor: Editor;
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}) => {
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
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isTaskList: ctx.editor.isActive("taskList") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
      };
    },
  });

  const headings = [
    { level: 1, label: "Heading 1", icon: <TextHOneIcon size={32} /> },
    { level: 2, label: "Heading 2", icon: <TextHTwoIcon size={32} /> },
    { level: 3, label: "Heading 3", icon: <TextHThreeIcon size={32} /> },
    { level: 4, label: "Heading 4", icon: <TextHFourIcon size={32} /> },
  ];

  const colors = [
    "#facc15", // yellow
    "#4ade80", // green
    "#60a5fa", // blue
    "#c084fc", // purple
    "#f87171", // red
  ];

  return (
    <section className="flex flex-col w-full mb-1">
      <div className="w-full">
        <Input
          type="text"
          placeholder="Enter Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="!text-3xl font-bold px-0 border-none bg-transparent focus-visible:ring-0"
        />

        <Input
          type="text"
          placeholder="Enter Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-muted-foreground px-0 focus-visible:ring-0 border-none w-full max-w-xl bg-transparent"
        />
      </div>

      <div className="w-full flex flex-wrap items-center border-b gap-2">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          variant="ghost"
        >
          <ArrowUUpLeftIcon size={32} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          variant="ghost"
        >
          <ArrowUUpRightIcon size={32} />
        </Button>

        <Separator orientation="vertical" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <div className="flex items-center gap-1">
                {headings.find((h) =>
                  editor.isActive("heading", { level: h.level }),
                )?.icon || <TextHIcon size={32} />}
                <CaretDownIcon size={32} />
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
              {editorState.isBulletList && <ListIcon size={32} />}
              {editorState.isOrderedList && <ListNumbersIcon size={32} />}
              {editorState.isTaskList && <ListChecksIcon size={32} />}
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
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          aria-label="Blockquote"
        >
          <TextIndentIcon size={32} className="w-4 h-4" />
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
              <ProhibitIcon size={32} />
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
          onPressedChange={() =>
            editor.chain().focus().toggleSuperscript().run()
          }
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
      </div>
    </section>
  );
};

export default Tiptap;
