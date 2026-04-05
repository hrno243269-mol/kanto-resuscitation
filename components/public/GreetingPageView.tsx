import React from 'react'
import styles from '@/app/(public)/greeting/page.module.css'

interface GreetingPageViewProps {
    title: string
    body: string
    signatureText: string
    photoUrl: string
}

export default function GreetingPageView({
    title,
    body,
    signatureText,
    photoUrl
}: GreetingPageViewProps) {
    return (
        <div className={`container ${styles.page}`}>
            <h1 className={styles.pageTitle}>会長挨拶</h1>
            <div className={styles.greetingLayout}>
                <div className={styles.greetingImage}>
                    <img src={photoUrl} alt="会長の写真" />
                </div>
                <div className={styles.greetingText}>
                    <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: title }} style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }} />
                    <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: body }} />
                    <div className={`${styles.signature} rich-text-content`} dangerouslySetInnerHTML={{ __html: signatureText }} />
                </div>
            </div>
        </div>
    )
}
