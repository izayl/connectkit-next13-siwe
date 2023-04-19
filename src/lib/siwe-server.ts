'use client'
import { sessionConfig } from '@/config/session'
import { configureServerSideSIWE } from 'connectkit-next-siwe'

export const siweServer = configureServerSideSIWE({
  session: sessionConfig,
})
