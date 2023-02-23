export const userResolvers = {
  users: async (parent: any, args: any, context: any) => {
    const users = await context.prisma.user.findMany()
    return users
  },
}