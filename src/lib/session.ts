import { sessionConfig } from '@/config/session'
import {
  IronSession,
  IronSessionData,
  sealData,
  unsealData,
} from 'iron-session'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import type {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies'

type passwordsMap = { [id: string]: string }
type password = string | passwordsMap
type NextSIWESession<TSessionData extends Object = {}> = IronSession &
  TSessionData & {
    nonce?: string
    address?: string
    chainId?: number
    getSeal: () => Promise<string>
  }

function normalizeStringPasswordToMap(password: password) {
  return typeof password === 'string' ? { 1: password } : password
}

export const getReadonlySession = async (
  cookies: ReadonlyRequestCookies | RequestCookies | ResponseCookies
) => {
  const passwordsAsMap = normalizeStringPasswordToMap(sessionConfig.password)
  const sealFromCookies = cookies.get(sessionConfig.cookieName)

  const session =
    sealFromCookies === undefined
      ? {}
      : await unsealData<IronSessionData>(sealFromCookies.value, {
          password: passwordsAsMap,
        })

  return session as NextSIWESession
}

export const getSession = async (cookies: ResponseCookies | RequestCookies) => {
  const passwordsAsMap = normalizeStringPasswordToMap(sessionConfig.password)
  const session = await getReadonlySession(cookies)

  Object.defineProperties(session, {
    getSeal: {
      value: async function save() {
        const seal = await sealData(session, {
          password: passwordsAsMap,
        })

        return seal
      },
    },
    destroy: {
      value: function destroy() {
        Object.keys(session).forEach(key => {
          // @ts-ignore See comment on the IronSessionData interface
          delete session[key]
        })

        cookies.set({
          name: sessionConfig.cookieName,
          value: '',
          maxAge: 0,
        })
      },
    },
  })

  return session as NextSIWESession
}
