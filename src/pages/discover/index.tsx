import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../lib/types/page'

import styles from './Discover.module.scss'

export interface IDiscover {
  sampleTextProp: string
}

const Discover: NextPageWithLayout<IDiscover> = ({ sampleTextProp }) => {
  return <p>{sampleTextProp}</p>
}

export default Discover

Discover.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Discover Page">{page}</PrimaryLayout>
}
