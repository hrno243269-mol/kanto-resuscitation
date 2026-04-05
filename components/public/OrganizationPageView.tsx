import React from 'react'
import styles from '@/app/(public)/organization/page.module.css'

interface OrganizationPageViewProps {
    body: string
    imageUrl: string
}

export default function OrganizationPageView({
    body,
    imageUrl
}: OrganizationPageViewProps) {
    return (
        <div className={`container ${styles.page}`}>
            <h1 className={styles.pageTitle}>組織図</h1>

            <div className={styles.orgContent}>
                <div className={`${styles.lead} rich-text-content`} dangerouslySetInnerHTML={{ __html: body }} />

                <div className={styles.imageWrapper}>
                    <img
                        src={imageUrl}
                        alt="組織図"
                        className={styles.orgImage}
                    />
                </div>
            </div>
        </div>
    )
}
