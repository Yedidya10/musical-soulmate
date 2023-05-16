import { ITrackWidget } from './TrackWidget'

const base: ITrackWidget = {
  trackId: '',
  trackNumber: 0,
  artistName: '',
  trackName: '',
  albumName: '',
  albumImage: '',
  trackDuration: '',
  trackUri: '',
  liked: false
}

export const mockTrackWidgetProps = {
  base,
}
