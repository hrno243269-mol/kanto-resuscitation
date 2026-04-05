import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import styles from './page.module.css'
import ImageUploader from '@/components/admin/ImageUploader'

export default async function EventsAdminPage() {
    const events = await prisma.event.findMany({
        orderBy: { date: 'desc' }
    })

    async function addEvent(formData: FormData) {
        'use server'
        const title = formData.get('title') as string
        const dateStr = formData.get('date') as string
        const location = formData.get('location') as string
        const description = formData.get('description') as string
        const applicationUrl = formData.get('applicationUrl') as string
        const qrImageUrl = formData.get('qrImageUrl') as string
        const pamphletUrl = formData.get('pamphletUrl') as string

        await prisma.event.create({
            data: {
                title,
                date: new Date(dateStr),
                location,
                description,
                applicationUrl,
                qrImageUrl,
                pamphletUrl,
                status: 'UPCOMING'
            }
        })
        revalidatePath('/admin/events')
        revalidatePath('/')
        revalidatePath('/archive')
    }

    async function archiveEvent(formData: FormData) {
        'use server'
        const id = formData.get('id') as string
        await prisma.event.update({
            where: { id },
            data: { status: 'ARCHIVED' }
        })
        revalidatePath('/admin/events')
        revalidatePath('/')
        revalidatePath('/archive')
    }

    async function deleteEvent(formData: FormData) {
        'use server'
        const id = formData.get('id') as string
        await prisma.event.delete({ where: { id } })
        revalidatePath('/admin/events')
        revalidatePath('/')
        revalidatePath('/archive')
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>イベント管理</h1>

            <div className={styles.card}>
                <h2>新規イベント追加</h2>
                <form action={addEvent} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>イベント名</label>
                        <input type="text" name="title" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>開催日</label>
                        <input type="date" name="date" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>開催場所</label>
                        <input type="text" name="location" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>概要</label>
                        <textarea name="description" rows={3}></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>申込フォームURLなど（任意）</label>
                        <p className={styles.hint}>※外部の予約ページ（Googleフォーム等）のURLを入力すると申し込むボタンが表示されます。</p>
                        <input type="url" name="applicationUrl" placeholder="https://..." />
                    </div>
                    <div className={styles.formGroup}>
                        <ImageUploader name="qrImageUrl" label="QRコード画像（任意）" />
                        <p className={styles.hint} style={{ marginTop: '-1rem' }}>※スマホ等から読み取れるQRコード画像をアップロードします。</p>
                    </div>
                    <div className={styles.formGroup}>
                        <ImageUploader name="pamphletUrl" label="パンフレット画像 または PDF（任意）" accept="image/*,application/pdf" />
                        <p className={styles.hint} style={{ marginTop: '-1rem' }}>※PDFファイルを選択するとプレビューに専用アイコンが表示されます。</p>
                    </div>
                    <button type="submit" className={styles.submitBtn}>追加する</button>
                </form>
            </div>

            <div className={styles.listContainer}>
                <h2>登録済みイベント一覧</h2>
                {events.length === 0 ? (
                    <p>登録されているイベントはありません。</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>開催日</th>
                                <th>タイトル</th>
                                <th>ステータス</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event: any) => (
                                <tr key={event.id}>
                                    <td>{event.date.toLocaleDateString('ja-JP')}</td>
                                    <td>{event.title}</td>
                                    <td>
                                        <span className={event.status === 'UPCOMING' ? styles.badgeUpcoming : styles.badgeArchived}>
                                            {event.status === 'UPCOMING' ? '開催予定' : 'アーカイブ'}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        {event.status === 'UPCOMING' && (
                                            <form action={archiveEvent} style={{ display: 'inline' }}>
                                                <input type="hidden" name="id" value={event.id} />
                                                <button type="submit" className={styles.actionBtn}>終了にする</button>
                                            </form>
                                        )}
                                        <form action={deleteEvent} style={{ display: 'inline' }}>
                                            <input type="hidden" name="id" value={event.id} />
                                            <button type="submit" className={styles.deleteBtn}>削除</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
