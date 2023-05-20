import '../styles/globals.scss'
import { ApolloProvider } from '@apollo/client'
import { Inter } from '@next/font/google'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import apolloClient from '../lib/apolloClient'
import { NextPageWithLayout } from '../lib/types/page'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../createEmotionCache'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { RecoilRoot } from 'recoil'
import { Analytics } from '@vercel/analytics/react'

const clientSideEmotionCache = createEmotionCache()

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--inter-font',
// })

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: ReturnType<typeof createEmotionCache>
}

function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RecoilRoot>
              {getLayout(<Component {...pageProps} />)}
              <Analytics />
            </RecoilRoot>
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
