import prismaClient from '@/lib/prisma'
import { builder } from '../builder'

// Input for the addSubscriber mutation
export const CreateSubscriberInput = builder.inputType(
  'CreateSubscriberInput',
  {
    fields: (t) => ({
      email: t.string({ required: true }),
      language: t.string({ required: true }),
      country: t.string({ required: true }),
    }),
  }
)

builder.prismaObject('Subscriber', {
  name: 'Subscriber',
  fields: (t) => ({
    email: t.exposeString('email'),
    country: t.exposeString('country'),
    language: t.exposeString('language'),
  }),
})

builder.queryField('subscribers', (t) =>
  t.prismaField({
    type: ['Subscriber'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prismaClient.subscriber.findMany({ ...query }),
  })
)

// addSubscriber mutation
builder.mutationField('addSubscriber', (t) =>
  t.prismaField({
    // return an object of type Subscriber
    type: 'Subscriber',
    // arguments of the mutation
    args: {
      input: t.arg({
        type: CreateSubscriberInput,
        required: true,
      }),
    },

    // resolver for the mutation. creates a subscriber in database
    resolve: async (query, _parent, _args, _ctx, _info) => {
      try {
        const data = await prismaClient.subscriber.create({
          data: {
            ..._args.input,
          },
        })
        return data
      } catch (err: any) {
        let errMessage = ''
        if (
          err?.message?.indexOf(
            'Unique constraint failed on the fields: (`email`)'
          ) > -1
        ) {
          errMessage = 'Email should be unique'
        }
        throw new Error(errMessage || err?.message || 'Unknown error')
      }
    },
  })
)
