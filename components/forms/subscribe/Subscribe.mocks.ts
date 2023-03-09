import { ISubscribe } from './Subscribe'

const base: ISubscribe = {
  labelText: 'Subscribe for the app launch event in your country',
  emailPlaceholder: 'Enter your email',
  submitButtonText: 'Subscribe',
  handleSubmit: () => {},
}

export const mockSubscribeProps = {
  base,
}
