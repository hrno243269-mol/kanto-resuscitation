import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.info}>
                    <h2 className={styles.footerLogo}>関東蘇生アカデミー</h2>
                    <p>医療・教育・蘇生教育に関わる団体</p>
                </div>
                <div className={styles.contact}>
                    <p className={styles.contactTitle}>お問い合わせ（運営事務局）</p>
                    <a href="mailto:info@example.com" className={styles.email}>info@example.com</a>
                </div>
            </div>
            <div className={styles.copy}>
                <p>
                    <a href="/admin/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                        &copy; {new Date().getFullYear()} Kanto Resuscitation Academy. All Rights Reserved.
                    </a>
                </p>
            </div>
        </footer>
    )
}
