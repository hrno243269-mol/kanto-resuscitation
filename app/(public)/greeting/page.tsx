import { prisma } from '@/lib/prisma'
import GreetingPageView from '@/components/public/GreetingPageView'

export default async function GreetingPage() {
    const contents = await prisma.pageContent.findMany({
        where: { pageKey: 'greeting' }
    })
    const getVal = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.body || d
    const getImg = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.imageUrl || d

    const title = getVal('title', '共に命を守る社会へ')
    const body = getVal('body', '高齢化が進む現代において、命を救うための心肺蘇生や一次救命処置の重要性はますます高まっています。<br><br>我々「関東蘇生アカデミー」は、地域の皆様や医療スタッフに対して、最新かつ正確な知識を提供し、いざという時にためらわずに行動できる人材を育成することを使命として活動しております。<br><br>尊い命を一つでも多く救うため、引き続きご支援とご協力を賜りますようお願い申し上げます。')
    const signatureText = getVal('signature', '関東蘇生アカデミー 会長 医療 太郎')
    const photoUrl = getImg('photo', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400')

    return (
        <GreetingPageView
            title={title}
            body={body}
            signatureText={signatureText}
            photoUrl={photoUrl}
        />
    )
}
