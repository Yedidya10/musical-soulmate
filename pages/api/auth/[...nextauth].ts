import NextAuth, { NextAuthOptions } from 'next-auth'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
// import AppleProvider from 'next-auth/providers/apple'
import SpotifyProvider from 'next-auth/providers/spotify'
// import GoogleProvider from 'next-auth/providers/google'
import spotifyApi, { SPOTIFY_LOGIN_URL } from '../../../lib/spotify'
import jwt from 'jsonwebtoken'

const { SPOTIFY_CLIENT_ID = '', SPOTIFY_CLIENT_SECRET = '' } = process.env

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshToken } = await spotifyApi.refreshAccessToken()
    console.log('REFRESHED TOKEN', refreshToken)

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000, // =  1 hour in ms

      // If a value is set, a new refresh token will be generated when the access token is refreshed.
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization: SPOTIFY_LOGIN_URL,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET,
    //   //authorization
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   //authorization
    // }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : undefined,
          // convert to ms
        }
      }

      // Return the token if the access token has not expired yet
      if (
        typeof token.accessTokenExpires === 'number' &&
        Date.now() < token.accessTokenExpires
      ) {
        console.log('TOKEN NOT EXPIRED')
        return token
      }

      // If the access token has expired, refresh it
      console.log('TOKEN EXPIRED')
      return await refreshAccessToken(token)
    },
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }),
}

export default NextAuth(authOptions)
