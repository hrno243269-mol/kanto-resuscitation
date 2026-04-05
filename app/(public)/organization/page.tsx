import { prisma } from '@/lib/prisma'
import OrganizationPageView from '@/components/public/OrganizationPageView'

export default async function OrganizationPage() {
    const contents = await prisma.pageContent.findMany({
        where: { pageKey: 'organization' }
    })
    const getVal = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.body || d
    const getImg = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.imageUrl || d

    const body = getVal('body', '当アカデミーは以下の組織体制で運営されています。')
    const imageUrl = getImg('image', 'https://images.unsplash.com/photo-1531206715516-11f3b146f6b5?auto=format&fit=crop&q=80&w=800')

    return (
        <OrganizationPageView
            body={body}
            imageUrl={imageUrl}
        />
    )
}
