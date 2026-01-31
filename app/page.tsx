import { Navigation } from '@/components/landing/navigation';
import { Hero } from '@/components/landing/hero';
import { Services } from '@/components/landing/services';
import { Governance } from '@/components/landing/governance';
import { CaseStudies } from '@/components/landing/case-studies';
import { Process } from '@/components/landing/process';
import { Pricing } from '@/components/landing/pricing';
import { Technical } from '@/components/landing/technical';
import { Testimonial } from '@/components/landing/testimonial';
import { MCPComparison } from '@/components/landing/mcp-comparison';
import { ContactForm } from '@/components/landing/contact-form';
import { Footer } from '@/components/landing/footer';
import { getLandingPage } from '@/lib/sanity/queries';

/**
 * Home Page - Server Component
 *
 * Fetches content from Sanity CMS and passes it to child components.
 * Falls back to default content if Sanity data is unavailable.
 */
export default async function Home() {
  // Fetch content from Sanity CMS
  const sanityData = await getLandingPage();

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero heroData={sanityData?.hero} />
      <Services servicesData={sanityData?.services} />
      <Governance />
      <CaseStudies caseStudiesData={sanityData?.caseStudies} />
      <Process />
      <Pricing pricingData={sanityData?.pricing} />
      <Technical />
      <Testimonial testimonialData={sanityData?.testimonial} />
      <MCPComparison />
      <ContactForm />
      <Footer />
    </main>
  );
}
