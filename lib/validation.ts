import { z } from 'zod'

/**
 * Validation schemas for lead submission
 * Prevents invalid data from polluting the database
 */
export const leadSubmissionSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters')
    .trim(),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  company: z.string()
    .max(255, 'Company name must be less than 255 characters')
    .trim()
    .optional(),
  // Service selection for lead scoring
  service: z.enum([
    'Profit Optimization',
    'Performance Automation',
    'Cybersecurity AI',
    'Custom AI Infrastructure',
    'Not sure yet'
  ]).optional(),
  // Team size - uses camelCase (TypeScript convention), form sends snake_case (team_size)
  teamSize: z.enum(['1-5', '6-20', '21-50', '51-200', '200+'])
    .optional(),
  // Timeline - updated to match frontend form values (removed '6+ months')
  timeline: z.enum(['ASAP', '1-2 months', '3-6 months', 'Just exploring'])
    .optional(),
  message: z.string()
    .max(5000, 'Message must be less than 5000 characters')
    .trim()
    .optional(),
  referral: z.enum(['Google', 'LinkedIn', 'Referral', 'Social media', 'Other'])
    .optional(),
})

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>

/**
 * Sanitize string input to prevent XSS attacks
 * This is a basic sanitization - for production, consider using a library like sanitize-html
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Validate and sanitize lead submission
 * @throws {ZodError} If validation fails
 */
export function validateLeadSubmission(data: unknown): LeadSubmission {
  const validated = leadSubmissionSchema.parse(data)

  // Sanitize text fields to prevent XSS
  return {
    ...validated,
    name: sanitizeInput(validated.name),
    company: validated.company ? sanitizeInput(validated.company) : undefined,
    message: validated.message ? sanitizeInput(validated.message) : undefined,
  }
}
