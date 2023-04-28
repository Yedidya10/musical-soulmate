import Head from 'next/head'
import Footer from '../../navigation/footer/Footer'
import Header from '../../navigation/header/Header'
import styles from './PrimaryLayout.module.scss'

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
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default PrimaryLayout
