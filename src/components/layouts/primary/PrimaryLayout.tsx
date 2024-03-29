import Head from 'next/head'
import Footer from '../../navigation/footer/Footer'
import Header from '../../navigation/header/Header'
import styles from './PrimaryLayout.module.scss'
import Box from '@mui/material/Box'
import MusicPlayer from '../../musicPlayer/MusicPlayer'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  headTitle: string
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ headTitle, children }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Musical Soulmate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{headTitle}</title>
      </Head>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '150vh',
        }}
      >
        <Header />
        <Box component={'main'} className={styles.main}>
          {children}
          { <MusicPlayer />}
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default PrimaryLayout
