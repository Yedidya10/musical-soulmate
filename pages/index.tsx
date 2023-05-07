import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../types/page'

import styles from './Home.module.scss'

export interface IHome {
  sampleTextProp: string
}

const Home: NextPageWithLayout<IHome> = ({
  sampleTextProp,
}) => {
  return (
    <>
      <main className={styles.main}>
        <p>{sampleTextProp}</p>
      </main>
    </>
  )
}

export default Home

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Home Page">{page}</PrimaryLayout>
}
