import spotifyApi, { SPOTIFY_LOGIN_URL } from '@/lib/spotify'
import NextAuth, { NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID as string
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET as string

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: spotifyClientId,
      clientSecret: spotifyClientSecret,
      authorization: SPOTIFY_LOGIN_URL,
    }),
  ],
  pages: {
    signIn: '/coming-soon',
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
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
    async session({ session, token }) {
      // Add property to session, like an access_token from a provider.
      session.user.accessToken = token.accessToken as string
      session.user.refreshToken = token.refreshToken as string
      session.user.username = token.username as string

      return session
    },
  },
  // adapter: PrismaAdapter(prismaClient),
}

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

export default NextAuth(authOptions)
