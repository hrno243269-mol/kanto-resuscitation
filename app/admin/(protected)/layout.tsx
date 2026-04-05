import Link from 'next/link'
import styles from './layout.module.css'

export default function ProtectedAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>関東蘇生アカデミー<br />管理システム</div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/admin">ダッシュボード</Link></li>
                        <li><Link href="/admin/top">TOPページ編集</Link></li>
                        <li><Link href="/admin/pages">各ページ編集</Link></li>
                        <li><Link href="/admin/events">イベント管理</Link></li>
                        <li><Link href="/admin/settings">基本設定</Link></li>
                        <li className={styles.publicLink}>
                            <Link href="/" target="_blank" rel="noopener noreferrer">サイトを確認する</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    )
}
