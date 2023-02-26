import styles from './Subscribe.module.scss'

export interface ISubscribe {
  labelText: string,
  placeholder: string,
  buttonText: string,
}

const Subscribe: React.FC<ISubscribe> = ({ labelText, placeholder, buttonText  }) => {
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        {labelText}
        <input className={styles.input} type="email" required placeholder={placeholder} />
      </label>
      <button className={styles.button} type="submit">{buttonText}</button>
    </form>
  )
}

export default Subscribe
