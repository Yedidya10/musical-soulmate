import { BsSpotify } from 'react-icons/bs'
import Button from '@mui/material/Button'

import styles from './SignIn.module.scss'

export interface ISignIn {
  providersLoginText: string
  providers: object
  signIn: any
}

const SignIn: React.FC<ISignIn> = ({
  providersLoginText,
  providers,
  signIn,
}) => {
  return (
    <ul className={styles.ul}>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <li className={styles.li} key={provider.name}>
            <Button
              className={styles.button}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              {<BsSpotify />} {providersLoginText} {provider.name}
            </Button>
          </li>
        ))}
    </ul>
  )
}

export default SignIn
