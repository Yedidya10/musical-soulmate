import { useSession } from 'next-auth/react'

import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from '../types/page'

import TrackWidget from '@/components/trackWidget/TrackWidget'
import styles from './Home.module.scss'

export interface IHome {}

const Home: NextPageWithLayout<IHome> = () => {
  const { data: session } = useSession()

  return (
    <>
      <main className={styles.main}>
        <p>Welcome {session?.user?.name}</p>
        <TrackWidget
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
        <TrackWidget
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
        <TrackWidget
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
      </main>
    </>
  )
}

export default Home

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout headTitle="Home Page">{page}</PrimaryLayout>
}
