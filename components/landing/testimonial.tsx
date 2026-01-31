import { TestimonialSection } from '@/lib/sanity/queries';

interface TestimonialProps {
  testimonialData?: TestimonialSection | null;
}

export function Testimonial({ testimonialData }: TestimonialProps) {
  // Use Sanity data if available, otherwise use defaults
  const quote = testimonialData?.quote || 'Atlas AI transformed how we handle client onboarding. What used to take our team 3 hours now happens automatically in minutes.';
  const author = testimonialData?.author || 'Sarah Chen, Operations Director';

  return (
    <section className="bg-[var(--charcoal)] text-white py-32 px-6">
      <div className="container-custom">
        <div className="max-w-[800px] mx-auto text-center">
          <blockquote className="serif text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.4] mb-8">
            &quot;{quote}&quot;
          </blockquote>
          <cite className="not-italic opacity-70">{author}</cite>
        </div>
      </div>
    </section>
  );
}
