// googleYoutubeApi.ts

import googleApi, { GoogleApiOptions } from './googleApi';

export default async function googleYoutubeApi(
  endpoint: string,
  accessToken: string,
  options: GoogleApiOptions = {}
) {
  return await googleApi(`youtube/v3/${endpoint}`, accessToken, options);
}
