import styles from './Subscribe.module.scss'

export interface ISubscribe {
  labelText: string
  emailPlaceholder: string
  submitButtonText: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Subscribe: React.FC<ISubscribe> = ({
  labelText,
  emailPlaceholder,
  submitButtonText,
  handleSubmit,
}) => {
  return (
    <form className={styles.form} name="subscribe" onSubmit={handleSubmit}>
      <label className={styles.label}>
        {labelText}
        <input
          className={styles.input}
          type="email"
          name="email"
          required
          placeholder={emailPlaceholder}
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
