import styles from './Footer.module.css'

export default function Footer({ title, desc, email, copyright }: any) {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.info}>
                    <h2 className={styles.footerLogo}>{title}</h2>
                    <p style={{ whiteSpace: 'pre-line' }}>{desc}</p>
                </div>
                <div className={styles.contact}>
                    <p className={styles.contactTitle}>お問い合わせ（運営事務局）</p>
                    <a href={`mailto:${email}`} className={styles.email}>{email}</a>
                </div>
            </div>
            <div className={styles.copy}>
                <p>
                    <a href="/admin/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                        &copy; {new Date().getFullYear()} {copyright}. All Rights Reserved.
                    </a>
                </p>
            </div>
        </footer>
    )
}
