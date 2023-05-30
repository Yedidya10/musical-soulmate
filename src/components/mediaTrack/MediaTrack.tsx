'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { currentTrackIndicatorState } from '../../lib/recoil/atoms/currentTrackIndicatorState'
import { musicPlayerState } from '../../lib/recoil/atoms/musicPlayerState'
import styles from './MediaTrack.module.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface IMediaTrack {
  trackId: string
  trackNumber: number
  artistName: string
  trackName: string
  albumName: string
  albumImage: string
  trackDuration: string
  trackUri: string
  liked: boolean
}

const MediaTrack: React.FC<IMediaTrack> = ({
  trackId,
  trackNumber,
  artistName,
  trackName,
  albumName,
  albumImage,
  trackDuration,
  trackUri,
  liked,
}) => {
  const [currentTrackIndicator, setCurrentTrackIndicator] = useRecoilState(
    currentTrackIndicatorState
  )
  const [musicPlayer, setMusicPlayer] = useRecoilState(musicPlayerState)

  const [screenWidth, setScreenWidth] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleCurrentTrackIndicator = () => {
    if (currentTrackIndicator.trackId !== trackId) {
      setCurrentTrackIndicator({
        ...currentTrackIndicator,
        trackId: trackId,
        isPlaying: true,
      })
    }

    if (currentTrackIndicator.trackId === trackId) {
      setCurrentTrackIndicator({
        ...currentTrackIndicator,
        isPlaying: !currentTrackIndicator.isPlaying,
      })
    }

    setMusicPlayer({
      ...musicPlayer,
      display: true,
      track: {
        ...musicPlayer.track,
        id: trackId,
        name: trackName,
        artist: artistName,
        album: albumName,
        albumImage: albumImage,
        duration: trackDuration,
        uri: trackUri,
      },
    })
  }

  const currentTrackIsPlaying =
    currentTrackIndicator.trackId === trackId && currentTrackIndicator.isPlaying

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth)
      }
      setScreenWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <Box
      className={styles.mediaTrack}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={screenWidth <= 768 ? handleCurrentTrackIndicator : undefined}
    >
      {screenWidth > 768 &&
        (isHovering ? (
          <button
            className={styles.trackPlay}
            onClick={handleCurrentTrackIndicator}
          >
            {currentTrackIsPlaying ? (
              <BsPauseFill className={styles.trackPauseIcon} />
            ) : (
              <BsPlayFill className={styles.trackPlayIcon} />
            )}
          </button>
        ) : (
          <Typography className={styles.trackNumber}>{trackNumber}</Typography>
        ))}

      <div className={styles.trackImage}>
        <Image src={albumImage} alt={albumName} width={50} height={50} />
      </div>
      <div className={styles.trackInfo}>
        <Typography className={styles.trackName}>{trackName}</Typography>
        <Typography className={styles.trackArtistName}>{artistName}</Typography>
      </div>
      <div className={styles.albumInfo}>
        <Typography className={styles.trackAlbumName}>{albumName}</Typography>
      </div>
      <Typography className={styles.trackDuration}>{trackDuration}</Typography>
      <div className={styles.trackLike}>
        {liked ? <BsHeartFill /> : <BsHeart />}
      </div>
    </Box>
  )
}

export default MediaTrack
