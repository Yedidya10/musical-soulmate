// import { useState } from 'react'
// import { useRouter } from 'next/router'

import styles from './SpotifyLogin.module.scss'

export interface ISpotifyLogin {
  buttonText: string
}

const SpotifyLogin: React.FC<ISpotifyLogin> = ({ buttonText }) => {
  // const [authUrl, setAuthUrl] = useState('')

  // Fetches the Spotify authorization URL from your server
  // const getAuthUrl = async () => {
  //   const res = await fetch('/api/spotify-auth-url')
  //   const data = await res.json()
  //   setAuthUrl(data.authUrl)
  // }

  // Redirects the user to the Spotify authorization page


  // Renders the Spotify login button
  return <button className={styles.button} >{buttonText}</button>
}

export default SpotifyLogin