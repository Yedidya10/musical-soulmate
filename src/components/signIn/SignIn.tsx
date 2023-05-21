import { BsSpotify } from 'react-icons/bs' // import Spotify icon
import { AiFillGoogleCircle } from 'react-icons/ai' // import Google icon
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

import styles from './SignIn.module.scss'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { CacheProvider } from '@emotion/react'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

export interface SnackbarInterface extends SnackbarOrigin {
  open: boolean
}

// Define the interface for the SignIn component
export interface ISignIn {
  providersLoginText: string
  providers: object
  signIn: any
  snackbarFailText: string
  tryAgainText: string
}

// Define the SignIn component
const SignIn: React.FC<ISignIn> = ({
  providersLoginText, // Text to display before the provider name
  providers,
  signIn,
  snackbarFailText,
  tryAgainText
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = snackbar

  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  async function handleSignIn(provider: any, newSnackbar: SnackbarOrigin) {
    setLoadingProvider(provider.id)

    try {
      await signIn(provider.id, { callbackUrl: '/' })
      setSnackbar({ open: true, ...newSnackbar })
    } catch (error) {
      console.error('Error signing in:', error)
      setSnackbar({ open: true, ...newSnackbar })
    } finally {
      setLoadingProvider(null)
      setSnackbar({ ...snackbar, open: false })
    }
  }

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
              onClick={() =>
                handleSignIn(provider, {
                  vertical: 'top',
                  horizontal: 'center',
                })
              }
            >
              {/* Choose the icon based on the provider id */}
              {loadingProvider === provider.id ? (
                <CircularProgress size={20} color="inherit" />
              ) : provider.id === 'spotify' ? (
                <BsSpotify />
              ) : (
                <AiFillGoogleCircle />
              )}
              {providersLoginText} {provider.name}
            </Button>
            <CacheProvider value={cacheRtl}>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
              <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity="error"
                sx={{ width: '100%' }}
              >
                {snackbarFailText}, {tryAgainText}
              </Alert>
            </Snackbar>
          </CacheProvider>
          </li>
        ))}
    </ul>
  )
}

export default SignIn
