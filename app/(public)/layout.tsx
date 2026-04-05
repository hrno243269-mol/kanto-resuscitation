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

  const headerLogo = getValue('headerLogo', '')
  const headerTitle = getValue('headerTitle', '関東蘇生アカデミー')

  const footerTitle = getValue('footerTitle', '関東蘇生アカデミー')
  const footerDesc = getValue('footerDesc', '医療・教育・蘇生教育に関わる団体')
  const contactEmail = getValue('contactEmail', 'info@example.com')
  const copyright = getValue('copyright', 'Kanto Resuscitation Academy')

  return (
    <div className="public-layout-wrapper">
      <Header logo={headerLogo} title={headerTitle} />
      <main>{children}</main>
      <Footer title={footerTitle} desc={footerDesc} email={contactEmail} copyright={copyright} />
    </div>
  )
}
