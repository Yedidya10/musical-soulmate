import PlaylistWrapper from '@/components/playlistWrapper/PlaylistWrapper'
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../../types/page'

import Playlist from '@/components/playlist/Playlist'
import TrackWidget from '@/components/trackWidget/TrackWidget'
import styles from './Profile.module.scss'
import useSpotify from '@/hooks/useSpotify'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { topTracksAtom } from '@/recoil/atoms/topTracksAtom'

export interface IProfile {}

const Profile: NextPageWithLayout<IProfile> = () => {
  const [topTracks, setTopTracks] = useRecoilState(topTracksAtom)
  const { data: session } = useSession()
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopTracks({
          limit: 10,
          time_range: 'short_term',
        })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          if (error && error.body && error.body.error) {
            console.log('Error:', error.body.error)
          } else {
            console.log('Unexpected Error:', error)
          }
        })
    }
  }, [spotifyApi])

  return (
    <>
      <main className={styles.main}>
        <PlaylistWrapper playlistName={'Top Tracks'}>
          <Playlist sampleTextProp={''}>
            <TrackWidget
              trackId={'4'}
              trackNumber={0}
              artistName={'Artist Name'}
              trackName={'Track Name'}
              albumName={'Album Name'}
              albumImage={'https://via.placeholder.com/150'}
              trackDuration={'3:24'}
              trackUri="spotify:track:4uLU6hMCjMI75M1A2tKUQC"
              liked={false}
            />
          </Playlist>
        </PlaylistWrapper>
        <PlaylistWrapper playlistName={'Top Artists'}>
          <Playlist sampleTextProp={''}>
            <TrackWidget
              trackId={'5'}
              trackNumber={0}
              artistName={'Artist Name'}
              trackName={'Track Name'}
              albumName={'Album Name'}
              albumImage={'https://via.placeholder.com/150'}
              trackDuration={'3:24'}
              trackUri="spotify:track:4uLU6hMCjMI75M1A2tKUQC"
              liked={false}
            />
          </Playlist>
        </PlaylistWrapper>
        <PlaylistWrapper playlistName={'Top Genres'}>
          <Playlist sampleTextProp={''}>
            <TrackWidget
              trackId={'6'}
              trackNumber={0}
              artistName={'Artist Name'}
              trackName={'Track Name'}
              albumName={'Album Name'}
              albumImage={'https://via.placeholder.com/150'}
              trackDuration={'3:24'}
              trackUri="spotify:track:4uLU6hMCjMI75M1A2tKUQC"
              liked={false}
            />
          </Playlist>
        </PlaylistWrapper>
      </main>
    </>
  )
}

export default Profile

Profile.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Profile Page">{page}</PrimaryLayout>
}
