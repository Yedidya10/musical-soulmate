import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import ErrorsPlugin from '@pothos/plugin-errors';
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import RelayPlugin from '@pothos/plugin-relay'
import prisma from '../lib/prisma'

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
    client: prisma,
  },
  errorOptions: {
    defaultTypes: [],
  },
})

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
})

builder.mutationType({});