import React from 'react'
import Link from 'next/link'
import styles from '@/app/(public)/page.module.css'

interface EventData {
    id: string
    title: string
    date: string
    location?: string | null
    description?: string | null
    applicationUrl?: string | null
    pamphletUrl?: string | null
    qrImageUrl?: string | null
}

interface TopPageViewProps {
    catchcopy: string
    heroImage: string
    philosophyBody: string
    instaUrl: string
    fbUrl: string
    events: EventData[]
}

export default function TopPageView({
    catchcopy,
    heroImage,
    philosophyBody,
    instaUrl,
    fbUrl,
    events
}: TopPageViewProps) {
    return (
        <div className={styles.topPage}>
            <section className={styles.heroSection} style={{ backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.6), rgba(30, 58, 138, 0.6)), url('${heroImage}')` }}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>関東蘇生アカデミー</h1>
                    <div className={`${styles.heroCatchcopy} rich-text-content`} dangerouslySetInnerHTML={{ __html: catchcopy }} />
                </div>
            </section>

            <section className={`container ${styles.section}`}>
                <h2 className={styles.sectionTitle}>運営理念</h2>
                <div className={`${styles.philosophyContent} rich-text-content`} dangerouslySetInnerHTML={{ __html: philosophyBody }} />
            </section>

            <section className={`container ${styles.section} ${styles.eventSection}`}>
                <h2 className={styles.sectionTitle}>今後のイベント</h2>
                <div className={styles.eventList}>
                    {events.length === 0 ? (
                        <p style={{ textAlign: 'center', width: '100%' }}>現在予定されているイベントはありません。</p>
                    ) : (
                        events.map((event) => (
                            <div className={styles.eventCard} key={event.id}>
                                <div className={styles.eventDate}>{new Date(event.date).toLocaleDateString('ja-JP')}</div>
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
                                        <img src={event.qrImageUrl} alt="QRコード" style={{ width: '100px', height: '100px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '8px' }} />
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
        </div>
    )
}
