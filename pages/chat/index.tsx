import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../types/page'

import styles from './Chat.module.scss'

export interface IChat {
  sampleTextProp: string
}

const Chat: NextPageWithLayout<IChat> = ({ sampleTextProp }) => {
  return (
    <>
      <main className={styles.main}>
        <p>{sampleTextProp}</p>
      </main>
    </>
  )
}

export default Chat

Chat.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Chat Page">{page}</PrimaryLayout>
}
