import { IMediaTrack } from './MediaTrack'

const base: IMediaTrack = {
  trackId: '',
  trackNumber: 0,
  artistName: '',
  trackName: '',
  albumName: '',
  albumImage: '',
  trackDuration: '',
  trackUri: '',
  liked: false,
}

export const mockMediaTrackProps = {
  base,
}
