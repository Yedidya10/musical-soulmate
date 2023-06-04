import type { JWT } from 'next-auth/jwt'
import NextAuth, { DefaultSession } from 'next-auth'
import type { Session, User } from 'next-auth'

type UserId = string

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's primary key ID */
    id: UserId
    /** OpenID ID Token */
    idToken?: string

  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      id: UserId
      accessToken?: string
      refreshToken?: string
    }
  }
}
