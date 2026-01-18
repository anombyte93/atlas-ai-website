export function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">What we deliver</h2>
          <p className="text-[var(--muted)] max-w-[500px] mx-auto">
            Premium AI consulting focused on profit, performance, and security
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8">
          {/* Profit Optimization */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Profit Optimization</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              AI-driven pricing, forecasting, and customer lifetime value modeling connected to your MCP-enabled sales data.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--accent)] font-medium">
              Profit-focused decisions in real time
            </div>
          </div>

          {/* Performance Automation */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Performance Automation</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Document processing, invoicing, onboarding, and approvals automated end-to-end.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--accent)] font-medium">
              Hours saved per workflow, every week
            </div>
          </div>

          {/* Cybersecurity AI */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Cybersecurity AI</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Threat detection, incident response playbooks, and security training powered by AI.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--accent)] font-medium">
              Lower risk with faster response
            </div>
          </div>

          {/* Custom AI Infrastructure */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Custom AI Infrastructure</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              MCP servers tailored to your business with secure access, logging, and integration into core systems.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--accent)] font-medium">
              Enterprise-grade AI foundation
            </div>
          </div>

          {/* Knowledge Systems (RAG) */}
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Knowledge Systems (RAG)</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
              Build AI that knows your business. We connect AI to your documents, databases, and APIs using enterprise-grade retrieval systems.
            </p>
            <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--accent)] font-medium">
              Chat with your data in milliseconds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
