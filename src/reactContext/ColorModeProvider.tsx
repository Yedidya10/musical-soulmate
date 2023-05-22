import { useState, useMemo, useCallback, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ColorModeContext from './ColorModeContext'
import customTheme from '../theme'
import { useMediaQuery } from '@mui/material'
import { secureGetItem, secureSetItem } from '../utils/secureLocalStorage'

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [mode, setMode] = useState<'light' | 'dark' | 'uninitialized'>(
    'uninitialized'
  )

  useEffect(() => {
    let localStorageMode = secureGetItem('theme') as
      | 'light'
      | 'dark'
      | 'uninitialized'
    if (localStorageMode !== 'light' && localStorageMode !== 'dark') {
      localStorageMode = 'uninitialized'
    }
    if (localStorageMode === 'uninitialized') {
      setMode(prefersDarkMode ? 'dark' : 'light')
    } else {
      setMode(localStorageMode)
    }
  }, [prefersDarkMode])

  const toggleColorMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    secureSetItem('theme', newMode)
    setMode(newMode)
  }, [mode])

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...customTheme,
          mode: mode === 'uninitialized' ? 'light' : mode,
        },
      }),
    [mode]
  )

  return mode === 'uninitialized' ? null : (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
