'use client'

import { useState } from 'react'

export default function ImageUploader({
    name,
    defaultValue,
    label,
    accept = "image/*"
}: {
    name: string
    defaultValue?: string
    label?: string
    accept?: string
}) {
    const [imageUrl, setImageUrl] = useState(defaultValue || '')
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setError('')

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (data.success) {
                setImageUrl(data.url)
            } else {
                setError(data.error || 'アップロードに失敗しました')
            }
        } catch (err) {
            setError('通信エラーが発生しました')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {label && <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>{label}</label>}
            <input type="hidden" name={name} value={imageUrl} />

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {imageUrl ? (
                    <div style={{ width: '150px', height: '100px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {imageUrl.toLowerCase().endsWith('.pdf') ? (
                            <span style={{ fontSize: '2rem' }}>📄</span>
                        ) : (
                            <img src={imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                ) : (
                    <div style={{ width: '150px', height: '100px', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                        画像なし
                    </div>
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleUpload}
                        disabled={isUploading}
                        style={{ fontSize: '0.9rem' }}
                    />
                    {isUploading && <span style={{ fontSize: '0.85rem', color: '#3b82f6' }}>アップロード中...</span>}
                    {error && <span style={{ fontSize: '0.85rem', color: '#ef4444' }}>{error}</span>}
                    {imageUrl && (
                        <button
                            type="button"
                            onClick={() => setImageUrl('')}
                            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', cursor: 'pointer', width: 'max-content' }}
                        >
                            画像を削除
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
