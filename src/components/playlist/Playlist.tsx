import styles from './Playlist.module.scss'

export interface IPlaylist {
  sampleTextProp: string
  children: React.ReactNode
}

const Playlist: React.FC<IPlaylist> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.playlistHeader}>
        <p className={styles.trackNumber}>#</p>
        <p className={styles.trackTitle}>TITLE</p>
        <p className={styles.albumName}>ALBUM</p>
        <p className={styles.dateAdded}>DATE ADDED</p>
        <p className={styles.trackLength}>LENGTH</p>
      </div>
      <div className={styles.tracks}>{children}</div>
    </div>
  )
}

export default Playlist
