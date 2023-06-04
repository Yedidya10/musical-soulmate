// googleApi.ts

export interface GoogleApiOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

export default async function googleApi(
  endpoint: string,
  accessToken: string,
  options: GoogleApiOptions = {}
) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`https://www.googleapis.com/${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error.message);
  }
}
