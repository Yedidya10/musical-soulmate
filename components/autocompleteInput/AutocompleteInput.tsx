import { useState } from "react"

export interface IAutocompleteInput {
  sampleTextProp: string
  onInputChange: (e: string) => void
  countries: string[]
}

const AutocompleteInput: React.FC<IAutocompleteInput> = ({
  sampleTextProp,
  onInputChange,
  countries,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value
    setInputValue(newInputValue)
    const filtered = countries.filter((country) =>
      country.toLowerCase().startsWith(newInputValue.toLowerCase())
    )
    setFilteredCountries(filtered)
    onInputChange(newInputValue)
  }

  const handleCountryClick = (country: string) => {
    setInputValue(country)
    setFilteredCountries(countries)
    onInputChange(country)
  }

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {filteredCountries.length > 0 && (
        <ul className="autocomplete-options">
          {filteredCountries.map((country) => (
            <li key={country} onClick={() => handleCountryClick(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AutocompleteInput
