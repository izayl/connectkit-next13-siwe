type SessionConfig = {
  cookieName: string
  cookieOptions: {}
  password: string
}

export const sessionConfig: SessionConfig = {
  cookieName: 'connectkit-next-siwe',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60,
    path: '/',
  },
  password: process.env.SESSION_SECRET ?? '',
}
