import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { gql, useMutation } from '@apollo/client'
import type { Subscriber } from '@prisma/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import styles from './ComingSoon.module.scss'

import Subscribe from '../../components/forms/subscribe/Subscribe'
import LpSlider from '../../components/LpSlider/LpSlider'
import { useEffect } from 'react'

export interface IComingSoon {
  sampleTextProp: string
}

const SubscriberMutation = gql`
  mutation Subscriber($email: String!) {
    createSubscriber(
      data: { email: $email, language: $language, country: $country }
    ) {
      id
      email
      language
      country
    }
  }
`
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['comingSoon', 'common'])),
    },
  }
}

const ComingSoon: React.FC<IComingSoon> = ({ sampleTextProp }) => {
  const { locale, locales, push } = useRouter()
  // const cleanPath = asPath.split('#')[0].split('?')[0];
  const { t } = useTranslation()

  const [createSubscriber, { data, loading, error }] =
    useMutation(SubscriberMutation)

  if (loading) return <p>Submitting...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createSubscriber({
      variables: {
        email: e.currentTarget.email.value,
        language: `${locale}`,
        country: `${locale}`,
      },
    })
  }

  const dir = () => {
    if (
      locale !== undefined &&
      ['ar', 'arc', 'az', 'dv', 'ku', 'ckb', 'ur', 'he', 'fa'].includes(locale)
    ) {
      return 'rtl'
    } else {
      return 'ltr'
    }
  }

  return (
    <>
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="coming soon landing page" />
      </Head>
      <main className={styles.main}>
        <p>{sampleTextProp}</p>
        <div className={styles.slider}>
          <LpSlider
            dir={dir()}
            splideAriaLabel={t('comingSoon:sliderAriaLabel')}
            slide1ImageAlt={t('comingSoon:slide1ImageAlt')}
            slide1Title={t('comingSoon:slide1Title')}
            slide1Description={t('comingSoon:slide1Description')}
            slide2ImageAlt={t('comingSoon:slide2ImageAlt')}
            slide2Title={t('comingSoon:slide2Title')}
            slide2Description={t('comingSoon:slide2Description')}
            slide3ImageAlt={t('comingSoon:slide3ImageAlt')}
            slide3Title={t('comingSoon:slide3Title')}
            slide3Description={t('comingSoon:slide3Description')}
          />
        </div>
        <div className={styles.subscribe}>
          <Subscribe
            labelText={t('comingSoon:labelText')}
            emailPlaceholder={t('comingSoon:emailPlaceholder')}
            submitButtonText={t('common:send')}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
    </>
  )
}

export default ComingSoon
