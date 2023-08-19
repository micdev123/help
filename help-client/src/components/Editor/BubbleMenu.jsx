/* eslint-disable react/prop-types */
import React from 'react'
import { BubbleMenu as Bubble, Editor } from '@tiptap/react';
import { TbBold, TbItalic, TbStrikethrough, TbH1, TbH2, TbH3, TbList, TbListNumbers } from "react-icons/tb";
// import { BsParagraph } from 'react-icons/bs'

const BubbleMenu = ({ editor }) => {
    const style = {
        inactive: "text-neutral-700",
        active: "text-black"
    }
    return (
        <div>
            {editor && <Bubble className="flex items-center px-2 rounded-md bg-gray-300" tippyOptions={{ duration: 100 }} editor={editor}>

                <BubbleButton
                    // eslint-disable-next-line react/prop-types
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? style.active : style.inactive}
                >
                    <TbH1  className='text-[1rem]' />
                </BubbleButton>

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? style.active : style.inactive}
                >
                    <TbH2 className='text-[1rem]' />
                </BubbleButton>

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? style.active : style.inactive}
                >
                    <TbH3  className='text-[1rem]' />
                </BubbleButton>

                <Sep />

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? style.active : style.inactive}
                >
                    <TbBold  className='text-[1rem]' />
                </BubbleButton>

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? style.active : style.inactive}
                >
                    <TbItalic  className='text-[1rem]' />
                </BubbleButton>

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? style.active : style.inactive}
                >
                    <TbStrikethrough  className='text-[1rem]' />
                </BubbleButton>

                <Sep />

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? style.active : style.inactive}
                >
                    <TbList  className='text-[1rem]' />
                </BubbleButton>

                <BubbleButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? style.active : style.inactive}
                >
                    <TbListNumbers  className='text-[1rem]' />
                </BubbleButton>
                

            </Bubble>}
        </div>
    )
}

export default BubbleMenu

// Bubble Button
const BubbleButton = ({ onClick, className, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-8 h-10 flex justify-center items-center rounded-lg text-2xl mr-1 last:mr-0 transition-all ${className}`}
        >
            {children}
        </button>
    )
}

// Separator 
const Sep = () => {
    return (
        <div className="w-[1px] h-4 mx-3 bg-neutral-600">
            &nbsp;
        </div>
    )
}