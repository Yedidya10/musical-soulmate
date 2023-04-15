import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { gql, useMutation } from '@apollo/client'
import apolloClient from '../../lib/apolloClient'
import type { Subscriber } from '@prisma/client'
import prisma from '../../lib/prisma'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import styles from './ComingSoon.module.scss'

import Subscribe from '../../components/forms/subscribe/Subscribe'
import LpSlider from '../../components/LpSlider/LpSlider'
import { useState } from 'react'

export interface IComingSoon {
  sampleTextProp: string
}

// Define a GraphQL mutation that create a new subscriber
const CREATE_SUBSCRIBER = gql`
  mutation createSubscriber(
    $email: String!
    $language: String!
    $country: String!
  ) {
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
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')
  const [country, setCountry] = useState('')

  const { locale, locales, push } = useRouter()
  const { t } = useTranslation()

  // const [createSubscriber, { data, loading, error }] =
  //   useMutation(CREATE_SUBSCRIBER)

  // if (loading) return <p>Submitting...</p>
  // if (error) return <p>Oh no... {error.message}</p>

  const [createSubscriber] = useMutation(CREATE_SUBSCRIBER, {
    client: apolloClient,
    update(cache, { data: { createSubscriber } }) {
      cache.modify({
        fields: {
          subscribers(existingSubscribers = []) {
            const newSubscriberRef = cache.writeFragment({
              data: createSubscriber,
              fragment: gql`
                fragment NewSubscriber on Subscriber {
                  id
                  email
                  language
                  country
                }
              `,
            })
            return [...existingSubscribers, newSubscriberRef]
          },
        },
      })
    },
    onCompleted() {
      setEmail('')
      setLanguage('')
      setCountry('')
    },
    onError(error) {
      console.error('Failed to create subscriber', error)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (locale !== undefined) {
      setLanguage(locale)
    }

    try {
      const { data } = await createSubscriber({
        variables: {
          email,
          language,
          country,
        },
      })
      console.log('Data:', data)
    } catch (error) {
      console.log('Error:', error)
    }
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
            emailLabelText={t('comingSoon:emailLabel')}
            countryLabelText={t('comingSoon:countryLabel')}
            emailPlaceholder="example@example.com"
            countryPlaceholder={t('comingSoon:countryPlaceholder')}
            submitButtonText={t('common:send')}
            emailValue={email}
            countryValue={country}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            setCountry={setCountry}
          />
        </div>
      </main>
    </>
  )
}

export default ComingSoon
