import { getSession } from '@/lib/session'
import { NextRequest } from 'next/server'
import { generateNonce } from 'siwe'
import cookie from 'cookie'
import { sessionConfig } from '@/config/session'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request.cookies)
    if (!session.nonce) {
      session.nonce = generateNonce()
      const seal = await session.getSeal()
      const cookieSession = cookie.serialize(sessionConfig.cookieName, seal, {
        ...sessionConfig.cookieOptions,
      })

      return new Response(session.nonce, {
        status: 200,
        headers: {
          'Set-Cookie': cookieSession,
        },
      })
    }
    return new Response(session.nonce, { status: 200 })
  } catch (error) {
    return new Response(String(error), { status: 500 })
  }
}
