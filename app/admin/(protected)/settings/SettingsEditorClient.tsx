'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../top/TopEditor.module.css'
import ImageUploader from '@/components/admin/ImageUploader'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

const ColorPicker = ({ name, label, value, onChange }: { name: string, label: string, value: string, onChange: (val: string) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 外部（テキストボックス等）からStateが変更された場合、Reactの監視外であるDOMにも直接同期する
    useEffect(() => {
        if (inputRef.current && inputRef.current.value !== value) {
            inputRef.current.value = value || '#000000';
        }
    }, [value]);

    // カラーピッカーをドラッグ中（リアルタイム）の処理
    // ReactのonChangeに任せるとSafariで再レンダリング時に強制切断されるため、
    // 生のDOMイベントリスナーでCSS変数を直接書き換え、Reactの機能（State）を完全に迂回する
    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;

        const cssVarName = `--color-${name.replace('color', '').toLowerCase()}`;
        const handleNativeInput = (e: Event) => {
            const v = (e.target as HTMLInputElement).value;
            const container = document.getElementById('settings-editor');
            if (container) {
                container.style.setProperty(cssVarName, v);
            }
        };

        el.addEventListener('input', handleNativeInput);
        return () => el.removeEventListener('input', handleNativeInput);
    }, [name]);

    return (
        <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>{label}</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                    type="color"
                    name={name}
                    ref={inputRef}
                    defaultValue={value || '#000000'} /* Safari fallback */
                    onBlur={e => onChange(e.target.value)} // ドラッグ終了（ピッカーを閉じた時）のみStateへ保存
                    style={{ width: '50px', height: '50px', cursor: 'pointer', padding: 0, border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    value={value || '#000000'}
                    onChange={e => onChange(e.target.value)}
                    maxLength={7}
                    placeholder="#RRGGBB"
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #d2d2d7', background: '#f5f5f7', fontSize: '0.9rem', fontFamily: 'monospace' }}
                />
            </div>
        </div>
    )
}

export default function SettingsEditorClient({ initialData, action }: any) {
    const [data, setData] = useState(initialData)

    return (
        <div id="settings-editor" className={styles.splitContainer} style={{
            '--color-primary': data.colorPrimary,
            '--color-secondary': data.colorSecondary,
            '--color-accent': data.colorAccent,
        } as React.CSSProperties}>
            <div className={styles.editorPane}>
                <h1 className={styles.pageTitle}>サイト共通設定</h1>
                <p style={{ fontSize: '0.9rem', color: '#86868b', marginBottom: '2rem' }}>左で入力した情報が、右側にリアルタイムでプレビュー表示されます。</p>

                <form action={action}>
                    <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1d1d1f' }}>基本情報・SEO設定</h2>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.6rem' }}>サイトの説明文 (LINEや検索結果に表示)</label>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.8rem' }}>URLをシェアした際に出る短い説明文（Meta Description）です。</p>
                            <textarea name="siteDescription" value={data.siteDescription} onChange={e => setData({ ...data, siteDescription: e.target.value })} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid transparent', background: '#f5f5f7', minHeight: '80px' }} required />
                        </div>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', marginTop: '3rem', color: '#1d1d1f' }}>ヘッダー設定</h2>
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
                            <ColorPicker name="colorPrimary" label="メインカラー" value={data.colorPrimary} onChange={val => setData({ ...data, colorPrimary: val })} />
                            <ColorPicker name="colorSecondary" label="サブカラー" value={data.colorSecondary} onChange={val => setData({ ...data, colorSecondary: val })} />
                            <ColorPicker name="colorAccent" label="アクセント" value={data.colorAccent} onChange={val => setData({ ...data, colorAccent: val })} />
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
