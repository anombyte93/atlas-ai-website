import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Global database connection (lazy initialization)
let _db: ReturnType<typeof drizzle> | null = null

function getConnectionString() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL
}

export function getDb() {
  if (!_db) {
    const connectionString = getConnectionString()

    if (!connectionString) {
      throw new Error('DATABASE_URL or POSTGRES_URL environment variable is required')
    }

    const client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    })

    _db = drizzle(client, { schema })
  }

  return _db
}

// Export a proxy that lazy loads the database
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const db = getDb()
    return db[prop as keyof typeof db]
  },
}) as unknown as ReturnType<typeof drizzle>

// Export the schema for use in queries
export * from './schema'
