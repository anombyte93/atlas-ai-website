export function Testimonial() {
  return (
    <section className="bg-[var(--charcoal)] text-white py-32 px-6">
      <div className="container-custom">
        <div className="max-w-[800px] mx-auto text-center">
          <blockquote className="serif text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.4] mb-8">
            &quot;Atlas AI transformed how we handle client onboarding. What used to take our team 3 hours now happens automatically in minutes.&quot;
          </blockquote>
          <cite className="not-italic opacity-70">Sarah Chen, Operations Director</cite>
        </div>
      </div>
    </section>
  );
}
