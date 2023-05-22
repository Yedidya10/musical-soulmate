import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AiFillCompass, AiFillHome } from 'react-icons/ai'
import { BsChatTextFill } from 'react-icons/bs'
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi'
import styles from './MainNav.module.scss'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'

export interface IMainNav extends React.ComponentPropsWithoutRef<'nav'> {
  children?: React.ReactNode
}

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const MainNav: React.FC<IMainNav> = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)

  return (
    <AppBar position="static" elevation={1}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<AiFillHome className={styles.icon} />}
          onClick={() => router.push('/')}
        />
        <BottomNavigationAction
          label="Discover"
          icon={<AiFillCompass className={styles.icon} />}
          onClick={() => router.push('/discover')}
        />
        <BottomNavigationAction
          label="Chat"
          icon={<BsChatTextFill className={styles.icon} />}
          onClick={() => router.push('/chat')}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<HiOutlineUserCircle className={styles.icon} />}
          onClick={() => router.push('/profile')}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default MainNav
