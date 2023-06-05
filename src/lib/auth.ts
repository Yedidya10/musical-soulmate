import prismaClient from '@/src/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { SPOTIFY_LOGIN_URL } from './spotify/spotifyApi'
import { useRouter } from 'next/router'

// const prismaAdapter = PrismaAdapter(prismaClient)

// Check if the environment variables are set
function getCredentials(providerName: string) {
  const clientId = process.env[`${providerName}_CLIENT_ID`]
  const clientSecret = process.env[`${providerName}_CLIENT_SECRET`]

  if (!clientId || clientId.length === 0) {
    throw new Error(`Missing ${providerName}_CLIENT_ID`)
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error(`Missing ${providerName}_CLIENT_SECRET`)
  }

  return { clientId, clientSecret }
}

const authOptions: NextAuthOptions = {
  // adapter: prismaAdapter,
  // use jwt instead of database sessions to manage middleware more easily
  // session: {
  //   strategy: 'jwt',
  // },
  pages: {
    signIn: '/welcome',
  },
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: getCredentials('SPOTIFY').clientId,
      clientSecret: getCredentials('SPOTIFY').clientSecret,
      authorization: SPOTIFY_LOGIN_URL,
    }),
    GoogleProvider({
      clientId: getCredentials('GOOGLE').clientId,
      clientSecret: getCredentials('GOOGLE').clientSecret,
      authorization: {
        params: {
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
          ].join(' '),
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: user.email,
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
      if (token) {
        session.user.id = token.id
        session.user.accessToken = token.accessToken as string
        session.user.refreshToken = token.refreshToken as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    redirect() {
      return '/'
    },
  },
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

export default authOptions
