import { atom } from 'recoil'

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key)
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue))
      }
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const currentTrackPlayingIndicatorAtom = atom({
  key: 'currentTrackPlayingIndicatorState',
  default: {
    trackId: '',
    isPlaying: false,
  },
  effects: [localStorageEffect('currentTrackPlayingIndicatorState')],
})
