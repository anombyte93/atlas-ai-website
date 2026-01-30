import { ServiceItem } from '@/lib/sanity/queries';

interface ServicesProps {
  servicesData?: ServiceItem[] | null;
}

/* eslint-disable react/no-unescaped-entities */
export function Services({ servicesData }: ServicesProps) {
  // Default services data - used as fallback when Sanity has no data
  const defaultServices: ServiceItem[] = [
    {
      title: 'AI Readiness & Risk Audit',
      description: 'For: Businesses considering AI but unsure where or how to start. Includes: Automation opportunities map, AI risk & governance gaps, Clear do/don\'t automate guidance, Written report + recommendation call.',
    },
    {
      title: 'Governed AI Workflow Installation',
      description: 'What this means: We don\'t just add AI. We install systems with checks, logs, and ownership. Includes: Defined agent roles, Validation & quality gates, Audit trail & logging, Documentation & handoff.',
    },
    {
      title: 'Evidence & Observability Layer',
      description: 'Why it matters: If AI decisions can\'t be proven, they can\'t be trusted. Includes: Logs & metrics dashboards, Alerts & anomaly detection, Decision traceability, Proof of correctness.',
    },
    {
      title: 'Enablement & Handoff',
      description: 'Signals: Maturity and confidence. We don\'t create dependencies. Includes: Team training sessions, Complete documentation, Ownership transfer, Exit criteria & support.',
    },
  ];

  const services = servicesData && servicesData.length > 0 ? servicesData : defaultServices;

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

          {services.map((service, index) => (
            <div
              key={index}
              className={`p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${
                index === 1
                  ? 'bg-[var(--navy)] text-white border-2 border-[var(--cyan)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
                  : 'bg-[var(--cream)]'
              }`}
            >
              {index === 1 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[var(--cyan)] text-white text-xs font-bold px-3 py-1 rounded-full">FLAGSHIP</span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                index === 1 ? 'bg-[var(--cyan)]' : 'bg-[var(--cyan)]'
              }`}>
                <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title || 'Service'}</h3>
              <p className={`text-[0.9375rem] leading-relaxed mb-6 ${
                index === 1 ? 'text-gray-300' : 'text-[var(--muted)]'
              }`}>
                {service.description || 'Service description'}
              </p>
              <div className={`mt-6 pt-6 border-t ${
                index === 1 ? 'border-white/10' : 'border-black/5'
              }`}>
                <a href="#contact" className="text-sm text-[var(--cyan)] font-medium hover:underline">
                  👉 Learn More →
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
