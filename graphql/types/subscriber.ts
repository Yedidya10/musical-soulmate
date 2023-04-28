import prisma from '../../lib/prisma'
import { builder } from '../builder'

builder.prismaObject('Subscriber', {
  name: 'Subscriber',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
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
