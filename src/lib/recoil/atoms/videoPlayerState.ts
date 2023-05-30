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

export const videoPlayerState = atom({
  key: 'videoPlayerState',
  default: {
    display: false,
    track: {
      id: '',
      name: '',
      artist: '',
      album: '',
      albumImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWXLqTUYxfFTnLr65MKKVrws00bErpXnJWw&usqp=CAU',
      duration: '',
      uri: '',
    },
    isPlaying: false,
    paused: false,
    progress: 0,
  },
  effects: [localStorageEffect('videoPlayerState')],
})
