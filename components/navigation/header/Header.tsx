import Image from 'next/image'

import MainNav from '../mainNav/MainNav'
import styles from './Header.module.scss'

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  return (
    <header className={styles.header} {...headerProps}>
      <div className={styles.headerContent}>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      </div>
      <MainNav />
    </header>
  )
}

export default Header
