import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import PagesEditorClient from './PagesEditorClient'

export default async function PagesAdminPage() {
    const contents = await prisma.pageContent.findMany()

    const getVal = (page: string, section: string) => {
        return contents.find((c: any) => c.pageKey === page && c.sectionKey === section)?.body || ''
    }
    const getImg = (page: string, section: string) => {
        return contents.find((c: any) => c.pageKey === page && c.sectionKey === section)?.imageUrl || ''
    }

    const initialData = {
        greetingTitle: getVal('greeting', 'title') || '共に命を守る社会へ',
        greetingBody: getVal('greeting', 'body') || '高齢化が進む現代において、命を救うための心肺蘇生や一次救命処置の重要性はますます高まっています。<br><br>我々「関東蘇生アカデミー」は、地域の皆様や医療スタッフに対して、最新かつ正確な知識を提供し、いざという時にためらわずに行動できる人材を育成することを使命として活動しております。',
        greetingSignature: getVal('greeting', 'signature') || '関東蘇生アカデミー 会長 医療 太郎',
        greetingPhoto: getImg('greeting', 'photo') || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
        orgBody: getVal('organization', 'body') || '当アカデミーは以下の組織体制で運営されています。',
        orgImage: getImg('organization', 'image') || 'https://images.unsplash.com/photo-1531206715516-11f3b146f6b5?auto=format&fit=crop&q=80&w=800'
    }

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
            if (f.b !== undefined || f.i !== undefined) {
                await prisma.pageContent.upsert({
                    where: { pageKey_sectionKey: { pageKey: f.p, sectionKey: f.s } },
                    update: { body: f.b ?? '', imageUrl: f.i ?? '' },
                    create: { pageKey: f.p, sectionKey: f.s, body: f.b ?? '', imageUrl: f.i ?? '' }
                })
            }
        }

        revalidatePath('/admin/pages')
        revalidatePath('/greeting')
        revalidatePath('/organization')
    }

    return (
        <PagesEditorClient initialData={initialData} action={updatePages} />
    )
}
