'use client'

import { siweClient } from '@/lib/siwe-client'
import {
  ConnectKitButton,
  ConnectKitProvider,
  SIWESession,
  getDefaultClient,
} from 'connectkit'
import { useRouter } from 'next/navigation'
import { WagmiConfig, createClient, useDisconnect } from 'wagmi'

const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'ConnectKit-Next13-SIWE',
  })
)

export const WalletProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiConfig client={client}>
      <SiweClientProvider>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </SiweClientProvider>
    </WagmiConfig>
  )
}

const SiweClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const siweClientConfig = {
    enabled: true, // defaults true
    nonceRefetchInterval: 300_000, // in milliseconds, defaults to 5 minutes
    sessionRefetchInterval: 300_000, // in milliseconds, defaults to 5 minutes
    signOutOnDisconnect: true, // defaults true
    signOutOnAccountChange: true, // defaults true
    signOutOnNetworkChange: false, // defaults true
    onSignIn: (session?: SIWESession) => {
      console.log(session)
      // refresh to update server session
      router.refresh()
    },
    onSignOut: () => {
      console.log('sign out')
      disconnect()
      // refresh to update server session
      router.refresh()
    },
  }
  return (
    <siweClient.Provider {...siweClientConfig}>{children}</siweClient.Provider>
  )
}

export const ConnectWallet: React.FC = () => {
  return <ConnectKitButton />
}
