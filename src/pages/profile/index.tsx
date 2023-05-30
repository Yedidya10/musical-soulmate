'use client'

import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout'
import MediaTrack from '../../components/mediaTrack/MediaTrack'
import Playlist from '../../components/playlist/Playlist'
import PlaylistWrapper from '../../components/playlistWrapper/PlaylistWrapper'
import SpotifyReq from '../../lib/spotify/spotifyReq'
import {
  playlistIdState,
  playlistState,
  topTracksState,
} from '../../lib/recoil/atoms/playlistAtom'
import { NextPageWithLayout } from '../../types/page'

export interface IProfile {}


const Profile: NextPageWithLayout<IProfile> = () => {

  return (
    <>
      <SpotifyReq />
      <PlaylistWrapper playlistName={'Top Tracks'}>
        <Playlist sampleTextProp={''}>
          <MediaTrack
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
          <MediaTrack
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
          <MediaTrack
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
