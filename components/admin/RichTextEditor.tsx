'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import styles from './RichTextEditor.module.css'

// Disable SSR for react-quill since it uses window/document
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className={styles.loading}>エディタを読み込み中...</div>
})

interface RichTextEditorProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    hint?: string;
}

export default function RichTextEditor({ name, value, onChange, label, hint }: RichTextEditorProps) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['link'],
            ['clean']
        ],
    }

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            {hint && <p className={styles.hint}>{hint}</p>}

            <div className={styles.editorWrapper}>
                <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />
            </div>

            <input type="hidden" name={name} value={value} />
        </div>
    )
}
