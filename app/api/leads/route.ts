import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/src/db'
import { leads } from '@/src/db/schema'
import { qualifyLead } from '@/lib/lead-scoring'
import { validateLeadSubmission } from '@/lib/validation'
import { eq, desc, and } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Transform snake_case (from form) to camelCase (for database)
    const transformedBody = {
      name: body.name,
      email: body.email,
      company: body.company,
      teamSize: body.team_size,
      timeline: body.timeline,
      budget: body.budget,
      message: body.message,
      referral: body.referral,
    }

    // Validate and sanitize input
    const validatedData = validateLeadSubmission(transformedBody)

    // Calculate lead score and qualification
    const scoredLead = qualifyLead(validatedData)

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
  } catch (error: any) {
    console.error('Error creating lead:', error)

    // Handle duplicate email error
    if (error.code === '23505' || error.message?.includes('unique constraint')) {
      return NextResponse.json(
        { error: 'This email has already been submitted' },
        { status: 409 }
      )
    }

    // Handle Zod validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

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

    let conditions = []

    // Apply filters if provided
    if (status) {
      conditions.push(eq(leads.status, status))
    }
    if (qualified === 'true') {
      conditions.push(eq(leads.qualified, true))
    } else if (qualified === 'false') {
      conditions.push(eq(leads.qualified, false))
    }

    const query = db.select().from(leads)
      .orderBy(desc(leads.createdAt))

    if (conditions.length > 0) {
      query.where(and(...conditions))
    }

    const allLeads = await query.limit(100) // Add pagination limit

    return NextResponse.json(allLeads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
