import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NextPageWithLayout } from './page'

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}
