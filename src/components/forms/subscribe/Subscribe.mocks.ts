import React, { RefObject } from 'react'
import { ISubscribe } from './Subscribe'

const base: ISubscribe = {
  emailLabelText: 'Subscribe for the app launch event in your country',
  emailPlaceholder: 'example@example.com',
  countryPlaceholder: 'United States',
  countryLabelText: 'Country',
  setCountry: () => { },
  setEmail: () => { },
  emailValue: '',
  countryValue: '',
  submitButtonText: 'Subscribe',
  handleSubmit: () => { },
  subscribeTitle: '',
  countryRequiredErrorText: 'Country is required',
  emailRequiredErrorText: 'Email is required',
  isSubmitted: false,
  isLoading: false
}

export const mockSubscribeProps = {
  base,
}
