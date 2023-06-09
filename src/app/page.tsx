import 'server-only'
import { cookies } from 'next/headers'
import { getReadonlySession } from '@/lib/session'

export const revalidate = 0

const getServerSession = async () => {
  const session = await getReadonlySession(cookies())

  return session
}

export default async function Page() {
  const { address } = await getServerSession()
  return (
    <div className="container">
      address: {address}
      {address ? '✅ has SignIn' : '❌ not SignIn'}
    </div>
  )
}
