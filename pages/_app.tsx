import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apolloClient'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

import { NextPageWithLayout } from './page'

import '@/styles/globals.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
})

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        {getLayout(
          <main className={inter.variable}>
            <Component {...pageProps} />
          </main>
        )}
      </ApolloProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
