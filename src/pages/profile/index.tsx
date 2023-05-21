'use client'

import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import PlaylistWrapper from '../../components/playlistWrapper/PlaylistWrapper'
import { NextPageWithLayout } from '../../types/page'
import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Playlist from '../../components/playlist/Playlist'
import TrackWidget from '../../components/audioTrack/AudioTrack'
import useSpotify from '../../lib/hooks/useSpotify'
import {
  playlistIdState,
  playlistState,
  topTracksState,
} from '../../lib/recoil/atoms/playlistAtom'

export interface IProfile {}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

const Profile: NextPageWithLayout<IProfile> = () => {
  const [topTracks, setTopTracks] = useRecoilState(topTracksState)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const spotifyApi = useSpotify()
  const { data: session } = useSession()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      console.log(session?.user)

      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body)
          console.log(playlist)
        })
        .catch((error) => {
          if (error && error.body && error.body.error) {
            console.log('Error:', error.body.error)
          } else {
            console.log('Unexpected Error:', error)
          }
        })

      spotifyApi
        .getUserPlaylists({ limit: 50 })
        .then((data) => {
          console.log(data.body.items)
        })
        .catch((error) => {
          if (error && error.body && error.body.error) {
            console.log('Error:', error.body.error)
          } else {
            console.log('Unexpected Error:', error)
          }
        })

      // spotifyApi
      //   .getMyTopTracks({ limit: 50, time_range: 'short_term'})
      //   .then((data) => {
      //     setTopTracks(data.body.items)
      //     console.log(topTracks)
      //   })
      //   .catch((error) => {
      //     if (error && error.body && error.body.error) {
      //       console.log('Error:', error.body.error)
      //     } else {
      //       console.log('Unexpected Error:', error)
      //     }
      //   })
    }
  }, [
    spotifyApi,
    playlistId,
    playlist,
    session,
    topTracks,
    setTopTracks,
    setPlaylist,
  ])

  return (
    <>
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
    </>
  )
}

export default Profile

Profile.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Profile Page">{page}</PrimaryLayout>
}
