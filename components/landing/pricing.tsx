export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">
            Investment
          </h2>
          <p className="text-[var(--muted)] max-w-[500px] mx-auto">
            Starting from $100,000 (typically $100k-$250k)
          </p>
          <p className="mt-3 text-[var(--muted)]">Most clients see positive ROI within 6 months.</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8">
          <div className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">What&apos;s included</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Custom MCP servers, AI models, integration, security, training, and 90-day support.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
              Built to production standards
            </div>
          </div>

          <div className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">ROI timeline</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Operational savings and revenue lift compound quickly once MCP automations are live.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
              Positive ROI within 6 months
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8 mt-8">
          <div className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">Profit Lift</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Better pricing and forecasting.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
              +10–20% margin impact
            </div>
          </div>

          <div className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">Cost Reduction</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Automation of manual workflows.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
              -20–40% operational hours
            </div>
          </div>

          <div className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">Risk Reduction</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Proactive security controls.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
              30–60% faster response
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
