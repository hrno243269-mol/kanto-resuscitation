import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'ファイルが見つかりません。' }, { status: 400 });
        }

        // `public` アクセス権限で Vercel Blob へアップロード
        // アップロード時に一意な名前をつけるためタイムスタンプを付与
        const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
            access: 'public',
        });

        return NextResponse.json({ success: true, url: blob.url });
    } catch (error) {
        console.error('Vercel Blob Upload Error: ', error);
        return NextResponse.json({ error: 'アップロードに失敗しました。Vercel Blobの環境変数(TOKEN)が設定されているか確認してください。' }, { status: 500 });
    }
}
