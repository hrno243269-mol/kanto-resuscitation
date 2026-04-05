'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateTopPage(formData: FormData) {
    const updates = [
        { key: 'philosophy', body: formData.get('philosophy') as string },
        { key: 'catchcopy', body: formData.get('catchcopy') as string },
        { key: 'instagramUrl', body: formData.get('instagramUrl') as string },
        { key: 'facebookUrl', body: formData.get('facebookUrl') as string }
    ]

    for (const u of updates) {
        if (u.body !== null && u.body !== undefined) {
            await prisma.pageContent.upsert({
                where: { pageKey_sectionKey: { pageKey: 'top', sectionKey: u.key } },
                update: { body: u.body },
                create: { pageKey: 'top', sectionKey: u.key, body: u.body }
            })
        }
    }

    const heroImageVal = formData.get('heroImage') as string
    if (heroImageVal) {
        await prisma.pageContent.upsert({
            where: { pageKey_sectionKey: { pageKey: 'top', sectionKey: 'heroImage' } },
            update: { imageUrl: heroImageVal },
            create: { pageKey: 'top', sectionKey: 'heroImage', imageUrl: heroImageVal }
        })
    }
    revalidatePath('/admin/top')
    revalidatePath('/')
}

export async function updatePages(formData: FormData) {
    const fields = [
        { p: 'greeting', s: 'title', b: formData.get('greetingTitle') as string },
        { p: 'greeting', s: 'body', b: formData.get('greetingBody') as string },
        { p: 'greeting', s: 'signature', b: formData.get('greetingSignature') as string },
        { p: 'greeting', s: 'photo', i: formData.get('greetingPhoto') as string },
        { p: 'organization', s: 'body', b: formData.get('orgBody') as string },
        { p: 'organization', s: 'image', i: formData.get('orgImage') as string },
    ]

    for (const f of fields) {
        if ((f.b !== null && f.b !== undefined) || (f.i !== null && f.i !== undefined)) {
            await prisma.pageContent.upsert({
                where: { pageKey_sectionKey: { pageKey: f.p, sectionKey: f.s } },
                update: { body: f.b ?? '', imageUrl: f.i ?? '' },
                create: { pageKey: f.p, sectionKey: f.s, body: f.b ?? '', imageUrl: f.i ?? '' }
            })
        }
    }

    revalidatePath('/admin/pages')
    revalidatePath('/greeting')
    revalidatePath('/organization')
}

export async function updateSettings(formData: FormData) {
    const keys = [
        'contactName', 'contactEmail', 'colorPrimary', 'colorSecondary', 'colorAccent',
        'fontFamily', 'baseFontSize', 'titleFontSize',
        'headerTitle', 'footerTitle', 'footerDesc', 'copyright', 'siteDescription'
    ]

    for (const key of keys) {
        const val = formData.get(key) as string
        if (val !== null && val !== undefined) {
            await prisma.siteSetting.upsert({
                where: { key },
                update: { value: val },
                create: { key, value: val }
            })
        }
    }

    const headerLogo = formData.get('headerLogo') as string
    if (headerLogo !== null && headerLogo !== undefined) {
        await prisma.siteSetting.upsert({
            where: { key: 'headerLogo' },
            update: { value: headerLogo },
            create: { key: 'headerLogo', value: headerLogo }
        })
    }

    revalidatePath('/admin/settings')
    revalidatePath('/', 'layout')
}
