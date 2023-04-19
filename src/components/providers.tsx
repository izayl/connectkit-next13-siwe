'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { WalletProvider } from './connect-wallet'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WalletProvider>{children}</WalletProvider>
    </ThemeProvider>
  )
}

export default Providers
