import { IProvidersLogin } from './ProvidersLogin'

const base: IProvidersLogin = {
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
}

export const mockProvidersLoginProps = {
  base,
}
