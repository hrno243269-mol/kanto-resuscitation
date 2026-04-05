import styles from './page.module.css'
import { prisma } from '@/lib/prisma'

export default async function OrganizationPage() {
    const contents = await prisma.pageContent.findMany({
        where: { pageKey: 'organization' }
    })
    const getVal = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.body || d
    const getImg = (k: string, d: string) => contents.find((c: any) => c.sectionKey === k)?.imageUrl || d

    const body = getVal('body', '当アカデミーは以下の組織体制で運営されています。')
    const imageUrl = getImg('image', 'https://images.unsplash.com/photo-1531206715516-11f3b146f6b5?auto=format&fit=crop&q=80&w=800')

    return (
        <div className={`container ${styles.page}`}>
            <h1 className={styles.pageTitle}>組織図</h1>

            <div className={styles.orgContent}>
                <p className={styles.lead}>
                    {body.split('\n').map((line: string, i: number) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </p>

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
