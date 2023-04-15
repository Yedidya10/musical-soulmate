import { builder } from '../builder'

builder.prismaObject('Subscriber', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
  }),
})

const Role = builder.enumType('Role', {
  values: ['ADMIN', 'USER'] as const,
})
