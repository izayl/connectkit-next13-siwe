import { NextRequest } from 'next/server'
import { SiweMessage } from 'siwe'
import { getSession } from '@/lib/session'
import { sessionConfig } from '@/config/session'
import cookie from 'cookie'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request.cookies)
    const { message, signature } = await request.json()
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.validate(signature)

    if (fields.nonce !== session.nonce) {
      return new Response('Invalid nonce', { status: 400 })
    }

    session.address = fields.address
    session.chainId = fields.chainId

    const seal = await session.getSeal()
    const cookieSession = cookie.serialize(sessionConfig.cookieName, seal, {
      ...sessionConfig.cookieOptions,
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
