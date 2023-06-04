import { ISignIn } from './SignIn'

const base: ISignIn = {
  providersLoginText: 'Login with',
  providers: {
    spotify: {
      id: 'spotify',
      name: 'Spotify',
      type: 'oauth',
      version: '2.0',
      scope: 'user-read-private user-read-email',
      params: { grant_type: 'authorization_code' },
    },
  },
  signIn: Function,
  snackbarFailText: '',
  tryAgainText: ''
}

export const mockSignInProps = {
  base,
}
