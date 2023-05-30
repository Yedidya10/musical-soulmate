import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

function useSpotify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // If refresh access token fails, direct user to sign in page
      if (session && 'error' in session && session.error === 'RefreshAccessTokenError') {
        signIn()
      }

      if (session && session.user && session.user.accessToken) {
        spotifyApi.setAccessToken(session.user.accessToken)
      }
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
