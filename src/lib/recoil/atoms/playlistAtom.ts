import { atom } from 'recoil'

export const playlistState = atom<SpotifyApi.PlaylistObjectFull | null>({
  key: 'playlistState',
  default: null,
})

export const playlistIdState = atom<string>({
  key: 'playlistIdState',
  default: '37i9dQZF1DX6B9HH2fw0SO',
})

export const topTracksState = atom<SpotifyApi.TrackObjectFull[]>({
  key: 'topTracksState',
  default: [],
})
