import { getProviders, signIn } from 'next-auth/react'
import { BsSpotify } from 'react-icons/bs'

import styles from './ProvidersLogin.module.scss'

export interface IProvidersLogin {
  providers: object
  providersLoginText: string
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const ProvidersLogin: React.FC<IProvidersLogin> = ({
  providersLoginText,
  providers,
}) => {
  return (
    <ul className={styles.ul}>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <li className={styles.li} key={provider.name}>
            <button
              className={styles.button}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              `${<BsSpotify />} ${providersLoginText}`
            </button>
          </li>
        ))}
    </ul>
  )
}

export default ProvidersLogin
