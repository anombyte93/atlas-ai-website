// Lead scoring algorithm - aligned with frontend form values
export interface LeadData {
  name: string
  email: string
  company?: string
  service?: string  // Added: Service selection scoring
  teamSize?: string  // Using camelCase (TypeScript convention)
  timeline?: string
  message?: string
  referral?: string
}

export interface ScoredLead extends LeadData {
  score: number
  qualified: boolean
}

export function calculateLeadScore(data: LeadData): number {
  let score = 0

  // Service scoring (up to 25 points) - Added to match frontend
  if (data.service) {
    const serviceMap: Record<string, number> = {
      'Profit Optimization': 25,
      'Performance Automation': 20,
      'Cybersecurity AI': 20,
      'Custom AI Infrastructure': 25,
      'Not sure yet': 5,
    }
    score += serviceMap[data.service] || 0
  }

  // Team size scoring (up to 25 points)
  if (data.teamSize) {
    const teamSizeMap: Record<string, number> = {
      '1-5': 10,
      '6-20': 15,
      '21-50': 20,
      '51-200': 25,
      '200+': 20,
    }
    score += teamSizeMap[data.teamSize] || 0
  }

  // Timeline scoring (up to 25 points) - Updated to match frontend values
  if (data.timeline) {
    const timelineMap: Record<string, number> = {
      'ASAP': 25,        // Increased from 15
      '1-2 months': 20,  // Increased from 12
      '3-6 months': 10,  // Increased from 8
      'Just exploring': 5, // Increased from 2
      // Removed '6+ months' (form doesn't send this value)
    }
    score += timelineMap[data.timeline] || 0
  }

  // Message quality (up to 15 points)
  if (data.message && data.message.length > 50) {
    score += 10
    if (data.message.length > 150) {
      score += 5
    }
  }

  // Company presence (up to 10 points)
  if (data.company && data.company.length > 0) {
    score += 10
  }

  // Referral bonus (up to 15 points)
  if (data.referral) {
    const referralMap: Record<string, number> = {
      'Google': 15,
      'LinkedIn': 12,
      'Referral': 15,
      'Social media': 10,
      'Other': 5,
    }
    score += referralMap[data.referral] || 5
  }

  return Math.min(score, 100) // Cap at 100
}

export function qualifyLead(data: LeadData): ScoredLead {
  const score = calculateLeadScore(data)
  return {
    ...data,
    score,
    qualified: score >= 50,
  }
}
