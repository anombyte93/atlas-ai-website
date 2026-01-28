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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Governance />
      <CaseStudies />
      <Process />
      <Pricing />
      <Technical />
      <Testimonial />
      <MCPComparison />
      <ContactForm />
      <Footer />
    </main>
  );
}
