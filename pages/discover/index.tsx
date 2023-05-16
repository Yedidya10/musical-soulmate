import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../types/page'

import styles from './Discover.module.scss'

export interface IDiscover {
  sampleTextProp: string
}

const Discover: NextPageWithLayout<IDiscover> = ({
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

export default Discover

Discover.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Discover Page">{page}</PrimaryLayout>
}
