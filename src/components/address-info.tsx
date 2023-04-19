import 'server-only'
import { cookies } from 'next/headers'
import { getReadonlySession } from '@/lib/session'

export const revalidate = 0

const getServerSession = async () => {
  const session = await getReadonlySession(cookies())

  return session
}

export  const AddressInfo = async  () =>  {
  const { address } = await getServerSession()
  return (
    <>
      address: {address}
      {address ? '✅ has Login' : '❌ not Login'}
    </>
  )
}
