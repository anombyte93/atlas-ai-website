import { createClient } from 'next-sanity'

/**
 * Sanity CMS Client Configuration
 *
 * This client connects to the Sanity CMS for fetching content.
 * Uses environment variables for project configuration.
 */

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gdf6dsgi',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  // Use CDN for production builds, bypass only in development for instant updates
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl: '/studio',
  },
})

/**
 * Helper function to fetch content from Sanity
 * @param query - GROQ query string
 * @param params - Query parameters
 * @returns Query results
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  const isDevelopment = process.env.NODE_ENV === 'development'

  const result = await client.fetch<T>(query, params, {
    // Bypass cache in development for instant content updates
    cache: isDevelopment ? 'no-store' : 'force-cache',
    next: { tags, revalidate: isDevelopment ? 0 : 3600 },
  })

  // Log in development for debugging
  if (isDevelopment) {
    console.log('[Sanity] Query result:', JSON.stringify(result, null, 2))
  }

  return result
}
