import React, { useRef, useState } from 'react'
import { FloatingMenu as Floater, Editor } from '@tiptap/react';
import { TbPhoto, TbH1, TbH2, TbH3 } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import useAuthStore from '../../Store/Auth/authStore';
import { ID, Permission, Role, storage } from '../../backend/appwrite';

const style = {
    inactive: "text-neutral-700",
    active: "text-black"
}
    
const imagesFormat = ["png", "jpg", "jpeg"]; // Acceptable image extension


const FloatingMenu = ({ editor }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // Trigger the file input when the button is clicked
        fileInputRef.current.click();
    };

    const { authUser } = useAuthStore((state) => state)

    const maxSizeInBytes = 7 * 1024 * 1024;

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        // console.log(selectedFile['type'].split('/')[1].toLowerCase());
        // Validate input file
        if (!authUser) {
            toast.error("Unauthorized to upload");
            return;
        }

        if (!selectedFile) {
            toast.error("Image file cannot be found");
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Invalid file type");
            return;
        }

        if (!imagesFormat.includes(selectedFile['type'].split('/')[1])) {
            toast.error("Invalid file extension");
            return;
        }

        if (selectedFile.size > maxSizeInBytes) {
            toast.error("File size exceeds the allowed limit.");
            return;
        }

        // Handle error gracefully
        try {
            toast.loading("Uploading image");

            // Save file in Appwrite Bucket | Storage
            const res = await storage.createFile(
                import.meta.env.VITE_CAMPAIGNS_BUCKET_ID,
                ID.unique(),
                selectedFile,
                [
                    Permission.read(Role.user(authUser.$id)),
                    Permission.update(Role.user(authUser.$id)),
                    Permission.delete(Role.user(authUser.$id)),
                ]
            );

            // Upload success
            toast.dismiss();
            toast.success("Image added");

            // Get image URL back from Bucket
            const url = storage.getFilePreview(import.meta.env.VITE_CAMPAIGNS_BUCKET_ID, res.$id);

           // Add to Text Editor
            if (url) {
                editor?.chain().focus().setImage({ src: url.href }).run();
            }

            // Clear image upload
            e.target.value = "";
        } catch (error) {
            console.log(error);
            toast.error("Upload Failed!");
        }
    };
    
    return (
        <div>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />

            {editor && <Floater className="flex items-center px-2 rounded-md bg-gray-200"  editor={editor} tippyOptions={{ duration: 100 }}>
                <FloatButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? style.active : style.inactive}
                >
                    <TbH1 className='text-[1rem]'/>
                </FloatButton>
                
                <FloatButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? style.active : style.inactive}
                >
                    <TbH2 className='text-[1rem]' />
                </FloatButton>

                <FloatButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? style.active : style.inactive}
                >
                    <TbH3 className='text-[1rem]' />
                </FloatButton>

                <Sep />

                <button
                    onClick={() => {
                        editor.unregisterPlugin("FloatingMenu");
                        handleButtonClick()
                    }}
                >
                    <TbPhoto size={20} />
                </button>
            </Floater>}
        </div>
    )
}

export default FloatingMenu


// Bubble Button
const FloatButton = ({ onClick, className, children }) => {
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