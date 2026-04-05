import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import styles from './page.module.css'

export default async function SettingsPage() {
    const settings = await prisma.siteSetting.findMany()

    const getValue = (key: string, defaultVal: string) => {
        const s = settings.find((s: any) => s.key === key)
        return s ? s.value : defaultVal
    }

    const contactName = getValue('contactName', '運営事務局')
    const contactEmail = getValue('contactEmail', 'info@example.com')

    const colorPrimary = getValue('colorPrimary', '#1e3a8a')
    const colorSecondary = getValue('colorSecondary', '#3b82f6')
    const colorAccent = getValue('colorAccent', '#0ca678')

    const fontFamily = getValue('fontFamily', "'Noto Sans JP', sans-serif")
    const baseFontSize = getValue('baseFontSize', '16')
    const titleFontSize = getValue('titleFontSize', '42')

    async function updateSettings(formData: FormData) {
        'use server'

        const newContactName = formData.get('contactName') as string
        const newContactEmail = formData.get('contactEmail') as string
        const newColorPrimary = formData.get('colorPrimary') as string
        const newColorSecondary = formData.get('colorSecondary') as string
        const newColorAccent = formData.get('colorAccent') as string
        const newFontFamily = formData.get('fontFamily') as string
        const newBaseFontSize = formData.get('baseFontSize') as string
        const newTitleFontSize = formData.get('titleFontSize') as string

        await prisma.siteSetting.upsert({ where: { key: 'contactName' }, update: { value: newContactName }, create: { key: 'contactName', value: newContactName } })
        await prisma.siteSetting.upsert({ where: { key: 'contactEmail' }, update: { value: newContactEmail }, create: { key: 'contactEmail', value: newContactEmail } })
        await prisma.siteSetting.upsert({ where: { key: 'colorPrimary' }, update: { value: newColorPrimary }, create: { key: 'colorPrimary', value: newColorPrimary } })
        await prisma.siteSetting.upsert({ where: { key: 'colorSecondary' }, update: { value: newColorSecondary }, create: { key: 'colorSecondary', value: newColorSecondary } })
        await prisma.siteSetting.upsert({ where: { key: 'colorAccent' }, update: { value: newColorAccent }, create: { key: 'colorAccent', value: newColorAccent } })
        await prisma.siteSetting.upsert({ where: { key: 'fontFamily' }, update: { value: newFontFamily }, create: { key: 'fontFamily', value: newFontFamily } })
        await prisma.siteSetting.upsert({ where: { key: 'baseFontSize' }, update: { value: newBaseFontSize }, create: { key: 'baseFontSize', value: newBaseFontSize } })
        await prisma.siteSetting.upsert({ where: { key: 'titleFontSize' }, update: { value: newTitleFontSize }, create: { key: 'titleFontSize', value: newTitleFontSize } })

        revalidatePath('/admin/settings')
        revalidatePath('/', 'layout')
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>基本設定</h1>
            <form action={updateSettings} className={styles.form}>
                <div className={styles.card}>
                    <h2>サイト基本情報</h2>

                    <div className={styles.formGroup}>
                        <label>問い合わせ先 名称</label>
                        <input type="text" name="contactName" defaultValue={contactName} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>問い合わせ先 メールアドレス</label>
                        <input type="email" name="contactEmail" defaultValue={contactEmail} required />
                    </div>

                    <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>テーマカラー設定</h3>
                    <div className={styles.formGroup}>
                        <label>メインカラー（ヘッダーやボタン・見出しなど）</label>
                        <input type="color" name="colorPrimary" defaultValue={colorPrimary} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>サブカラー（ホバー時の色など）</label>
                        <input type="color" name="colorSecondary" defaultValue={colorSecondary} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>アクセントカラー（日付や装飾ライン）</label>
                        <input type="color" name="colorAccent" defaultValue={colorAccent} />
                    </div>

                    <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>フォント・文字サイズ設定</h3>
                    <div className={styles.formGroup}>
                        <label>全体のフォント種類</label>
                        <select name="fontFamily" defaultValue={fontFamily} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', maxWidth: '400px' }}>
                            <option value="'Noto Sans JP', sans-serif">標準（ゴシック体）</option>
                            <option value="'Noto Serif JP', serif">明朝体（フォーマル・格式高い）</option>
                            <option value="'M PLUS Rounded 1c', sans-serif">丸ゴシック（親しみやすい）</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>本文の基準サイズ (px) ※初期値: 16</label>
                        <input type="number" name="baseFontSize" defaultValue={baseFontSize} min="12" max="24" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>大見出しのサイズ (px) ※初期値: 42</label>
                        <input type="number" name="titleFontSize" defaultValue={titleFontSize} min="20" max="80" />
                    </div>

                    <button type="submit" className={styles.submitBtn} style={{ marginTop: '2rem' }}>
                        保存する
                    </button>
                </div>
            </form>
        </div>
    )
}
