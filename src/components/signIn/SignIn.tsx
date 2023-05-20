import { BsSpotify } from 'react-icons/bs' // import Spotify icon
import { AiFillGoogleCircle } from 'react-icons/ai' // import Google icon
import Button from '@mui/material/Button'

import styles from './SignIn.module.scss'

// Define the interface for the SignIn component
export interface ISignIn {
  providersLoginText: string
  providers: object
  signIn: any
}

// Define the SignIn component
const SignIn: React.FC<ISignIn> = ({
  providersLoginText, // Text to display before the provider name
  providers,
  signIn,
}) => {
  return (
    <ul className={styles.ul}>
      {/* Loop through the providers and display a button for each */}
      {providers &&
        Object.values(providers).map((provider: any) => (
          <li className={styles.li} key={provider.name}>
            <Button
              className={`${styles.button} ${
                provider.id === 'google' ? styles.secondary : ''
              }`}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              {/* Choose the icon based on the provider id */}
              {provider.id === 'spotify' ? (
                <BsSpotify />
              ) : provider.id === 'google' ? (
                <AiFillGoogleCircle />
              ) : null}
              {providersLoginText} {provider.name}
            </Button>
          </li>
        ))}
    </ul>
  )
}

export default SignIn
