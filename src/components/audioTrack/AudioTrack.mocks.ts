import { IAudioTrack } from './AudioTrack'

const base: IAudioTrack = {
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

export const mockAudioTrackProps = {
  base,
}
