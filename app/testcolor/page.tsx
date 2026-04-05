import SettingsEditorClient from '../admin/(protected)/settings/SettingsEditorClient'

export default function TestColor() {
    const dummy = { colorPrimary: '#1e3a8a', colorSecondary: '#3b82f6', colorAccent: '#0ca678', headerTitle: 'Test', footerTitle: 'Test', footerDesc: 'desc', copyright: '2026' }
    return (
        <div style={{ padding: '2rem', height: '100vh', background: '#fff' }}>
            <SettingsEditorClient initialData={dummy} action={async () => { 'use server'; }} />
        </div>
    )
}
