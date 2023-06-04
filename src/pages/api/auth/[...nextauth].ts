import NextAuth from 'next-auth'
import authOptions from '@/src/lib/auth'

export default NextAuth(authOptions)