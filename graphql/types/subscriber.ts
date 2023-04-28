import prisma from '../../lib/prisma';
import { builder } from '../builder';

export const CreateSubscriberInput = builder.inputType('CreateSubscriberInput', {
  fields: (t) => ({
    email: t.string(),
    language: t.string(),
    country: t.string(),
  })
});

builder.prismaObject('Subscriber', {
  name: 'Subscriber',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    country: t.exposeString('country'),
    language: t.exposeString('language'),
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

builder.mutationField('addSubscriber', (t) => 
  t.prismaField({
    type: 'Subscriber',
    args: {
      input: t.arg({
        type: CreateSubscriberInput,
        required: true
      })
    },
    resolve: async (query, _parent, _args, _ctx, _info) => {
      try {
        return prisma.subscriber.create({ data: _args.input });
      }catch (err) {}
    }
  })
);