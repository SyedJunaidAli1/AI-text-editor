"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from '@tiptap/starter-kit';


const Tiptap = () => {
  const editor = useEditor({
    // onUpdate({ editor }) {
    //   const json = editor.getJSON();
    //   console.log("Document JSON:", json);
    // },
    extensions: [StarterKit,Document, Paragraph, Text],
    content: "<p>Hello World! 🌎️</p>",
    autofocus: true,
    editable: true,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    injectCSS: false,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
