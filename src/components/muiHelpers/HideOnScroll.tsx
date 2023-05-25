import React from 'react'
import Slide from '@mui/material/Slide'
import useScrollTrigger from '@mui/material/useScrollTrigger'

interface HideOnScrollProps {
  children: React.ReactElement
}

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
