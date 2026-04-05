'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signToken } from '@/lib/auth'

export async function loginAction(formData: FormData) {
    const password = formData.get('password') as string
    const adminPassword = process.env.ADMIN_PASSWORD || '0000' // デフォルトを0000に設定

    if (password === adminPassword) {
        const token = await signToken({ role: 'admin' })

        const cookieStore = await cookies()
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1日
            path: '/',
        })

        redirect('/admin')
    } else {
        redirect('/admin/login?error=1')
    }
}
