import styles from './page.module.css'
import Link from 'next/link'

export default function AdminDashboard() {
    return (
        <div>
            <h1 className={styles.pageTitle}>ダッシュボード</h1>
            <p className={styles.welcomeText}>関東蘇生アカデミー管理システムへようこそ。</p>

            <div className={styles.grid}>
                <Link href="/admin/top" className={styles.cardLink}>
                    <div className={styles.card}>
                        <h2>TOPページ編集</h2>
                        <p>理念文などを更新します。</p>
                    </div>
                </Link>
                <Link href="/admin/pages" className={styles.cardLink}>
                    <div className={styles.card}>
                        <h2>各ページ編集</h2>
                        <p>会長挨拶などのテキストを差し替えます。</p>
                    </div>
                </Link>
                <Link href="/admin/events" className={styles.cardLink}>
                    <div className={styles.card}>
                        <h2>イベント管理</h2>
                        <p>新規追加や、終了したイベントの過去一覧移動等を行います。</p>
                    </div>
                </Link>
                <Link href="/admin/settings" className={styles.cardLink}>
                    <div className={styles.card}>
                        <h2>基本設定</h2>
                        <p>テーマカラーやメールアドレスを変更します。</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
