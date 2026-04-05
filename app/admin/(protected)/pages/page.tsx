import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import styles from './page.module.css'
import ImageUploader from '@/components/admin/ImageUploader'

export default async function PagesAdminPage() {
    const contents = await prisma.pageContent.findMany()

    const getVal = (page: string, section: string) => {
        return contents.find((c: any) => c.pageKey === page && c.sectionKey === section)?.body || ''
    }
    const getImg = (page: string, section: string) => {
        return contents.find((c: any) => c.pageKey === page && c.sectionKey === section)?.imageUrl || ''
    }

    // Greeting
    const greetingTitle = getVal('greeting', 'title') || '共に命を守る社会へ'
    const greetingBody = getVal('greeting', 'body') || '高齢化が進む現代において...'
    const greetingSignature = getVal('greeting', 'signature') || '関東蘇生アカデミー 会長 医療 太郎'
    const greetingPhoto = getImg('greeting', 'photo') || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'

    // Organization
    const orgBody = getVal('organization', 'body') || '当アカデミーは以下の組織体制で運営されています。'
    const orgImage = getImg('organization', 'image') || 'https://images.unsplash.com/photo-1531206715516-11f3b146f6b5?auto=format&fit=crop&q=80&w=800'

    async function updatePages(formData: FormData) {
        'use server'

        const fields = [
            { p: 'greeting', s: 'title', b: formData.get('greetingTitle') as string },
            { p: 'greeting', s: 'body', b: formData.get('greetingBody') as string },
            { p: 'greeting', s: 'signature', b: formData.get('greetingSignature') as string },
            { p: 'greeting', s: 'photo', i: formData.get('greetingPhoto') as string },
            { p: 'organization', s: 'body', b: formData.get('orgBody') as string },
            { p: 'organization', s: 'image', i: formData.get('orgImage') as string },
        ]

        for (const f of fields) {
            await prisma.pageContent.upsert({
                where: { pageKey_sectionKey: { pageKey: f.p, sectionKey: f.s } },
                update: { body: f.b ?? '', imageUrl: f.i ?? '' },
                create: { pageKey: f.p, sectionKey: f.s, body: f.b ?? '', imageUrl: f.i ?? '' }
            })
        }

        revalidatePath('/admin/pages')
        revalidatePath('/greeting')
        revalidatePath('/organization')
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>各ページ編集</h1>

            <form action={updatePages} className={styles.form}>
                <div className={styles.card}>
                    <h2>会長挨拶ページ</h2>
                    <div className={styles.formGroup}>
                        <label>タイトル</label>
                        <input type="text" name="greetingTitle" defaultValue={greetingTitle} />
                    </div>
                    <ImageUploader name="greetingPhoto" label="会長の写真" defaultValue={greetingPhoto} />
                    <div className={styles.formGroup}>
                        <label>本文</label>
                        <textarea name="greetingBody" rows={8} defaultValue={greetingBody}></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>署名</label>
                        <input type="text" name="greetingSignature" defaultValue={greetingSignature} />
                    </div>
                </div>

                <div className={styles.card}>
                    <h2>組織図ページ</h2>
                    <div className={styles.formGroup}>
                        <label>説明文</label>
                        <textarea name="orgBody" rows={4} defaultValue={orgBody}></textarea>
                    </div>
                    <ImageUploader name="orgImage" label="組織図の画像" defaultValue={orgImage} />
                </div>

                <button type="submit" className={styles.submitBtn} style={{ marginTop: '1rem' }}>変更を保存する</button>
            </form>
        </div>
    )
}
