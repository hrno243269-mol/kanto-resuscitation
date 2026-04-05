import styles from './page.module.css'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import TopPageView from '@/components/public/TopPageView'

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { status: 'UPCOMING' },
    orderBy: { date: 'asc' },
    take: 3
  })

  // Serialize dates to pass cleanly to Client Components
  const serializedEvents = events.map(e => ({
    ...e,
    date: e.date.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString()
  }))

  const contents = await prisma.pageContent.findMany({
    where: { pageKey: 'top' }
  })
  const getVal = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.body || d
  const getImg = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.imageUrl || d

  const philosophyBody = getVal('philosophy', '当アカデミーは、最新の医療知識と実践的な蘇生技術の普及を目指し、\n医療従事者から一般市民まで幅広い層への教育活動を行っています。')
  const catchcopy = getVal('catchcopy', '命を繋ぐ、確かな手技と知識を。')
  const heroImage = getImg('heroImage', 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600')
  const instaUrl = getVal('instagramUrl', 'https://instagram.com')
  const fbUrl = getVal('facebookUrl', 'https://facebook.com')

  return (
    <>
      <TopPageView
        catchcopy={catchcopy}
        heroImage={heroImage}
        philosophyBody={philosophyBody}
        instaUrl={instaUrl}
        fbUrl={fbUrl}
        events={serializedEvents}
      />

      {/* 管理者画面へのリンク (Topページの隅) */}
      <div className={styles.adminCornerLink}>
        <Link href="/admin/login">🔐 管理者ログイン</Link>
      </div>
    </>
  )
}
