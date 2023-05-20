import LpSlider from '../../components/LpSlider/LpSlider'
import Subscribe from '../../components/forms/subscribe/Subscribe'
import SignIn from '../../components/signIn/SignIn'
import apolloClient from '../../lib/apolloClient'
import { gql, useMutation } from '@apollo/client'
import { getProviders, signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styles from './ComingSoon.module.scss'

export interface IComingSoon {
  providers: object
}

// Define a GraphQL mutation that create a new subscriber
const CREATE_SUBSCRIBER = gql`
  mutation createSubscriber(
    $email: String!
    $language: String!
    $country: String!
  ) {
    addSubscriber(
      input: { email: $email, language: $language, country: $country }
    ) {
      email
      language
      country
    }
  }
`

export async function getServerSideProps({ locale }: { locale: string }) {
  try {
    const providers = await getProviders()

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'comingSoon',
          'common',
          'countries',
        ])),
        providers,
      },
    }
  } catch (error) {
    console.error('Error fetching providers:', error)
  }
}

const ComingSoon: React.FC<IComingSoon> = ({ providers }) => {
  const [emailValue, setEmailValue] = useState('')
  const [countryValue, setCountryValue] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [htmlDir, setHtmlDir] = useState('')

  const formRef = useRef();

  const { locale } = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    if (
      locale !== undefined &&
      ['ar', 'arc', 'az', 'dv', 'ku', 'ckb', 'ur', 'he', 'fa'].includes(locale)
    ) {
      setHtmlDir('rtl')
    } else {
      setHtmlDir('ltr')
    }
  }, [locale])

  //useMutation Hook
  const [createSubscriberMutation, { data, loading }] = useMutation(
    CREATE_SUBSCRIBER,
    {
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
        setEmailValue('')
        setCountryValue('')
      },
      onError(error) {
        console.error('Failed to create subscriber', error)
      },
    }
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      // converting form data to json
      const formData = new FormData(e.target as HTMLFormElement)
      const object: { [x: string]: string | File } = {}
      formData.forEach(function (value, key) {
        object[key] = value
      })
      const json = { ...object, language: locale }

      // calling createSubscribeMutation
      createSubscriberMutation({ variables: json })
        .then((d) => {
          setIsSubmitted(true)
        })
        .catch((err) => {
          console.log(err)
        })

  

    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="coming soon landing page" />
      </Head>
      <main className={styles.main}>
        <div className={styles.slider}>
          <LpSlider
            dir={htmlDir}
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
        <Subscribe
          subscribeTitle={t('comingSoon:subscribeTitle')}
          emailLabelText={t('comingSoon:emailLabel')}
          countryLabelText={t('comingSoon:countryLabel')}
          emailPlaceholder="example@example.com"
          countryPlaceholder={t('comingSoon:countryPlaceholder')}
          countryRequiredErrorText={t('comingSoon:countryRequiredErrorText')}
          emailRequiredErrorText={t('comingSoon:emailRequiredErrorText')}
          submitButtonText={t('common:subscribe')}
          registrarSuccessText={t('comingSoon:registration-was-successful')}
          isSubmitted={isSubmitted}
          emailValue={emailValue}
          countryValue={countryValue}
          handleSubmit={handleSubmit}
          setEmail={setEmailValue}
          setCountry={setCountryValue}
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {/* <SignIn
            providersLoginText={t('comingSoon:providersLogin')}
            providers={providers}
            signIn={signIn}
          /> */}
      </main>
    </>
  )
}

export default ComingSoon
