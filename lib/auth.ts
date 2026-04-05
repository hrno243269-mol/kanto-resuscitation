import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_for_development_only_replace_in_production'
const key = new TextEncoder().encode(secretKey)

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(key)
}

export async function verifyToken(input: string) {
    try {
        const { payload } = await jwtVerify(input, key)
        return payload
    } catch (error) {
        return null
    }
}
