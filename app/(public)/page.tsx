import styles from './page.module.css'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { status: 'UPCOMING' },
    orderBy: { date: 'asc' },
    take: 3
  })

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
    <div className={styles.topPage}>
      {/* 1-1. ファーストビュー */}
      <section className={styles.heroSection} style={{ backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url('${heroImage}')` }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>関東蘇生アカデミー</h1>
          <p className={styles.heroCatchcopy}>{catchcopy}</p>
        </div>
      </section>

      {/* 1-3. 運営理念 */}
      <section className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>運営理念</h2>
        <div className={styles.philosophyContent}>
          <p>
            {philosophyBody.split('\n').map((line: string, i: number) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* 1-2. 今後のイベント */}
      <section className={`container ${styles.section} ${styles.eventSection}`}>
        <h2 className={styles.sectionTitle}>今後のイベント</h2>
        <div className={styles.eventList}>
          {events.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%' }}>現在予定されているイベントはありません。</p>
          ) : (
            events.map((event: any) => (
              <div className={styles.eventCard} key={event.id}>
                <div className={styles.eventDate}>{event.date.toLocaleDateString('ja-JP')}</div>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                {event.location && <p className={styles.eventLocation}>{event.location}</p>}
                {event.description && <p className={styles.eventDesc}>{event.description}</p>}

                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {event.applicationUrl && (
                    <a href={event.applicationUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--color-primary)', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>参加申込フォーム</a>
                  )}
                  {event.pamphletUrl && (
                    <a href={event.pamphletUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.4rem 1rem', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.85rem' }}>パンフレット</a>
                  )}
                </div>
                {event.qrImageUrl && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>スマホ等からの申し込みQR</p>
                    <img src={event.qrImageUrl} alt="QRコード" style={{ width: '100px', height: '100px', objectFit: 'contain', border: '1px solid #eee' }} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className={styles.moreLink}>
          <Link href="/archive">過去のイベント一覧を見る</Link>
        </div>
      </section>

      {/* 1-4. SNSリンク & 1-5. 各種導線 */}
      <section className={`container ${styles.section} ${styles.linksSection}`}>
        <h2 className={styles.sectionTitle}>インフォメーション</h2>
        <div className={styles.linksGrid}>
          <div className={styles.linkCard}>
            <h3>各種団体情報</h3>
            <ul className={styles.simpleList}>
              <li><Link href="/greeting">会長挨拶</Link></li>
              <li><Link href="/organization">組織図</Link></li>
            </ul>
          </div>
          <div className={styles.linkCard}>
            <h3>公式SNS</h3>
            <ul className={styles.simpleList}>
              <li><a href={instaUrl} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={fbUrl} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 管理者画面へのリンク (Topページの隅) */}
      <div className={styles.adminCornerLink}>
        <Link href="/admin/login">🔐 管理者ログイン</Link>
      </div>
    </div>
  )
}
