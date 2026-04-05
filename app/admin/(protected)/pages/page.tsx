import { prisma } from '@/lib/prisma'
import { updatePages } from '@/app/admin/actions'
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

    return (
        <PagesEditorClient initialData={initialData} action={updatePages} />
    )
}
