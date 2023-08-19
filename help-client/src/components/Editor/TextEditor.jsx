import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from "@tiptap/extension-image";
import CharacterCount from '@tiptap/extension-character-count'
import BubbleMenu from './BubbleMenu';
import FloatingMenu from './FloatingMenu';

// eslint-disable-next-line react/prop-types
const TextEditor = ({ editorContent, campaign }) => {
  const characterLimit = 5000;
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'editor-header',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc text-[12.5px] my-1.5 ml-5',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal text-[12.5px] my-1 ml-5',
          }
        },
        paragraph: {
          HTMLAttributes: {
            class: 'text-[13px]',
          }
        }
      }),
      Placeholder.configure({
        placeholder: 'Campaign story...',
      }),
      Image.configure({
        inline: true ,
        HTMLAttributes: {
          class: 'w-[98%] h-[20rem] mx-auto object-cover',
        },
      }),
     
      CharacterCount.configure({ limit: characterLimit })
    ],
    editorProps: {
      attributes: {
        class: "min-h-[200px] text-[14px] leading-8 border-none outline-none bg-zinc-50 px-2 py-1 disabled:cursor-not-allowed"
      }
    },
    onCreate: ({ editor }) => {
      // Check if campaign exist
      if (!campaign) return;
      // console.log(campaign);

      // Load campaign body content into editor
      editor.commands.setContent(campaign);
      // editor?.setEditable(false)
  },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      editorContent(html);

      // // Update word count onUpdate
      // setCharacterCount(editor.storage.characterCount.characters());
      // setWordCount(editor.storage.characterCount.words());
    },

  })
  // useEffect(() => {
  //     editor?.commands.setContent(body);
  //     // setCharacterCount(editor?.storage.characterCount.characters());
  //     // setWordCount(editor?.storage.characterCount.words());
  // }, [editor?.commands]);

  return (
    <div className="">
      {editor && (
        <div className="">
          <EditorContent editor={editor} />
        </div>
      )}
      <BubbleMenu editor={editor} />
      <FloatingMenu editor={editor} />
    </div>
  ) 
}

export default TextEditor