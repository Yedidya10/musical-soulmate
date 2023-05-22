import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import React, { useContext } from 'react'
import ColorModeContext from '../../../reactContext/ColorModeContext'

import MainNav from '../mainNav/MainNav'
import styles from './Header.module.scss'
import Paper from '@mui/material/Paper'

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box component={'header'} className={styles.header} {...headerProps}>
      <Box className={styles.headerContent}>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <MainNav />
    </Box>
  )
}

export default Header
