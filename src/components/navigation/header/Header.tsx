import Image from 'next/image'
import Box from '@mui/material/Box'

import MainNav from '../mainNav/MainNav'
import styles from './Header.module.scss'

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  return (
    <Box component={'header'} className={styles.header} {...headerProps}>
      <Box className={styles.headerContent}>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      </Box>
      <MainNav />
    </Box>
  )
}

export default Header
