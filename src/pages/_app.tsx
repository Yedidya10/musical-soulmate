import { ApolloProvider } from '@apollo/client'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import createEmotionCache from '../createEmotionCache'
import apolloClient from '../lib/apolloClient'
import '../styles/globals.scss'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'

import { NextPageWithLayout } from '../types/page'
import { ColorModeProvider } from '../reactContext/ColorModeProvider'

const clientSideEmotionCache = createEmotionCache()
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

  const mergedCache = createCache({
    ...emotionCache,
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  })

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={mergedCache}>
          <ColorModeProvider>
            <CssBaseline />
            <RecoilRoot>
              {getLayout(<Component {...pageProps} />)}
              <Analytics />
            </RecoilRoot>
          </ColorModeProvider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
