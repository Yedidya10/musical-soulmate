import { builder } from '../builder'
import prisma from '../../lib/prisma'

builder.prismaObject('Subscriber', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    // language: t.exposeString('language'),
    // country: t.exposeString('country'),
    // createdAt: t.expose('createdAt', { type: 'Date' }),
  }),
})

builder.queryField('subscribers', (t) =>
  t.prismaField({
    type: ['Subscriber'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.subscriber.findMany({ ...query }),
  })
)
