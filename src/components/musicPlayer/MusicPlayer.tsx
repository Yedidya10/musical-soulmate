import { musicPlayerAtom } from '../../lib/recoil/atoms/musicPlayerAtom'
import SkipNextRounded from '@mui/icons-material/SkipNextRounded'
import SkipPreviousRounded from '@mui/icons-material/SkipPreviousRounded'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'

const WallPaper = styled('div')({
  position: 'sticky',
  insetBlockStart: 0,
  insetInlineStart: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
})

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}))

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
})

export interface IMusicPlayer {}

const MusicPlayer: React.FC<IMusicPlayer> = () => {
  const { locale } = useRouter()

  const [musicPlayer, setMusicPlayer] = useRecoilState(musicPlayerAtom)
  const theme = useTheme()
  const duration = 200 // seconds
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'

  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [htmlDir, setHtmlDir] = useState('')
  const [justifyFlex, setJustifyFlex] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth)
      }
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (
      locale !== undefined &&
      ['ar', 'arc', 'az', 'dv', 'ku', 'ckb', 'ur', 'he', 'fa'].includes(locale)
    ) {
      setHtmlDir('rtl')
      setJustifyFlex('flex-end')
    } else {
      setHtmlDir('ltr')
      setJustifyFlex('flex-start')
    }
  }, [locale])

  return (
    <div>
      {musicPlayer.display && (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Widget>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography noWrap>{musicPlayer.track.name}</Typography>
                <Typography noWrap letterSpacing={-0.25} fontSize={14}>
                  {musicPlayer.track.artist}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                direction: 'ltr',
                display: 'flex',
                alignItems: 'center',
                justifyContent: justifyFlex,
                mt: -1,
              }}
            >
              <IconButton aria-label="previous song">
                <SkipPreviousRounded
                  fontSize="large"
                  htmlColor={mainIconColor}
                />
              </IconButton>
              <IconButton
                aria-label={musicPlayer.paused ? 'play' : 'pause'}
                onClick={() =>
                  setMusicPlayer({
                    ...musicPlayer,
                    paused: !musicPlayer.paused,
                  })
                }
              >
                {musicPlayer.paused ? (
                  <PlayArrowRounded
                    sx={{ fontSize: '3rem' }}
                    htmlColor={mainIconColor}
                  />
                ) : (
                  <PauseRounded
                    sx={{ fontSize: '3rem' }}
                    htmlColor={mainIconColor}
                  />
                )}
              </IconButton>
              <IconButton aria-label="next song">
                <SkipNextRounded fontSize="large" htmlColor={mainIconColor} />
              </IconButton>
            </Box>
            {screenWidth > 600 && (
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1, px: 1 }}
                alignItems="center"
              >
                <VolumeDownRounded htmlColor={lightIconColor} />

                <Slider
                  aria-label="Volume"
                  defaultValue={musicPlayer.volume}
                  onChange={(_, value) =>
                    setMusicPlayer({ ...musicPlayer, volume: value as number })
                  }
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? '#fff'
                        : 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      backgroundColor: '#fff',
                      '&:before': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                      },
                      '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                      },
                    },
                  }}
                />

                <VolumeUpRounded htmlColor={lightIconColor} />
              </Stack>
            )}
            <Slider
              aria-label="time-indicator"
              size="small"
              value={musicPlayer.progress}
              min={0}
              step={1}
              max={duration}
              onChange={(_, value) =>
                setMusicPlayer({ ...musicPlayer, progress: value as number })
              }
              sx={{
                color:
                  theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                height: 2,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === 'dark'
                        ? 'rgb(255 255 255 / 16%)'
                        : 'rgb(0 0 0 / 16%)'
                    }`,
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2,
              }}
            >
              <TinyText>{formatDuration(musicPlayer.progress)}</TinyText>
              <TinyText>
                -{formatDuration(duration - musicPlayer.progress)}
              </TinyText>
            </Box>
          </Widget>
          <WallPaper />
        </Box>
      )}
    </div>
  )
}

export default MusicPlayer
