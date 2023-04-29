import { SetStateAction } from 'react'
import styles from './Subscribe.module.scss'

export interface ISubscribe {
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

const Subscribe: React.FC<ISubscribe> = ({
  emailLabelText,
  countryLabelText,
  emailPlaceholder,
  countryPlaceholder,
  emailValue,
  countryValue,
  submitButtonText,
  setEmail,
  setCountry,
  handleSubmit,
}) => {
  return (
    <form className={styles.form} name="subscribe" onSubmit={handleSubmit}>
      <label className={styles.label}>
        {emailLabelText}
        <input
          dir='ltr'
          className={styles.input}
          type="email"
          name="email"
          value={emailValue}
          required
          placeholder={emailPlaceholder}
          onChange={(e) => {setEmail(e.target.value)}}
        />
      </label>
      {/* Added language field */}
      <label className={styles.label}>
        Language
        <input
          dir='ltr'
          className={styles.input}
          type="text"
          name="language"
          required
        />
      </label>
      <label className={styles.label}>
        {countryLabelText}
        <input
          className={styles.input}
          type="text"
          name="country"
          value={countryValue}
          required
          placeholder={countryPlaceholder}
          onChange={(e) => {setCountry(e.target.value)}}
        />
      </label>
      <button
        className={styles.button}
        type="submit"
        name="submit"
        value="submit"
      >
        {submitButtonText}
      </button>
    </form>
  )
}

export default Subscribe
