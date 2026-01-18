import { NextResponse } from 'next/server'
import { db } from '@/src/db'
import { services } from '@/src/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allServices = await db.select().from(services).where(eq(services.active, true))
    return NextResponse.json(allServices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
