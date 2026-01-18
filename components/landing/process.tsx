export function Process() {
  const steps = [
    {
      number: 1,
      title: "Discovery & Audit (Week 1-2)",
      description: "Business deep dive, security assessment, and ROI projection."
    },
    {
      number: 2,
      title: "MCP Architecture Design (Week 3-4)",
      description: "Server design, security model, and integration planning."
    },
    {
      number: 3,
      title: "Development & Integration (Week 5-10)",
      description: "Build MCP servers, connect AI, and test with your team."
    },
    {
      number: 4,
      title: "Deployment & Optimization (Week 11-12)",
      description: "Production rollout, training, and ongoing support."
    }
  ];

  return (
    <section id="process" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">
            How we work
          </h2>
          <p className="text-[var(--muted)] max-w-[500px] mx-auto">
            A detailed 4-phase implementation designed for enterprise results
          </p>
          <p className="mt-3 text-[var(--muted)]">12 weeks from kickoff to live</p>
          <p className="mt-3 font-semibold">Investment: Starting from $100,000</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-14 h-14 border-2 border-[var(--charcoal)] rounded-full flex items-center justify-center mx-auto mb-5 font-semibold text-lg">
                {step.number}
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-[var(--muted)] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
