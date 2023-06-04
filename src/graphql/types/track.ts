import prismaClient from '../../lib/prisma'
import { builder } from '../builder'

export const CreateTrack = builder.inputType('CreateTrack', {
  description: 'Input type for creating a track',
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string({ required: true }),
    discNumber: t.int({ required: true }),
    durationMs: t.int({ required: true }),
    episode: t.boolean({ required: true }),
    explicit: t.boolean({ required: true }),
    isLocal: t.boolean({ required: true }),
    popularity: t.int({ required: true }),
    previewUrl: t.string({ required: true }),
    trackNumber: t.int({ required: true }),
    album: t.string({ required: true }),
    artists: t.string({ required: true }),
    externalUrls: t.string({ required: true }),
    externalIds: t.string({ required: true }),
    availableMarkets: t.string({ required: true }),
  }),
})

builder.prismaObject('Track', {
  name: 'Track',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    discNumber: t.exposeInt('discNumber'),
    durationMs: t.exposeInt('durationMs'),
    episode: t.exposeBoolean('episode'),
    explicit: t.exposeBoolean('explicit'),
    isLocal: t.exposeBoolean('isLocal'),
    popularity: t.exposeInt('popularity'),
    previewUrl: t.exposeString('previewUrl', { nullable: true }),
    trackNumber: t.exposeInt('trackNumber'),
    // album: t.relation('Album'),
    // artists: t.relation('Artist'),
    // externalUrls: t.relation('ExternalUrls'),
    // externalIds: t.relation('ExternalIds', { nullable: true }),
    // availableMarkets: t.list.nonNull.string('availableMarkets'),
  }),
})

builder.queryField('tracks', (t) =>
  t.prismaField({
    type: ['Track'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prismaClient.track.findMany({ ...query }),
  })
)

// builder.queryField('track', (t) =>
//   t.prismaField({
//     type: 'Track',
//     args: {
//       id: t.arg.string({ required: true }),
//     },
//     resolve: (query, _parent, _args, _ctx, _info) =>
//       prismaClient.track.findFirst({ ...query, where: { id: _args.id } }),
//   })
// )

// builder.mutationField('addTrack', (t) =>
//   t.prismaField({
//     type: 'Track',
//     args: {
//       input: t.arg({
//         type: CreateTrack,
//         required: true,
//       }),
//     },
//     resolve: async (_query, _parent, _args, _ctx, _info) => {
//       try {
//         const data = await prismaClient.track.create({
//           data: {
//             name: _args.input.name,
//             discNumber: _args.input.discNumber,
//             durationMs: _args.input.durationMs,
//             episode: _args.input.episode,
//             explicit: _args.input.explicit,
//             isLocal: _args.input.isLocal,
//             popularity: _args.input.popularity,
//             previewUrl: _args.input.previewUrl,
//             trackNumber: _args.input.trackNumber,
//             album: {
//               connect: { id: _args.input.albumId },
//             },
//             artists: {
//               connect: _args.input.artistIds.map((id) => ({ id })),
//             },
//             externalUrls: {
//               connect: { id: _args.input.externalUrlsId },
//             },
//             externalIds: _args.input.externalIdsId
//               ? { connect: { id: _args.input.externalIdsId } }
//               : undefined,
//             availableMarkets: { set: _args.input.availableMarkets },
//           },
//         })
//         return data
//       } catch (err: any) {
//         let errMessage = ''
//         if (
//           err?.message?.indexOf(
//             'Unique constraint failed on the fields: (`id`)'
//           ) > -1
//         ) {
//           errMessage = 'Track already exists'
//         } else {
//           errMessage = 'Something went wrong'
//         }
//         throw new Error(errMessage)
//       }
//     },
//   })
// )
