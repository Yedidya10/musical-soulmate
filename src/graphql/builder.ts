import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import ErrorsPlugin from '@pothos/plugin-errors'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import RelayPlugin from '@pothos/plugin-relay'
import prismaClient from '../lib/prisma'
import { GraphQLScalarType, Kind } from 'graphql'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [PrismaPlugin, RelayPlugin, ErrorsPlugin],
  relayOptions: {},
  prisma: {
    client: prismaClient,
  },
  errorOptions: {
    defaultTypes: [],
  },
})

// const DateResolver = new GraphQLScalarType({
//   name: 'Date',
//   description: 'A date scalar that represents a date in ISO format',
//   parseValue(value) {
//     if (
//       typeof value === 'string' ||
//       typeof value === 'number' ||
//       value instanceof Date
//     ) {
//       return new Date(value) // Convert the input value to a Date object
//     }
//   },
//   serialize(value) {
//     if (value instanceof Date) {
//       return value.toISOString() // Convert the Date object to an ISO string format
//     }
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.STRING) {
//       return new Date(ast.value) // Convert the string value to a Date object
//     }
//     return null
//   },
// })

// // @ts-ignore
// builder.addScalarType('Date', DateResolver, {})

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
})

builder.objectType(Error, {
  name: 'Error',
  fields: (t) => ({
    message: t.exposeString('message'),
  }),
})

builder.mutationType({})
