import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import styles from '../pages/page.module.css'
import ImageUploader from '@/components/admin/ImageUploader'

export default async function TopAdminPage() {
    const contents = await prisma.pageContent.findMany({
        where: { pageKey: 'top' }
    })

    const getTopVal = (sectionKey: string) => {
        return contents.find((c: any) => c.sectionKey === sectionKey)?.body || ''
    }
    const getTopImg = (sectionKey: string) => {
        return contents.find((c: any) => c.sectionKey === sectionKey)?.imageUrl || ''
    }

    const philosophy = getTopVal('philosophy') || '当アカデミーは、最新の医療知識と実践的な蘇生技術の普及を目指し、\n医療従事者から一般市民まで幅広い層への教育活動を行っています。'
    const catchcopy = getTopVal('catchcopy') || '命を繋ぐ、確かな手技と知識を。'
    const heroImage = getTopImg('heroImage') || 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600'
    const instagramUrl = getTopVal('instagramUrl') || 'https://instagram.com'
    const facebookUrl = getTopVal('facebookUrl') || 'https://facebook.com'

    async function updateTopPage(formData: FormData) {
        'use server'

        const fields = [
            { key: 'philosophy', body: formData.get('philosophy') as string },
            { key: 'catchcopy', body: formData.get('catchcopy') as string },
            { key: 'heroImage', imageUrl: formData.get('heroImage') as string },
            { key: 'instagramUrl', body: formData.get('instagramUrl') as string },
            { key: 'facebookUrl', body: formData.get('facebookUrl') as string }
        ]

        for (const field of fields) {
            await prisma.pageContent.upsert({
                where: { pageKey_sectionKey: { pageKey: 'top', sectionKey: field.key } },
                update: { body: field.body ?? '', imageUrl: field.imageUrl ?? '' },
                create: { pageKey: 'top', sectionKey: field.key, body: field.body ?? '', imageUrl: field.imageUrl ?? '' }
            })
        }

        revalidatePath('/admin/top')
        revalidatePath('/')
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>TOPページ編集</h1>
            <div className={styles.card}>
                <h2>TOPページ項目の一括編集</h2>
                <form action={updateTopPage} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>キャッチコピー</label>
                        <p className={styles.hint}>※TOPページの画像上に大きく表示される短いテキストです。</p>
                        <input type="text" name="catchcopy" defaultValue={catchcopy} />
                    </div>

                    <div className={styles.formGroup}>
                        <ImageUploader
                            name="heroImage"
                            label="ヒーロー画像（一番上の大きな画像）"
                            defaultValue={heroImage}
                        />
                        <p className={styles.hint} style={{ marginTop: '-1rem' }}>※自動的に青みがかったフィルターが適用され、文字が読みやすくなります。</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label>運営理念 本文</label>
                        <p className={styles.hint}>※改行した箇所は実際のページでもそのまま反映されます。</p>
                        <textarea name="philosophy" rows={6} defaultValue={philosophy}></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Instagram URL</label>
                        <input type="url" name="instagramUrl" defaultValue={instagramUrl} />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Facebook URL</label>
                        <input type="url" name="facebookUrl" defaultValue={facebookUrl} />
                    </div>

                    <button type="submit" className={styles.submitBtn}>一括保存する</button>
                </form>
            </div>
        </div>
    )
}
