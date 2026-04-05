'use client'
import React, { useState } from 'react'
import styles from './TopEditor.module.css'
import RichTextEditor from '@/components/admin/RichTextEditor'
import TopPageView from '@/components/public/TopPageView'
import ImageUploader from '@/components/admin/ImageUploader'

export default function TopEditorClient({ initialData, events, action }: any) {
    const [data, setData] = useState(initialData)

    return (
        <div className={styles.splitContainer}>
            <div className={styles.editorPane}>
                <h1 className={styles.pageTitle}>TOPページ編集</h1>
                <p style={{ fontSize: '0.9rem', color: '#86868b', marginBottom: '2rem' }}>左で入力した情報が、右側にリアルタイムでプレビュー表示されます。</p>

                <form action={action}>
                    <RichTextEditor
                        name="catchcopy"
                        value={data.catchcopy}
                        onChange={(v) => setData({ ...data, catchcopy: v })}
                        label="メインのキャッチコピー"
                        hint="自由に装飾可能です。トップの画像上に表示されます。"
                    />

                    <div style={{ marginBottom: '2.5rem', background: '#f5f5f7', padding: '1.5rem', borderRadius: '16px' }}>
                        <ImageUploader
                            name="heroImage"
                            label="ヒーロー画像（一番上の大きな画像）"
                            defaultValue={data.heroImage}
                        />
                        <span style={{ fontSize: '0.85rem', color: '#86868b', display: 'block', marginTop: '0.5rem' }}>※画像の変更は「更新する」ボタンを押した後に全体に反映されます。</span>
                    </div>

                    <RichTextEditor
                        name="philosophy"
                        value={data.philosophy}
                        onChange={(v) => setData({ ...data, philosophy: v })}
                        label="運営理念 本文"
                        hint="Wordのように一部だけを太字にしたり大きくしたりできます。"
                    />

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>Instagram URL</label>
                        <input type="url" name="instagramUrl" value={data.instaUrl} onChange={e => setData({ ...data, instaUrl: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7' }} />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>Facebook URL</label>
                        <input type="url" name="facebookUrl" value={data.fbUrl} onChange={e => setData({ ...data, fbUrl: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7' }} />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        全て更新する
                    </button>
                </form>
            </div>

            <div className={styles.previewPane}>
                <div className={styles.previewHeader}>
                    <span style={{ width: 10, height: 10, background: '#ff3b30', borderRadius: '50%', display: 'inline-block' }}></span>
                    リアルタイムプレビュー（編集中）
                </div>
                <div className={styles.previewContent}>
                    <div className={styles.previewContentInner}>
                        <TopPageView
                            catchcopy={data.catchcopy}
                            heroImage={data.heroImage}
                            philosophyBody={data.philosophy}
                            instaUrl={data.instaUrl}
                            fbUrl={data.fbUrl}
                            events={events}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
