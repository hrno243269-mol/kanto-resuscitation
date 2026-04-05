import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
        const token = request.cookies.get('admin_token')?.value
        const verified = token ? await verifyToken(token) : null

        if (!verified) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    if (path.startsWith('/admin/login')) {
        const token = request.cookies.get('admin_token')?.value
        const verified = token ? await verifyToken(token) : null

        if (verified) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
