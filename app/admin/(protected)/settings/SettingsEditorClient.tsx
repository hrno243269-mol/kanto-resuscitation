'use client'
import React, { useState } from 'react'
import styles from '../top/TopEditor.module.css'
import ImageUploader from '@/components/admin/ImageUploader'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

export default function SettingsEditorClient({ initialData, action }: any) {
    const [data, setData] = useState(initialData)

    return (
        <div id="settings-editor" className={styles.splitContainer}>
            <style>{`
                #settings-editor {
                    --color-primary: ${data.colorPrimary} !important;
                    --color-secondary: ${data.colorSecondary} !important;
                    --color-accent: ${data.colorAccent} !important;
                }
            `}</style>
            <div className={styles.editorPane}>
                <h1 className={styles.pageTitle}>サイト共通設定</h1>
                <p style={{ fontSize: '0.9rem', color: '#86868b', marginBottom: '2rem' }}>左で入力した情報が、右側にリアルタイムでプレビュー表示されます。</p>

                <form action={action}>
                    <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>ヘッダー設定</h2>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>サイト名（テキストロゴ）</label>
                            <input type="text" name="headerTitle" value={data.headerTitle} onChange={e => setData({ ...data, headerTitle: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7' }} required />
                        </div>
                        <div style={{ marginBottom: '2rem', background: '#f5f5f7', padding: '1.5rem', borderRadius: '16px' }}>
                            <ImageUploader name="headerLogo" label="ロゴ画像（設定するとテキストより優先されます）" defaultValue={data.headerLogo} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>フッター設定</h2>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>フッター用 サイト名</label>
                            <input type="text" name="footerTitle" value={data.footerTitle} onChange={e => setData({ ...data, footerTitle: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7' }} required />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>フッター説明文</label>
                            <textarea name="footerDesc" value={data.footerDesc} onChange={e => setData({ ...data, footerDesc: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7', minHeight: '100px' }} required />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>コピーライト（&copy; 2026 以降の文字）</label>
                            <input type="text" name="copyright" value={data.copyright} onChange={e => setData({ ...data, copyright: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7' }} required />
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>テーマカラー設定</h2>
                        <span style={{ fontSize: '0.85rem', color: '#86868b', display: 'block', marginBottom: '1.5rem' }}>※色を選択した瞬間に、この設定画面のボタンなど全体の色がリアルタイムで変化して確認できます。反映を確認してから「全て更新する」を押してください。</span>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>メインカラー</label>
                                <input type="color" name="colorPrimary" value={data.colorPrimary} onChange={e => setData({ ...data, colorPrimary: e.target.value })} style={{ width: '100%', height: '50px', borderRadius: '8px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>サブカラー</label>
                                <input type="color" name="colorSecondary" value={data.colorSecondary} onChange={e => setData({ ...data, colorSecondary: e.target.value })} style={{ width: '100%', height: '50px', borderRadius: '8px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>アクセント</label>
                                <input type="color" name="colorAccent" value={data.colorAccent} onChange={e => setData({ ...data, colorAccent: e.target.value })} style={{ width: '100%', height: '50px', borderRadius: '8px', cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>フォント・基本情報設定</h2>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>全体のフォント種類</label>
                            <select name="fontFamily" value={data.fontFamily} onChange={e => setData({ ...data, fontFamily: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7' }}>
                                <option value="'Noto Sans JP', sans-serif">標準（ゴシック体）</option>
                                <option value="'Noto Serif JP', serif">明朝体（フォーマル・格式高い）</option>
                                <option value="'M PLUS Rounded 1c', sans-serif">丸ゴシック（親しみやすい）</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>本文サイズ (px)</label>
                                <input type="number" name="baseFontSize" value={data.baseFontSize} onChange={e => setData({ ...data, baseFontSize: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#f5f5f7' }} min="12" max="24" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>大見出しサイズ (px)</label>
                                <input type="number" name="titleFontSize" value={data.titleFontSize} onChange={e => setData({ ...data, titleFontSize: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#f5f5f7' }} min="20" max="80" />
                            </div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>問い合わせ先（名称）</label>
                            <input type="text" name="contactName" value={data.contactName} onChange={e => setData({ ...data, contactName: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#f5f5f7' }} required />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>問い合わせ先（Email）</label>
                            <input type="email" name="contactEmail" value={data.contactEmail} onChange={e => setData({ ...data, contactEmail: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#f5f5f7' }} required />
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
                    <div className={styles.previewContentInner} style={{ padding: '2rem 0', background: '#f5f5f7', minHeight: '100%' }}>

                        <div style={{ background: '#fff', marginBottom: '3rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ textAlign: 'center', color: '#86868b', fontSize: '0.8rem', padding: '1rem', borderBottom: '1px solid #eee', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ヘッダープレビュー</h3>
                            <div style={{ position: 'relative' }}>
                                <Header logo={data.headerLogo} title={data.headerTitle} />
                            </div>
                        </div>

                        <div style={{ background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ textAlign: 'center', color: '#86868b', fontSize: '0.8rem', padding: '1rem', borderBottom: '1px solid #eee', textTransform: 'uppercase', letterSpacing: '0.1em' }}>フッタープレビュー</h3>
                            <Footer title={data.footerTitle} desc={data.footerDesc} email={data.contactEmail} copyright={data.copyright} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
