import styles from './page.module.css'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function ArchivePage() {
    const archivedEvents = await prisma.event.findMany({
        where: { status: 'ARCHIVED' },
        orderBy: { date: 'desc' }
    })

    return (
        <div className={`container ${styles.page}`}>
            <h1 className={styles.pageTitle}>過去のイベント・活動実績</h1>

            <div className={styles.eventList}>
                {archivedEvents.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>過去のイベント・活動実績はまだありません。</p>
                ) : (
                    archivedEvents.map((event: any) => (
                        <div className={styles.eventCard} key={event.id}>
                            <div className={styles.eventDate}>{event.date.toLocaleDateString('ja-JP')}</div>
                            <h2 className={styles.eventTitle}>{event.title}</h2>
                            {event.location && <p className={styles.eventLocation}>{event.location}</p>}
                            {event.description && <p className={styles.eventDesc}>{event.description}</p>}

                            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {event.applicationUrl && (
                                    <a href={event.applicationUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--color-primary)', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>当時の参加申込ページ</a>
                                )}
                                {event.pamphletUrl && (
                                    <a href={event.pamphletUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.4rem 1rem', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.85rem' }}>当時のパンフレット</a>
                                )}
                            </div>

                            {event.pamphletUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(event.pamphletUrl) && (
                                <div style={{ marginTop: '1rem' }}>
                                    <a href={event.pamphletUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={event.pamphletUrl} alt="当時のフライヤー・パンフレット" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '8px' }} />
                                    </a>
                                </div>
                            )}

                            {event.qrImageUrl && (
                                <div style={{ marginTop: '1rem' }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>当時の案内QR</p>
                                    <img src={event.qrImageUrl} alt="QRコード" style={{ width: '100px', height: '100px', objectFit: 'contain', border: '1px solid #eee' }} />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className={styles.backLink}>
                <Link href="/">TOPページへ戻る</Link>
            </div>
        </div>
    )
}
