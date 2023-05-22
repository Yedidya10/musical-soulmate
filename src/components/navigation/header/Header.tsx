import Image from 'next/image'
import Box from '@mui/material/Box'

import MainNav from '../mainNav/MainNav'
import styles from './Header.module.scss'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {
  children?: React.ReactNode
}

interface HideOnScrollProps {
  children: React.ReactElement
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  return (
    <>
      <HideOnScroll {...headerProps}>
        <Box component={'header'} className={styles.header} {...headerProps}>
          <Box className={styles.headerContent}>
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          </Box>
        </Box>
      </HideOnScroll>
      <MainNav />
    </>
  )
}

export default Header
