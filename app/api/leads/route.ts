import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/src/db'
import { leads } from '@/src/db/schema'
import { qualifyLead } from '@/lib/lead-scoring'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Calculate lead score and qualification
    const scoredLead = qualifyLead(body)

    // Insert lead into database
    const [lead] = await db.insert(leads).values({
      name: scoredLead.name,
      email: scoredLead.email,
      company: scoredLead.company,
      teamSize: scoredLead.teamSize,
      timeline: scoredLead.timeline,
      budget: scoredLead.budget,
      message: scoredLead.message,
      referral: scoredLead.referral,
      score: scoredLead.score,
      qualified: scoredLead.qualified,
      status: scoredLead.qualified ? 'qualified' : 'new',
    }).returning()

    return NextResponse.json(
      { success: true, lead },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const qualified = searchParams.get('qualified')

    let query = db.select().from(leads)

    // Apply filters if provided
    // Note: We'll need to import eq from drizzle-orm for filtering
    const allLeads = await db.select().from(leads).orderBy(leads.createdAt)

    return NextResponse.json(allLeads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
