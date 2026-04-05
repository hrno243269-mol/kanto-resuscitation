import { prisma } from '@/lib/prisma'
import { updateSettings } from '@/app/admin/actions'
import SettingsEditorClient from './SettingsEditorClient'

export default async function SettingsPage() {
    const settings = await prisma.siteSetting.findMany()

    const getValue = (key: string, defaultVal: string) => {
        const s = settings.find((s: any) => s.key === key)
        return s ? s.value : defaultVal
    }

    const initialData = {
        contactName: getValue('contactName', '運営事務局'),
        contactEmail: getValue('contactEmail', 'info@example.com'),
        colorPrimary: getValue('colorPrimary', '#1e3a8a'),
        colorSecondary: getValue('colorSecondary', '#3b82f6'),
        colorAccent: getValue('colorAccent', '#0ca678'),
        fontFamily: getValue('fontFamily', "'Noto Sans JP', sans-serif"),
        baseFontSize: getValue('baseFontSize', '16'),
        titleFontSize: getValue('titleFontSize', '42'),

        headerLogo: getValue('headerLogo', ''),
        headerTitle: getValue('headerTitle', '関東蘇生アカデミー'),
        footerTitle: getValue('footerTitle', '関東蘇生アカデミー'),
        footerDesc: getValue('footerDesc', '医療・教育・蘇生教育に関わる団体'),
        copyright: getValue('copyright', 'Kanto Resuscitation Academy')
    }

    return (
        <SettingsEditorClient initialData={initialData} action={updateSettings} />
    )
}
