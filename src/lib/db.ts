import { Redis } from '@upstash/redis'
import { createClient } from '@supabase/supabase-js'

// Upstash client for Redis. Used for real-time data storage.
export const redisDb = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

// Supabase client for PostgreSQL. Used for general data storage.
export const postgresqlDb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)
