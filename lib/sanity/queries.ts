/**
 * GROQ Queries for Sanity CMS
 *
 * GROQ (Graph-Relational Object Queries) is Sanity's query language.
 * These queries fetch content from the CMS for display on the website.
 */

import { sanityFetch } from './client'

/**
 * TypeScript interfaces for Sanity content structures
 */
export interface LandingPage {
  _id: string
  title: string
  description?: string
  hero?: HeroSection
  services?: ServiceItem[]
  pricing?: PricingSection
}

export interface HeroSection {
  headline?: string
  subheadline?: string
  cta?: string
}

export interface ServiceItem {
  title?: string
  description?: string
}

export interface PricingSection {
  title?: string
  plans?: PricingPlan[]
}

export interface PricingPlan {
  name?: string
  price?: string
  description?: string
  features?: string
}

/**
 * Query for the entire landing page content
 */
const LANDING_PAGE_QUERY = `*[_type == "landingPage"][0]{
  _id,
  title,
  description,
  hero{
    headline,
    subheadline,
    cta
  },
  services[]{
    title,
    description
  },
  pricing{
    title,
    plans[]{
      name,
      price,
      description,
      features
    }
  }
}`

/**
 * Fetch landing page content from Sanity
 * @returns Landing page content or null
 */
export async function getLandingPage(): Promise<LandingPage | null> {
  try {
    return await sanityFetch<LandingPage | null>({
      query: LANDING_PAGE_QUERY,
      tags: ['landing-page'],
    })
  } catch (error) {
    console.error('Error fetching landing page from Sanity:', error)
    return null
  }
}

/**
 * Query for just the hero section content
 */
const HERO_QUERY = `*[_type == "landingPage"][0].hero{
  headline,
  subheadline,
  cta
}`

/**
 * Fetch hero section content from Sanity
 */
export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    return await sanityFetch<HeroSection | null>({
      query: HERO_QUERY,
      tags: ['hero'],
    })
  } catch (error) {
    console.error('Error fetching hero from Sanity:', error)
    return null
  }
}

/**
 * Query for services content
 */
const SERVICES_QUERY = `*[_type == "landingPage"][0].services[]{
  title,
  description
}`

/**
 * Fetch services from Sanity
 */
export async function getServices(): Promise<ServiceItem[] | null> {
  try {
    return await sanityFetch<ServiceItem[] | null>({
      query: SERVICES_QUERY,
      tags: ['services'],
    })
  } catch (error) {
    console.error('Error fetching services from Sanity:', error)
    return null
  }
}

/**
 * Query for pricing content
 */
const PRICING_QUERY = `*[_type == "landingPage"][0].pricing{
  title,
  plans[]{
    name,
    price,
    description,
    features
  }
}`

/**
 * Fetch pricing from Sanity
 */
export async function getPricing(): Promise<PricingSection | null> {
  try {
    return await sanityFetch<PricingSection | null>({
      query: PRICING_QUERY,
      tags: ['pricing'],
    })
  } catch (error) {
    console.error('Error fetching pricing from Sanity:', error)
    return null
  }
}
