import { PricingSection, PricingPlan } from '@/lib/sanity/queries';

interface PricingProps {
  pricingData?: PricingSection | null;
}

export function Pricing({ pricingData }: PricingProps) {
  // Default pricing data - used as fallback when Sanity has no data
  const defaultPlans: PricingPlan[] = [
    {
      name: "What's included",
      price: '$100,000 - $250,000',
      description: 'Custom MCP servers, AI models, integration, security, training, and 90-day support.',
      features: 'Built to production standards',
    },
    {
      name: 'ROI timeline',
      price: 'Positive ROI within 6 months',
      description: 'Operational savings and revenue lift compound quickly once MCP automations are live.',
      features: 'Most clients see positive ROI within 6 months',
    },
    {
      name: 'Profit Lift',
      price: '+10–20% margin impact',
      description: 'Better pricing and forecasting.',
      features: 'Margin impact through pricing optimization',
    },
    {
      name: 'Cost Reduction',
      price: '-20–40% operational hours',
      description: 'Automation of manual workflows.',
      features: 'Operational efficiency gains',
    },
    {
      name: 'Risk Reduction',
      price: '30–60% faster response',
      description: 'Proactive security controls.',
      features: 'Enhanced security posture',
    },
  ];

  const plans = pricingData?.plans && pricingData.plans.length > 0 ? pricingData.plans : defaultPlans;
  const sectionTitle = pricingData?.title || 'Investment';

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">
            {sectionTitle}
          </h2>
          <p className="text-[var(--muted)] max-w-[500px] mx-auto">
            Starting from $100,000 (typically $100k-$250k)
          </p>
          <p className="mt-3 text-[var(--muted)]">Most clients see positive ROI within 6 months.</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8">
          {plans.slice(0, 2).map((plan, index) => (
            <div key={index} className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <h3 className="text-xl font-semibold mb-3">{plan.name || 'Plan'}</h3>
              {plan.price && <p className="text-[var(--cyan)] font-semibold text-lg mb-3">{plan.price}</p>}
              <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
                {plan.description || 'Plan description'}
              </p>
              {plan.features && (
                <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
                  {plan.features}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8 mt-8">
          {plans.slice(2).map((plan, index) => (
            <div key={index + 2} className="bg-[var(--cream)] p-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <h3 className="text-xl font-semibold mb-3">{plan.name || 'Plan'}</h3>
              {plan.price && <p className="text-[var(--cyan)] font-semibold text-lg mb-3">{plan.price}</p>}
              <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">
                {plan.description || 'Plan description'}
              </p>
              {plan.features && (
                <div className="mt-6 pt-6 border-t border-black/5 text-sm text-[var(--cyan)] font-medium">
                  {plan.features}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
