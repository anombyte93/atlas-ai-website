import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/src/db'
import { leads } from '@/src/db/schema'
import { qualifyLead } from '@/lib/lead-scoring'
import { validateLeadSubmission } from '@/lib/validation'
import { eq, desc, and } from 'drizzle-orm'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-check'

// Optional rate limiting (only if Upstash Redis is configured)
let ratelimit: any = null
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const { Ratelimit } = require('@upstash/ratelimit')
    const { Redis } = require('@upstash/redis')
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1h'),
      analytics: false, // Disabled: requires /pipeline endpoint
      prefix: 'atlas_ai:lead_submission',
    })
  } catch (error) {
    console.warn('Rate limiting disabled: Upstash Redis not configured')
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check (prevents spam and DoS attacks) - only if configured
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous'
      const { success } = await ratelimit.limit(ip)

      if (!success) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 } // HTTP 429 Too Many Requests
        )
      }
    }

    const body = await request.json()

    // Transform snake_case (from form) to camelCase (for database/API layer)
    // Note: validation schema uses snake_case (team_size) but DB uses camelCase (teamSize)
    const transformedBody = {
      name: body.name,
      email: body.email,
      company: body.company,
      service: body.service,        // Added: service field
      teamSize: body.team_size,     // team_size from form → teamSize for validation
      timeline: body.timeline,
      message: body.message,
      referral: body.referral,
    }

    // Validate and sanitize input
    const validatedData = validateLeadSubmission(transformedBody)

    // Calculate lead score and qualification (now includes service scoring)
    const scoredLead = qualifyLead(validatedData)

    // Insert lead into database
    const [lead] = await db.insert(leads).values({
      name: scoredLead.name,
      email: scoredLead.email,
      company: scoredLead.company,
      service: scoredLead.service,         // Service field for lead scoring
      teamSize: scoredLead.teamSize,       // Already camelCase from qualifyLead
      timeline: scoredLead.timeline,
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
    // SECURITY: Check authentication and authorization
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      )
    }

    // Check if user is an admin (prevents any authenticated user from accessing lead data)
    const isAdmin = await isAdminUser(user.email || '')
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

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
