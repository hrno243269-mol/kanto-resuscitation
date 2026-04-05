import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerInner}`}>
                <div className={styles.logo}>
                    <Link href="/">関東蘇生アカデミー</Link>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/">TOP</Link></li>
                        <li><Link href="/greeting">会長挨拶</Link></li>
                        <li><Link href="/organization">組織図</Link></li>
                        <li><Link href="/archive">過去イベント</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
