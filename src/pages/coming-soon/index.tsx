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
import { CacheProvider } from '@emotion/react'
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'

export interface IComingSoon {
  providers: object
}

export interface SnackbarInterface extends SnackbarOrigin {
  open: boolean
}

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

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
          'form',
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

  const { locale } = useRouter()
  const { t } = useTranslation()

  const [snackbarSucceeded, setSnackbarSucceeded] = useState<SnackbarInterface>(
    {
      open: false,
      vertical: 'top',
      horizontal: 'center',
    }
  )


  const [snackbarFailed, setSnackbarFailed] = useState<SnackbarInterface>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })

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
      try {
        await createSubscriberMutation({ variables: json })
        setIsSubmitted(true)
        setSnackbarSucceeded({ ...snackbarSucceeded, open: true })
      } catch (error) {
        console.log(error)
        setSnackbarFailed({ ...snackbarFailed, open: true })
      }
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
          subscribeTitle={t('form:subscribeTitle')}
          emailLabelText={t('form:emailLabel')}
          countryLabelText={t('form:countryLabel')}
          emailPlaceholder="example@example.com"
          countryPlaceholder={t('form:countryPlaceholder')}
          countryRequiredErrorText={t('form:countryRequiredErrorText')}
          emailRequiredErrorText={t('form:emailRequiredErrorText')}
          submitButtonText={t('form:subscribe')}
          isSubmitted={isSubmitted}
          emailValue={emailValue}
          countryValue={countryValue}
          handleSubmit={handleSubmit}
          setEmail={setEmailValue}
          setCountry={setCountryValue}
        />
        <CacheProvider value={cacheRtl}>
          <Snackbar
            open={snackbarFailed.open}
            autoHideDuration={6000}
            onClose={() =>
              setSnackbarFailed({ ...snackbarFailed, open: false })
            }
            key={snackbarFailed.vertical + snackbarFailed.horizontal}
            anchorOrigin={{
              vertical: snackbarFailed.vertical,
              horizontal: snackbarFailed.horizontal,
            }}
          >
            <Alert
              onClose={() =>
                setSnackbarFailed({ ...snackbarFailed, open: false })
              }
              severity="error"
              sx={{ width: '100%' }}
            >
              {t('form:the-registration-attempt-failed')}{' '}
              {t('form:please-try-again-later')}
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarSucceeded.open}
            autoHideDuration={6000}
            onClose={() =>
              setSnackbarSucceeded({ ...snackbarSucceeded, open: false })
            }
            key={ snackbarSucceeded.vertical + snackbarSucceeded.horizontal}
            anchorOrigin={{
              vertical: snackbarSucceeded.vertical,
              horizontal: snackbarSucceeded.horizontal,
            }}
          >
            <Alert
              onClose={() =>
                setSnackbarSucceeded({ ...snackbarSucceeded, open: false })
              }
              severity="success"
              sx={{ width: '100%' }}
            >
              {t('form:registration-was-successful ')}
            </Alert>
          </Snackbar>
        </CacheProvider>
        {/* <SignIn
          providersLoginText={t('comingSoon:continue-with')}
          snackbarFailText={t('form:the-registration-attempt-failed')}
          tryAgainText={t('form:please-try-again-later')}
          providers={providers}
          signIn={signIn}
        /> */}
      </main>
    </>
  )
}

export default ComingSoon
