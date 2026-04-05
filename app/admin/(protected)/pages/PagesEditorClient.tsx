'use client'
import React, { useState } from 'react'
import styles from '../top/TopEditor.module.css'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUploader from '@/components/admin/ImageUploader'
import GreetingPageView from '@/components/public/GreetingPageView'
import OrganizationPageView from '@/components/public/OrganizationPageView'

export default function PagesEditorClient({ initialData, action }: any) {
    const [data, setData] = useState(initialData)

    return (
        <div className={styles.splitContainer}>
            <div className={styles.editorPane}>
                <h1 className={styles.pageTitle}>各ページ編集</h1>
                <p style={{ fontSize: '0.9rem', color: '#86868b', marginBottom: '2rem' }}>左で入力した情報が、右側にリアルタイムで表示されます。</p>

                <form action={action}>
                    {/* Greeting Section */}
                    <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>会長挨拶ページ</h2>
                        <RichTextEditor
                            name="greetingTitle"
                            value={data.greetingTitle}
                            onChange={v => setData({ ...data, greetingTitle: v })}
                            label="タイトル"
                        />
                        <div style={{ marginBottom: '2rem', background: '#f5f5f7', padding: '1.5rem', borderRadius: '16px' }}>
                            <ImageUploader name="greetingPhoto" label="会長の写真" defaultValue={data.greetingPhoto} />
                        </div>
                        <RichTextEditor
                            name="greetingBody"
                            value={data.greetingBody}
                            onChange={v => setData({ ...data, greetingBody: v })}
                            label="挨拶 本文"
                        />
                        <RichTextEditor
                            name="greetingSignature"
                            value={data.greetingSignature}
                            onChange={v => setData({ ...data, greetingSignature: v })}
                            label="署名"
                        />
                    </div>

                    {/* Organization Section */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>組織図ページ</h2>
                        <RichTextEditor
                            name="orgBody"
                            value={data.orgBody}
                            onChange={v => setData({ ...data, orgBody: v })}
                            label="説明文"
                        />
                        <div style={{ marginBottom: '2rem', background: '#f5f5f7', padding: '1.5rem', borderRadius: '16px' }}>
                            <ImageUploader name="orgImage" label="組織図の画像" defaultValue={data.orgImage} />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        全て更新する
                    </button>
                </form>
            </div>

            <div className={styles.previewPane}>
                <div className={styles.previewHeader}>
                    <span style={{ width: 10, height: 10, background: '#ff3b30', borderRadius: '50%', display: 'inline-block' }}></span>
                    リアルタイムプレビュー
                </div>
                <div className={styles.previewContent}>
                    <div className={styles.previewContentInner} style={{ padding: '2rem 0', background: '#f5f5f7' }}>
                        <div style={{ background: '#fff', marginBottom: '2rem', padding: '1rem 0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ textAlign: 'center', color: '#86868b', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>プレビュー: 会長挨拶</h3>
                            <GreetingPageView
                                title={data.greetingTitle}
                                body={data.greetingBody}
                                signatureText={data.greetingSignature}
                                photoUrl={data.greetingPhoto}
                            />
                        </div>

                        <div style={{ background: '#fff', padding: '1rem 0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ textAlign: 'center', color: '#86868b', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>プレビュー: 組織図</h3>
                            <OrganizationPageView
                                body={data.orgBody}
                                imageUrl={data.orgImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
