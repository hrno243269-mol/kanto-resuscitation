import { prisma } from '@/lib/prisma'
import { updateTopPage } from '@/app/admin/actions'
import TopEditorClient from './TopEditorClient'

export default async function TopAdminPage() {
    const contents = await prisma.pageContent.findMany({
        where: { pageKey: 'top' }
    })
    const getVal = (k: string, d: string) => contents.find(c => c.sectionKey === k)?.body || d
    const getImg = (k: string, d: string) => contents.find(c => c.sectionKey === k)?.imageUrl || d

    const initialData = {
        philosophy: getVal('philosophy', '当アカデミーは、最新の医療知識と実践的な蘇生技術の普及を目指し、\n医療従事者から一般市民まで幅広い層への教育活動を行っています。'),
        catchcopy: getVal('catchcopy', '命を繋ぐ、確かな手技と知識を。'),
        heroImage: getImg('heroImage', 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600'),
        instaUrl: getVal('instagramUrl', 'https://instagram.com'),
        fbUrl: getVal('facebookUrl', 'https://facebook.com')
    }

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

    return (
        <TopEditorClient
            initialData={initialData}
            events={serializedEvents}
            action={updateTopPage}
        />
    )
}
