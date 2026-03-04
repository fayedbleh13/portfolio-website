'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

interface TipTapEditorProps {
    value: string
    onChange: (richText: string) => void
}

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: 'Your message parameters...',
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[120px] prose-p:my-1 text-sm font-inter text-white/90',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="group w-full relative flex flex-col bg-white/5 border border-white/10 rounded-lg focus-within:border-violet/50 focus-within:bg-white/10 transition-all hover:bg-white/10">
            {editor && (
                <div className="hidden group-focus-within:flex border-b border-white/10 overflow-x-auto">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`px-3 py-2 text-xs font-mono transition-colors hover:bg-white/10 ${editor.isActive('bold') ? 'text-cyan-glow bg-white/5' : 'text-white/70'
                            }`}
                    >
                        B
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`px-3 py-2 text-xs font-mono italic transition-colors border-l border-white/10 hover:bg-white/10 ${editor.isActive('italic') ? 'text-cyan-glow bg-white/5' : 'text-white/70'
                            }`}
                    >
                        I
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        className={`px-3 py-2 text-xs font-mono underline transition-colors border-l border-white/10 hover:bg-white/10 ${editor.isActive('underline') ? 'text-cyan-glow bg-white/5' : 'text-white/70'
                            }`}
                    >
                        U
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        disabled={!editor.can().chain().focus().toggleBulletList().run()}
                        className={`px-3 py-2 text-xs font-mono transition-colors border-l border-white/10 hover:bg-white/10 ${editor.isActive('bulletList') ? 'text-cyan-glow bg-white/5' : 'text-white/70'
                            }`}
                    >
                        • List
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={!editor.can().chain().focus().toggleCode().run()}
                        className={`px-3 py-2 text-xs font-mono transition-colors border-l border-white/10 hover:bg-white/10 ${editor.isActive('code') ? 'text-cyan-glow bg-white/5' : 'text-white/70'
                            }`}
                    >
                        {'</>'}
                    </button>
                </div>
            )}

            <div className="w-full px-4 py-3 text-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
