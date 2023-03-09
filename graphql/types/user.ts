import { builder } from '../builder'

builder.prismaObject('UserProfile', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    // language: t.exposeString('language'),
    // country: t.exposeString('country'),
  }),
})

const Role = builder.enumType('Role', {
  values: ['ADMIN', 'USER'] as const,
})
