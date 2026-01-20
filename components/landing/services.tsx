/* eslint-disable react/no-unescaped-entities */
export function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">Productized Services</h2>
          <p className="text-[var(--muted)] max-w-[600px] mx-auto text-lg">
            Fixed-scope AI implementations with clear deliverables, timelines, and outcomes. No vague consulting—just systems that work.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-8">

          {/* Service 1: AI Readiness & Risk Audit */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Readiness & Risk Audit</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed mb-6">
              <strong>For:</strong> Businesses considering AI but unsure where or how to start.
            </p>
            <ul className="text-[var(--muted)] text-[0.9375rem] leading-relaxed mb-6 space-y-2">
              <li>✓ Automation opportunities map</li>
              <li>✓ AI risk & governance gaps</li>
              <li>✓ Clear do/don't automate guidance</li>
              <li>✓ Written report + recommendation call</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-black/5">
              <a href="#contact" className="text-sm text-[var(--accent)] font-medium hover:underline">
                👉 Start with an Audit →
              </a>
            </div>
          </div>

          {/* Service 2: Governed AI Workflow Installation */}
          <div className="bg-[var(--charcoal)] text-white p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-2 border-[var(--accent)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">FLAGSHIP</span>
            </div>
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Governed AI Workflow Installation</h3>
            <p className="text-gray-300 text-[0.9375rem] leading-relaxed mb-6">
              <strong>What this means:</strong> We don't just add AI. We install systems with checks, logs, and ownership.
            </p>
            <ul className="text-gray-300 text-[0.9375rem] leading-relaxed mb-6 space-y-2">
              <li>✓ Defined agent roles</li>
              <li>✓ Validation & quality gates</li>
              <li>✓ Audit trail & logging</li>
              <li>✓ Documentation & handoff</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a href="#contact" className="text-sm text-[var(--accent)] font-medium hover:underline">
                👉 Design a Workflow →
              </a>
            </div>
          </div>

          {/* Service 3: Evidence & Observability Layer */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Evidence & Observability Layer</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed mb-6">
              <strong>Why it matters:</strong> If AI decisions can't be proven, they can't be trusted.
            </p>
            <ul className="text-[var(--muted)] text-[0.9375rem] leading-relaxed mb-6 space-y-2">
              <li>✓ Logs & metrics dashboards</li>
              <li>✓ Alerts & anomaly detection</li>
              <li>✓ Decision traceability</li>
              <li>✓ Proof of correctness</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-black/5">
              <a href="#contact" className="text-sm text-[var(--accent)] font-medium hover:underline">
                👉 Make AI Defensible →
              </a>
            </div>
          </div>

          {/* Service 4: Enablement & Handoff */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Enablement & Handoff</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed mb-6">
              <strong>Signals:</strong> Maturity and confidence. We don't create dependencies.
            </p>
            <ul className="text-[var(--muted)] text-[0.9375rem] leading-relaxed mb-6 space-y-2">
              <li>✓ Team training sessions</li>
              <li>✓ Complete documentation</li>
              <li>✓ Ownership transfer</li>
              <li>✓ Exit criteria & support</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-black/5">
              <a href="#contact" className="text-sm text-[var(--accent)] font-medium hover:underline">
                👉 Make It Sustainable →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
