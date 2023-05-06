import '@/styles/globals.scss'
import { ApolloProvider } from '@apollo/client'
import { Inter } from '@next/font/google'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import apolloClient from '../lib/apolloClient'
import { NextPageWithLayout } from '../types/page'




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
