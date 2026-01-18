import { db } from '@/src/db'
import { adminUsers } from '@/src/db/schema'
import { eq } from 'drizzle-orm'

/**
 * Check if a user email is registered as an admin
 * This prevents any authenticated Supabase user from accessing admin routes
 */
export async function isAdminUser(email: string): Promise<boolean> {
  if (!email) return false

  try {
    const admins = await db.select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1)

    return admins.length > 0
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Get admin user record by email
 */
export async function getAdminUser(email: string) {
  if (!email) return null

  try {
    const admins = await db.select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1)

    return admins[0] || null
  } catch (error) {
    console.error('Error getting admin user:', error)
    return null
  }
}
