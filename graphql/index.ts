import { gql } from 'graphql-tag'
import { userTypes, userResolvers } from './user'

export const typeDefs = gql`
  ${userTypes}
`

export const resolvers = {
  Query: {
    ...userResolvers,
  },
}