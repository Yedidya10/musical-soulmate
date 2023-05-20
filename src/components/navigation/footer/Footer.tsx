import MusicPlayer from '../../../components/musicPlayer/MusicPlayer'
import style from './Footer.module.scss'
import Box from '@mui/material/Box'

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  return (
    <Box component="footer" className={style.footer} {...footerProps}>
      <MusicPlayer />
    </Box>
  )
}

export default Footer
