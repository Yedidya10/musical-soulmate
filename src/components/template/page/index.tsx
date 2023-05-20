import PrimaryLayout from '../../layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../../lib/types/page'

import styles from './PageTemplate.module.scss'

export interface IPageTemplate {
  sampleTextProp: string
}

const PageTemplate: NextPageWithLayout<IPageTemplate> = ({
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

export default PageTemplate

PageTemplate.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Page Template">{page}</PrimaryLayout>
}
