import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/src/db'
import { portfolioProjects } from '@/src/db/schema'

export async function GET() {
  try {
    const projects = await db.select().from(portfolioProjects).orderBy(portfolioProjects.sortOrder)
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}
