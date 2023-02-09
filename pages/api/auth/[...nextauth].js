import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { SPOTIFY_LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    console.log('REFRESHED TOKEN', refreshToken);

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000, // =  1 hour in ms

      // If a value is set, a new refresh token will be generated when the access token is refreshed.
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: SPOTIFY_LOGIN_URL,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET,
    //   //authorization
    // }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // convert to ms
        };
      }

      // Return the token if the access token has not expired yet
      if (token.accessTokenExpires && token.accessTokenExpires > Date.now()) {
        console.log('TOKEN NOT EXPIRED');
        return token;
      }

      // If the access token has expired, refresh it
      console.log('TOKEN EXPIRED');
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    }
  },
}

export default NextAuth(authOptions)