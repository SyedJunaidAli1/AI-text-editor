import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
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
];
