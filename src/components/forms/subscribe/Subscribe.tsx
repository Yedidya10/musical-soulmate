'use client'

// Subscribe.tsx
import useHtmlDir from '../../../lib/hooks/useHtmlDir'
import countriesData, {
  CountryDataType,
} from '../../../lib/utils/countriesData'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './Subscribe.module.scss'

export interface ISubscribe {
  subscribeTitle: string
  emailLabelText: string
  countryLabelText: string
  emailPlaceholder: string
  countryPlaceholder: string
  emailValue: string
  countryValue: string
  submitButtonText: string
  countryRequiredErrorText: string
  emailRequiredErrorText: string
  setCountry: React.Dispatch<SetStateAction<string>>
  setEmail: React.Dispatch<SetStateAction<string>>
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSubmitted: boolean
}

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

function validateEmail(
  email: string,
  invalidMessage: string,
  requiredMessage: string
): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return requiredMessage
  } else if (!emailRegex.test(email)) {
    return invalidMessage
  }
  return ''
}

function validateCountry(country: string, message: string): string {
  if (!country) {
    return message
  }
  return ''
}

const Subscribe: React.FC<ISubscribe> = ({
  subscribeTitle,
  emailLabelText,
  countryLabelText,
  emailPlaceholder,
  countryPlaceholder,
  countryRequiredErrorText,
  emailRequiredErrorText,
  emailValue,
  countryValue,
  submitButtonText,
  setEmail,
  setCountry,
  handleSubmit,
  isSubmitted,
}) => {
  const { locale } = useRouter()
  const [countries, setCountries] = useState<CountryDataType[]>([])
  const [emailError, setEmailError] = useState<string>('')
  const [countryError, setCountryError] = useState<string>('')

  const emailTimeoutRef = useRef<NodeJS.Timeout>()
  const countryTimeoutRef = useRef<NodeJS.Timeout>()

  const dir = useHtmlDir()

  useEffect(() => {
    setCountries(countriesData(locale || 'en'))
    // Clear timeouts on component unmount
    clearTimeout(emailTimeoutRef.current)
    clearTimeout(countryTimeoutRef.current)
  }, [locale])

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    setEmail(email)

    if (event.target.validity.typeMismatch) {
      const error = validateEmail(
        email,
        event.target.validationMessage,
        emailRequiredErrorText
      )
      setEmailError(error)
    } else {
      setEmailError('')
    }
  }

  const handleCountryChange = (
    event: React.ChangeEvent<{}>,
    value: CountryDataType | null
  ) => {
    const country = value?.label ?? ''
    setCountry(country)
    const error = validateCountry(country, countryRequiredErrorText)
    setCountryError(error)
  }

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value
    if (email === '') {
      emailTimeoutRef.current = setTimeout(() => {
        setEmailError('')
      }, 3000)
    }
  }

  const handleCountryBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const country = event.target.value
    if (country === '') {
      countryTimeoutRef.current = setTimeout(() => {
        setCountryError('')
      }, 3000)
    }
  }

  const form = (
    <form className={styles.form} name="subscribe" onSubmit={handleSubmit}>
      <Typography variant="h3" className={styles.title}>
        {subscribeTitle}
      </Typography>
      <Box component="div" className={styles.formWrapper}>
        <Box component="div" className={styles.inputWrapper}>
          <TextField
            className={styles.input}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '100vw',
              },
            }}
            id="email"
            name="email"
            type="email"
            label={emailLabelText}
            placeholder={emailPlaceholder}
            value={emailValue}
            error={Boolean(emailError)}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
          />
          {emailError && (
            <Typography
              variant="caption"
              color="error"
              className={styles.inputError}
            >
              {emailError}
            </Typography>
          )}
        </Box>
        <Box component="div" className={styles.inputWrapper}>
          <Autocomplete
            className={styles.autocomplete}
            id="country-select"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '100vw',
              },
            }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label ?? ''}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Image
                  loading="lazy"
                  width={20}
                  height={15}
                  src={`https://flagcdn.com/${option.code.toLowerCase()}.svg`}
                  quality={100}
                  alt={option.label ?? ''}
                />
                <Typography sx={{ marginInlineStart: '10px' }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                className={styles.autocompleteInput}
                {...params}
                label={countryLabelText}
                placeholder={countryPlaceholder}
                value={countryValue}
                name="country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'off', // Disable autocomplete and autofill
                  'aria-autocomplete': 'none', // Assistive technology attribute for autocomplete
                }}
                required
              />
            )}
            onChange={handleCountryChange}
            onBlur={handleCountryBlur}
          />
          {countryError && (
            <Typography
              variant="caption"
              color="error"
              className={styles.inputError}
            >
              {countryError}
            </Typography>
          )}
        </Box>
        <Button
          className={styles.button}
          variant="contained"
          type="submit"
          name="submit"
          value="submit"
        >
          {submitButtonText}
        </Button>
      </Box>
    </form>
  )

  return (
    <>
      {dir === 'rtl' ? (
        <CacheProvider value={cacheRtl}>{form}</CacheProvider>
      ) : (
        form
      )}
    </>
  )
}

export default Subscribe
