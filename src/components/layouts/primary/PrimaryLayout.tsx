import Head from 'next/head'
import Footer from '../../navigation/footer/Footer'
import Header from '../../navigation/header/Header'
import Box from '@mui/material/Box'
import MusicPlayer from '../../musicPlayer/MusicPlayer'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  headTitle: string
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ headTitle, children }) => {
  const [client, setClient] = useState(false)
  const { locale } = useRouter()

  useEffect(() => {
    if (locale !== undefined) {
      setClient(true)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="description" content="Musical Soulmate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{headTitle}</title>
      </Head>
      <Header />
      <Box component={'main'}>{children}</Box>
      {client && <MusicPlayer />}
      <Footer />
    </>
  )
}

export default PrimaryLayout
