import { getSession } from '@/lib/session'
import { NextRequest } from 'next/server'
import cookie from 'cookie'
import { sessionConfig } from '@/config/session'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request.cookies)
    session.destroy()

    const cookieSession = cookie.serialize(sessionConfig.cookieName, '', {
      ...sessionConfig.cookieOptions,
      maxAge: 0,
    })

    return new Response('OK', {
      status: 200,
      headers: {
        'Set-Cookie': cookieSession,
      },
    })
  } catch (error) {
    return new Response(String(error), { status: 500 })
  }
}
