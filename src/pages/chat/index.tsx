import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../lib/types/page'

import styles from './Chat.module.scss'

export interface IChat {
  sampleTextProp: string
}

const Chat: NextPageWithLayout<IChat> = ({ sampleTextProp }) => {
  return <p>{sampleTextProp}</p>
}

export default Chat

Chat.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Chat Page">{page}</PrimaryLayout>
}
