import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }
  prismaClient = (global as any).prisma
}

export default prismaClient
