import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { prisma } from '@/lib/prisma'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "関東蘇生アカデミー",
  description: "命を救うための心肺蘇生や一次救命処置の最新知識と技術を普及するアカデミー",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <style dangerouslySetInnerHTML={{
          __html: `
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;700&display=swap');

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
        <div style={{
          display: 'contents',
          '--color-primary': primary,
          '--color-secondary': secondary,
          '--color-accent': accent,
        } as React.CSSProperties}>
          {children}
        </div>
      </body>
    </html>
  );
}
