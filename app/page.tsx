import { Navigation } from '@/components/landing/navigation';
import { Hero } from '@/components/landing/hero';
import { MCPComparison } from '@/components/landing/mcp-comparison';
import { Services } from '@/components/landing/services';
import { Testimonial } from '@/components/landing/testimonial';
import { Technical } from '@/components/landing/technical';
import { Process } from '@/components/landing/process';
import { Pricing } from '@/components/landing/pricing';
import { ContactForm } from '@/components/landing/contact-form';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <MCPComparison />
      <Services />
      <Testimonial />
      <Technical />
      <Process />
      <Pricing />
      <ContactForm />
      <Footer />
    </main>
  );
}
