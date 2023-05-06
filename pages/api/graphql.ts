import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'
import { schema } from '../../graphql/schema'

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}
