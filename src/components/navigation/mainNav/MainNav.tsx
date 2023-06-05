import { Inter } from "next/font/google"
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AiFillCompass, AiFillHome } from 'react-icons/ai'
import { BsChatTextFill } from 'react-icons/bs'
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi'
import styles from './MainNav.module.scss'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { SetStateAction, useEffect, useState } from 'react'

export interface IMainNav extends React.ComponentPropsWithoutRef<'nav'> {
  children?: React.ReactNode
}

const pages = ['Home', 'Discover', 'Chat', 'Profile']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const MainNav: React.FC<IMainNav> = () => {
  const router = useRouter()
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    // Update the value based on the current URL
    switch (router.pathname) {
      case '/':
        setPathname('home')
        break
      case '/discover':
        setPathname('discover')
        break
      case '/chat':
        setPathname('chat')
        break
      case '/profile':
        setPathname('profile')
        break
      default:
        setPathname('')
    }
  }, [router.pathname])

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: SetStateAction<string>
  ) => {
    setPathname(pathname)
    // Update the URL based on the selected button
    switch (newValue) {
      case 'home':
        router.push('/')
        break
      case 'discover':
        router.push('/discover')
        break
      case 'chat':
        router.push('/chat')
        break
      case 'profile':
        router.push('/profile')
        break
      default:
      // Handle the default case
    }
  }

  return (
    <BottomNavigation
      component={'nav'}
      value={pathname}
      onChange={handleChange}
      className={styles.mainNav}
    >
      <BottomNavigationAction
        className={styles.bottomNavAction}
        aria-label="home"
        value={'home'}
        icon={<AiFillHome className={styles.icon} />}
      />
      <BottomNavigationAction 
        className={styles.bottomNavAction}
        aria-label="discover"
        value={'discover'}
        icon={<AiFillCompass className={styles.icon} />}
      />
      <BottomNavigationAction
        className={styles.bottomNavAction}
        aria-label="chat"
        value={'chat'}
        icon={<BsChatTextFill className={styles.icon} />}
      />
      <BottomNavigationAction
        className={styles.bottomNavAction}
        aria-label="profile"
        value={'profile'}
        icon={<HiOutlineUserCircle className={styles.icon} />}
      />
    </BottomNavigation>
  )
}

export default MainNav
