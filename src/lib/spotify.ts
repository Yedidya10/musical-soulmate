import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-recently-played',
  'user-top-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-library-read',
].join(',')

const params = {
  scopes: scopes,
}

const queryParamString = new URLSearchParams(params).toString()

const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi

export { SPOTIFY_LOGIN_URL }