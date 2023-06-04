import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../types/page'

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
