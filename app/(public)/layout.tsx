import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import { prisma } from '@/lib/prisma'

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const settings = await prisma.siteSetting.findMany()
    const getValue = (key: string, defaultVal: string) => {
        const s = settings.find((s: any) => s.key === key)
        return s ? s.value : defaultVal
    }

    const primary = getValue('colorPrimary', '#1e3a8a')
    const secondary = getValue('colorSecondary', '#3b82f6')
    const accent = getValue('colorAccent', '#0ca678')

    const fontFam = getValue('fontFamily', "'Noto Sans JP', sans-serif")
    const baseSize = getValue('baseFontSize', '16')
    const titleSize = getValue('titleFontSize', '42')

    return (
        <div className="public-layout-wrapper">
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;700&display=swap');

        :root {
          --color-primary: ${primary};
          --color-secondary: ${secondary};
          --color-accent: ${accent};
        }

        /* カスタムフォントとサイズの強制上書き（CSS Modulesへのパッチ） */
        body {
          font-family: ${fontFam} !important;
          font-size: ${baseSize}px !important;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: ${fontFam} !important;
        }

        h1, [class*="heroTitle"], [class*="pageTitle"] {
          font-size: ${titleSize}px !important;
        }

        h2, [class*="sectionTitle"] {
          font-size: ${Math.round(Number(titleSize) * 0.75)}px !important;
        }

        h3 {
          font-size: ${Math.round(Number(titleSize) * 0.55)}px !important;
        }
      `}} />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
