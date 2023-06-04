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

export const currentTrackIndicatorState = atom({
  key: 'currentTrackIndicatorState',
  default: {
    trackId: '',
    isPlaying: false,
  },
  effects: [localStorageEffect('currentTrackIndicatorState')],
})
