import { getSession, useSession } from 'next-auth/react'

import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../types/page'

import AudioTrack from '../components/audioTrack/AudioTrack'

export interface IHome {}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

const Home: NextPageWithLayout<IHome> = () => {
  const { data: session } = useSession()

  return (
    <>
      <p>Welcome {session?.user?.name}</p>
      <AudioTrack
        trackId="1"
        trackNumber={1}
        artistName={'Artist Name 1'}
        trackName={'Track Name'}
        albumName={'Album Name'}
        albumImage={'https://via.placeholder.com/150'}
        trackDuration={'3:24'}
        trackUri="spotify:track:4uLU6hMCjMI75M1A2tKUQC"
        liked={false}
      />
      <AudioTrack
        trackId="2"
        trackNumber={2}
        artistName={'Artist Name 2'}
        trackName={'Track Name'}
        albumName={'Album Name'}
        albumImage={'https://via.placeholder.com/150'}
        trackDuration={'3:24'}
        trackUri="spotify:track:4uLU6hMCjMI75M1A2tKUQC"
        liked={false}
      />
      <AudioTrack
        trackId="3"
        trackNumber={3}
        artistName={'Artist Name 3'}
        trackName={'Track Name'}
        albumName={'Album Name'}
        albumImage={'https://via.placeholder.com/150'}
        trackDuration={'3:24'}
        trackUri="spotify:track:4uLU6hMCjMI75M1A2tKUQC"
        liked={true}
      />
    </>
  )
}

export default Home

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Home Page">{page}</PrimaryLayout>
}
