import { getSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request.cookies)
    const { address, chainId } = session

    return NextResponse.json({ address, chainId })
  } catch (error) {
    return new Response(String(error), { status: 500 })
  }
}
