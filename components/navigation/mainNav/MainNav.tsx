import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  AiFillCompass,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHome,
} from 'react-icons/ai'
import { BsChatText, BsChatTextFill } from 'react-icons/bs'
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi'
import styles from './MainNav.module.scss'

const inter = Inter({
  subsets: ['latin'],
})

export interface IMainNav extends React.ComponentPropsWithoutRef<'nav'> {}

const MainNav: React.FC<IMainNav> = () => {
  const router = useRouter()

  // Change the color of the nav icons according to the current page
  const homeIcon =
    router.pathname === '/' ? (
      <AiFillHome className={styles.navIcon} />
    ) : (
      <AiOutlineHome className={styles.navIcon} />
    )
  const discoverIcon =
    router.pathname === '/discover' ? (
      <AiFillCompass className={styles.navIcon} />
    ) : (
      <AiOutlineCompass className={styles.navIcon} />
    )
  const chatIcon =
    router.pathname === '/chat' ? (
      <BsChatTextFill className={styles.navIcon} />
    ) : (
      <BsChatText className={styles.navIcon} />
    )
  const profileIcon =
    router.pathname === '/profile' ? (
      <HiUserCircle className={styles.navIcon} />
    ) : (
      <HiOutlineUserCircle className={styles.navIcon} />
    )

  return (
    <nav className={`${styles.nav} ${inter.className}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            {homeIcon}
            <span className={styles.navText}>Home</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/discover" className={styles.navLink}>
            {discoverIcon}
            <span className={styles.navText}>Discover</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/chat" className={styles.navLink}>
            {chatIcon}
            <span className={styles.navText}>Chat</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/profile" className={styles.navLink}>
            {profileIcon}
            <span className={styles.navText}>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default MainNav
