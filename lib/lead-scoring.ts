// Lead scoring algorithm - extracted from the original HTML form
export interface LeadData {
  name: string
  email: string
  company?: string
  teamSize?: string
  timeline?: string
  budget?: string
  message?: string
  referral?: string
}

export interface ScoredLead extends LeadData {
  score: number
  qualified: boolean
}

export function calculateLeadScore(data: LeadData): number {
  let score = 0

  // Team size scoring (up to 20 points)
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

  // Timeline scoring (up to 15 points)
  if (data.timeline) {
    const timelineMap: Record<string, number> = {
      'ASAP': 15,
      '1-2 months': 12,
      '3-6 months': 8,
      '6+ months': 4,
      'Just exploring': 2,
    }
    score += timelineMap[data.timeline] || 0
  }

  // Budget scoring (up to 25 points)
  if (data.budget) {
    const budgetMap: Record<string, number> = {
      '<$5,000': 5,
      '$5-10,000': 12,
      '$10-25,000': 18,
      '$25,000-50,000': 25,
      '$50,000+': 25,
    }
    score += budgetMap[data.budget] || 0
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
