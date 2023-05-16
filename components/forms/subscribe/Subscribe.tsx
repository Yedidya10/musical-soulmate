import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { SetStateAction, useEffect, useState } from 'react'
import countriesData, { CountryDataType } from '@/utils/countriesData'
import useHtmlDir from '@/hooks/useHtmlDir'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import Image from 'next/image'
import styles from './Subscribe.module.scss'
import { useRouter } from 'next/router'
import { Typography, createTheme } from '@mui/material'

export interface ISubscribe {
  subscribeTitle: string
  emailLabelText: string
  countryLabelText: string
  emailPlaceholder: string
  countryPlaceholder: string
  emailValue: string
  countryValue: string
  submitButtonText: string
  setEmail: (e: SetStateAction<string>) => void
  setCountry: (e: SetStateAction<string>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
})

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

const Subscribe: React.FC<ISubscribe> = ({
  subscribeTitle,
  emailLabelText,
  countryLabelText,
  emailPlaceholder,
  countryPlaceholder,
  emailValue,
  submitButtonText,
  setEmail,
  handleSubmit,
}) => {
  const { locale } = useRouter()
  const [countries, setCountries] = useState<CountryDataType[]>([])

  useEffect(() => {
    if (locale !== undefined) {
      setCountries(countriesData(locale))
    }
  }, [locale])

  return (
    <CacheProvider value={cacheRtl}>
      <form className={styles.form} name="subscribe" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          {subscribeTitle}
        </Typography>
        <TextField
          sx={{ width: 400 }}
          label={emailLabelText}
          dir="ltr"
          className={styles.input}
          type="email"
          name="email"
          value={emailValue}
          required
          placeholder={emailPlaceholder}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <Autocomplete
          id="country-select"
          sx={{ width: 400 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label ?? ''}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <Image
                loading="lazy"
                width={20}
                height={15}
                src={`https://flagcdn.com/${option.code.toLowerCase()}.svg`}
                quality={100}
                alt={option.label ?? ''}
              />
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={countryLabelText}
              placeholder={countryPlaceholder}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              required
            />
          )}
        />

        <button
          className={styles.button}
          type="submit"
          name="submit"
          value="submit"
        >
          {submitButtonText}
        </button>
      </form>
    </CacheProvider>
  )
}

export default Subscribe
