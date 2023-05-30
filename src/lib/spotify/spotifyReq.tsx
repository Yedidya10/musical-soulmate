import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSpotify from '../../lib/hooks/useSpotify'

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

// This is one request for a test purpose. The full code below is currently set as a comment
const SpotifyReq: React.FC = () => {
  const spotifyApi = useSpotify();

  const fetchUserPlaylists = async () => {
    const options = { limit: 50, offset: 0 }; // Add 'offset' property to the options object
    let fetchedData: any[] = [];

    const recursiveFetch = async (offset: number) => {
      options.offset = offset;

      try {
        const data = await spotifyApi.getUserPlaylists(options);
        fetchedData.push(...data.body.items);

        if (data.body.next !== null) {
          await delay(1000); // Add a delay of 1 second between requests
          await recursiveFetch(offset + data.body.limit);
        } else {
          console.log(fetchedData);
          // Perform any necessary actions with the fetched data here
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    await recursiveFetch(0);
    return fetchedData;
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  return (
    <div>
      <h1>SpotifyReq</h1>
    </div>
  );
};

// const SpotifyReq: React.FC = () => {
//   const spotifyApi = useSpotify()

//   const delay = (ms: number) => {
//     return new Promise((resolve) => setTimeout(resolve, ms))
//   }

//   const fetchAllData = async (apiFunction: any, options: any) => {
//     let fetchedData: any[] = [] // Explicitly define the type as 'any[]'

//     const recursiveFetch = async (offset: number) => {
//       options.offset = offset

//       try {
//         const data = await apiFunction(options)
//         fetchedData.push(...data.body.items)

//         if (data.body.next !== null) {
//           await delay(1000) // Add a delay of 1 second between requests
//           await recursiveFetch(offset + data.body.limit)
//         } else {
//           console.log(data.body)
//           // Perform any necessary actions with the fetched data here
//         }
//       } catch (error) {
//         console.log('Error:', error)
//       }
//     }

//     await recursiveFetch(0)
//     return fetchedData
//   }

//   useEffect(() => {
//     // Fetch user playlists
//     const fetchUserPlaylists = async () => {
//       const options = { limit: 50 }
//       const playlists = await fetchAllData(spotifyApi.getPlaylist, options)
//       console.log(playlists)
//     }

//     // Fetch user top tracks
//     const fetchUserTopTracks = async () => {
//       const timeRanges = ['long_term', 'medium_term', 'short_term']
//       const options = { limit: 50 }

//       for (const timeRange of timeRanges) {
//         const timeRangeOptions = { ...options, time_range: timeRange } // Include time_range conditionally
//         const topTracks = await fetchAllData(
//           spotifyApi.getMyTopTracks,
//           timeRangeOptions
//         )
//         console.log(topTracks)
//       }
//     }

//     // Fetch user top artists
//     const fetchUserTopArtists = async () => {
//       const timeRanges = ['long_term', 'medium_term', 'short_term']
//       const options = { limit: 50 }

//       for (const timeRange of timeRanges) {
//         const timeRangeOptions = { ...options, time_range: timeRange } // Include time_range conditionally
//         const topArtists = await fetchAllData(
//           spotifyApi.getMyTopArtists,
//           timeRangeOptions
//         )
//         console.log(topArtists)
//       }
//     }

//     // Fetch recently played tracks
//     const fetchRecentlyPlayedTracks = async () => {
//       const options = { limit: 50 }
//       const recentlyPlayedTracks = await fetchAllData(
//         spotifyApi.getMyRecentlyPlayedTracks,
//         options
//       )
//       console.log(recentlyPlayedTracks)
//     }

//     // Fetch saved tracks
//     const fetchSavedTracks = async () => {
//       const options = { limit: 50 }
//       const savedTracks = await fetchAllData(
//         spotifyApi.getMySavedTracks,
//         options
//       )
//       console.log(savedTracks)
//     }

//     // Fetch saved albums
//     const fetchSavedAlbums = async () => {
//       const options = { limit: 50 }
//       const savedAlbums = await fetchAllData(
//         spotifyApi.getMySavedAlbums,
//         options
//       )
//       console.log(savedAlbums)
//     }

//     // Fetch saved shows
//     const fetchSavedShows = async () => {
//       const options = { limit: 50 }
//       const savedShows = await fetchAllData(spotifyApi.getMySavedShows, options)
//       console.log(savedShows)
//     }

//     // Fetch current playback state
//     const fetchCurrentPlaybackState = async () => {
//       const playbackState = await spotifyApi.getMyCurrentPlaybackState()
//       console.log(playbackState.body)
//     }

//     // Fetch devices
//     const fetchDevices = async () => {
//       const devices = await spotifyApi.getMyDevices()
//       console.log(devices.body)
//     }

//     // Fetch current playing track
//     const fetchCurrentPlayingTrack = async () => {
//       const currentPlayingTrack = await spotifyApi.getMyCurrentPlayingTrack()
//       console.log(currentPlayingTrack.body)
//     }

//     // Call the fetch functions
//     fetchUserPlaylists()
//     fetchUserTopTracks()
//     fetchUserTopArtists()
//     fetchRecentlyPlayedTracks()
//     fetchSavedTracks()
//     fetchSavedAlbums()
//     fetchSavedShows()
//     fetchCurrentPlaybackState()
//     fetchDevices()
//     fetchCurrentPlayingTrack()
//   }, [])

//   return (
//     <div>
//       <h1>SpotifyReq</h1>
//     </div>
//   )
// }

export default SpotifyReq
