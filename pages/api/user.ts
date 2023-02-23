// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { typeDefs, resolvers } from '../../graphql'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const nextHandler = startServerAndCreateNextHandler(server)
  return nextHandler(req, res)
}