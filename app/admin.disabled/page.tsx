// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getUser, isSupabaseConfigured } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-check'
import { db } from '@/src/db'
import { leads, activityLogs } from '@/src/db/schema'
import { desc, eq, sql } from 'drizzle-orm'
import { AdminNav } from '@/components/admin/nav'
import { StatsCards } from '@/components/admin/stats-cards'
import { LeadTable } from '@/components/admin/lead-table'

export default async function AdminDashboard() {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Configuration Required</h1>
          <p className="text-center text-gray-600">
            Supabase environment variables are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </p>
        </div>
      </div>
    )
  }

  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  // CRITICAL: Check if user is actually an admin
  // This prevents any authenticated Supabase user from accessing admin routes
  const isAdmin = await isAdminUser(user.email || '')

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Access Denied</h1>
          <p className="text-center text-gray-600 mb-4">
            You don&apos;t have permission to access the admin dashboard.
          </p>
          <p className="text-center text-sm text-gray-500">
            If you believe this is an error, contact{' '}
            <a href="mailto:contact@atlas-ai.au" className="text-blue-600 hover:underline">
              contact@atlas-ai.au
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Fetch leads with pagination
  const recentLeads = await db.select()
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(20)

  // Fetch activity logs
  const recentActivity = await db.select()
    .from(activityLogs)
    .orderBy(desc(activityLogs.createdAt))
    .limit(10)

  // Calculate stats
  const [{ count: totalLeads }] = await db.select({ count: sql<number>`count(*)::int` }).from(leads)
  const [{ count: qualifiedLeads }] = await db.select({ count: sql<number>`count(*)::int` })
    .from(leads)
    .where(eq(leads.qualified, true))

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to the Atlas AI admin dashboard
          </p>
        </div>

        <StatsCards total={totalLeads} qualified={qualifiedLeads} />
        <LeadTable leads={recentLeads} />
      </div>
    </div>
  )
}
