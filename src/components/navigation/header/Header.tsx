import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import MusicNoteIcon from '@mui/icons-material/MusicNote'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import React, { useContext } from 'react'
import ColorModeContext from '../../../reactContext/ColorModeContext'
import AccountSettingsMenu from '../../accountSettingsMenu/AccountSettingsMenu'
import MainNav from '../mainNav/MainNav'
import styles from './Header.module.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import HideOnScroll from '../../muiHelpers/HideOnScroll'

interface IHeader extends React.ComponentPropsWithoutRef<'header'> {
  children?: React.ReactNode
}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (

    <HideOnScroll {...headerProps}>
      <AppBar className={styles.header} position="sticky">
        <Box className={styles.top}>
          <Box className={styles.logo}>
            <MusicNoteIcon className={styles.logoIcon} />
            <Typography component="span" className={styles.appName}>
              Musical Soulmate
            </Typography>
          </Box>
          <Box className={styles.settings}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon className={styles.toggleIcon} />
              ) : (
                <Brightness4Icon className={styles.toggleIcon} />
              )}
            </IconButton>
            <IconButton color="inherit">
              <NotificationsNoneIcon className={styles.notificationsIcon} />
            </IconButton>
            <AccountSettingsMenu />
          </Box>
        </Box>
        <MainNav />
      </AppBar>
      </HideOnScroll>

  )
}

export default Header
