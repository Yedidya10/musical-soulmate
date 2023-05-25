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
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import styles from './MusicPlayer.module.scss'

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

  const [justifyFlex, setJustifyFlex] = useState('')

  useEffect(() => {
    if (
      locale !== undefined &&
      ['ar', 'arc', 'az', 'dv', 'ku', 'ckb', 'ur', 'he', 'fa'].includes(locale)
    ) {
      setJustifyFlex('flex-end')
    } else {
      setJustifyFlex('flex-start')
    }
  }, [locale])

  return (
    <>
      {musicPlayer.display && (
        <Box
          className={styles.musicPlayer}
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.8)),
            url(${musicPlayer.track.albumImage})`,
          }}
        >
          <Box>
            <Box
              sx={{
                ml: 1.5,
                minWidth: 0,
              }}
            >
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
              <SkipPreviousRounded fontSize="large" htmlColor={mainIconColor} />
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
          {
            <Stack
              className={styles.volume}
              spacing={2}
              direction="row"
              sx={{ mb: 1, px: 1 }}
              alignItems="center"
              width={0.6}
            >
              <VolumeDownRounded htmlColor={lightIconColor} />
              <Slider
                aria-label="Volume"
                defaultValue={musicPlayer.volume}
                value={musicPlayer.volume}
                onChange={(_, value) =>
                  setMusicPlayer({ ...musicPlayer, volume: value as number })
                }
                sx={{
                  color:
                    theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 14,
                    height: 14,
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
          }
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
            <Typography className={styles.time}>
              {formatDuration(musicPlayer.progress)}
            </Typography>
            <Typography className={styles.time}>
              -{formatDuration(duration - musicPlayer.progress)}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

export default MusicPlayer
