import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import TopEditorClient from './TopEditorClient'

export default async function TopAdminPage() {
    const contents = await prisma.pageContent.findMany({
        where: { pageKey: 'top' }
    })
    const getVal = (k: string, d: string) => contents.find(c => c.sectionKey === k)?.body || d
    const getImg = (k: string, d: string) => contents.find(c => c.sectionKey === k)?.imageUrl || d

    const philosophy = getVal('philosophy', '当アカデミーは、最新の医療知識と実践的な蘇生技術の普及を目指し、\n医療従事者から一般市民まで幅広い層への教育活動を行っています。')
    const catchcopy = getVal('catchcopy', '命を繋ぐ、確かな手技と知識を。')
    const heroImage = getImg('heroImage', 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600')
    const instaUrl = getVal('instagramUrl', 'https://instagram.com')
    const fbUrl = getVal('facebookUrl', 'https://facebook.com')

    const initialData = { philosophy, catchcopy, heroImage, instaUrl, fbUrl }

    const events = await prisma.event.findMany({
        where: { status: 'UPCOMING' },
        orderBy: { date: 'asc' },
        take: 3
    })

    const serializedEvents = events.map(e => ({
        ...e,
        date: e.date.toISOString(),
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString()
    }))

    async function updateTopPage(formData: FormData) {
        'use server'
        const updates = [
            { key: 'philosophy', body: formData.get('philosophy') as string },
            { key: 'catchcopy', body: formData.get('catchcopy') as string },
            { key: 'instagramUrl', body: formData.get('instagramUrl') as string },
            { key: 'facebookUrl', body: formData.get('facebookUrl') as string }
        ]

        for (const u of updates) {
            if (u.body !== null) {
                await prisma.pageContent.upsert({
                    where: { pageKey_sectionKey: { pageKey: 'top', sectionKey: u.key } },
                    update: { body: u.body },
                    create: { pageKey: 'top', sectionKey: u.key, body: u.body }
                })
            }
        }

        const heroImageVal = formData.get('heroImage') as string
        if (heroImageVal) {
            await prisma.pageContent.upsert({
                where: { pageKey_sectionKey: { pageKey: 'top', sectionKey: 'heroImage' } },
                update: { imageUrl: heroImageVal },
                create: { pageKey: 'top', sectionKey: 'heroImage', imageUrl: heroImageVal }
            })
        }
        revalidatePath('/admin/top')
        revalidatePath('/')
    }

    return (
        <TopEditorClient
            initialData={initialData}
            events={serializedEvents}
            action={updateTopPage}
        />
    )
}
