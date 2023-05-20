import { currentTrackPlayingIndicatorAtom } from '../../lib/recoil/atoms/currentTrackAtom'
import { musicPlayerAtom } from '../../lib/recoil/atoms/musicPlayerAtom'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import styles from './TrackWidget.module.scss'

export interface ITrackWidget {
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

const TrackWidget: React.FC<ITrackWidget> = ({
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
    currentTrackPlayingIndicatorAtom
  )
  const [musicPlayer, setMusicPlayer] = useRecoilState(musicPlayerAtom)

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
        image: albumImage,
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
    <div
      className={styles.trackWidget}
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
          <div className={styles.trackNumber}>{trackNumber}</div>
        ))}
      <div className={styles.trackImage}>
        <Image src={albumImage} alt={albumName} width={50} height={50} />
      </div>
      <div className={styles.trackInfo}>
        <div className={styles.trackName}>{trackName}</div>
        <div className={styles.trackArtistName}>{artistName}</div>
      </div>
      <div className={styles.albumInfo}>
        <div className={styles.trackAlbumName}>{albumName}</div>
      </div>
      <div className={styles.trackDuration}>{trackDuration}</div>
      <div className={styles.trackLike}>
        {liked ? <BsHeartFill /> : <BsHeart />}
      </div>
    </div>
  )
}

export default TrackWidget
