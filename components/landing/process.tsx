/* eslint-disable react/no-unescaped-entities */
export function Process() {
  const steps = [
    {
      number: 1,
      title: "Assess",
      subtitle: "Readiness, risk, opportunity",
      description: "We evaluate your current systems, identify automation opportunities, and map out AI risks. You get a clear picture of what's possible and what's prudent."
    },
    {
      number: 2,
      title: "Design",
      subtitle: "Workflows + governance",
      description: "We architect AI workflows that fit your existing tools and processes. Every decision includes guardrails, validation checkpoints, and audit trails."
    },
    {
      number: 3,
      title: "Build",
      subtitle: "Integrated systems",
      description: "We implement governed AI systems that work with your existing infrastructure. No rip-and-replace—just smart augmentation of what you already have."
    },
    {
      number: 4,
      title: "Validate",
      subtitle: "Quality & evidence",
      description: "We prove it works. Quality gates, accuracy tests, and performance benchmarks. You get evidence, not promises."
    },
    {
      number: 5,
      title: "Handoff",
      subtitle: "Documentation & ownership",
      description: "We transfer knowledge, documentation, and operational ownership. You run it. We're available if you need us, but you're not dependent on us."
    }
  ];

  return (
    <section id="process" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--cyan)] mb-4 block">
            Process transparency builds trust
          </span>
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-6">
            How it works
          </h2>
          <p className="text-[var(--muted)] max-w-[700px] mx-auto text-lg mb-8">
            A simple 5-step flow from assessment to sustainable operations. No surprises, no scope creep, no black boxes.
          </p>
          <div className="bg-[var(--charcoal)] text-white inline-block px-6 py-3 rounded-lg">
            <p className="font-semibold text-lg">
              We don't deploy AI without validation and exit criteria.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-[1200px] mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-xl text-white">
                {step.number}
              </div>
              <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
              <p className="text-[var(--cyan)] text-sm font-medium mb-3">{step.subtitle}</p>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-black/10">
          <p className="text-[var(--muted)] mb-6 text-lg">
            Ready to see how this would work for your business?
          </p>
          <a href="#contact" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
