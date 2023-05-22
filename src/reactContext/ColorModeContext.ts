import { createContext } from 'react'

export interface IColorModeContext {
  toggleColorMode: () => void
}

const ColorModeContext = createContext<IColorModeContext>({
  toggleColorMode: () => {},
})

export default ColorModeContext
