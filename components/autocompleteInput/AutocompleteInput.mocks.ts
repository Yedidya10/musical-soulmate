import { IAutocompleteInput } from './AutocompleteInput'

const base: IAutocompleteInput = {
  sampleTextProp: 'Hello world!',
  onInputChange: function (e: string): void {
    throw new Error('Function not implemented.')
  },
  countries: []
}

export const mockAutocompleteInputProps = {
  base,
}
