import { CaseStudy } from '@/lib/sanity/queries';

interface CaseStudiesProps {
  caseStudiesData?: CaseStudy[] | null;
}

/* eslint-disable react/no-unescaped-entities */
export function CaseStudies({ caseStudiesData }: CaseStudiesProps) {
  // Default case studies - used as fallback when Sanity has no data
  const defaultCases: CaseStudy[] = [
    {
      company: "Fleet Management SaaS",
      industry: "Logistics",
      problem: "Manual invoice processing was causing 15+ day payment delays and unhappy vendors.",
      whatWasntAutomated: "Vendor negotiation and strategic decisions remained human-only.",
      whatWasBuilt: "AI-powered invoice data extraction, validation against purchase orders, and automatic payment routing.",
      howValidated: "3-month pilot with 500+ invoices, 99.2% accuracy, human review of edge cases.",
      outcome: "Payment cycle reduced from 15 days to 3 days. 80% reduction in manual processing time."
    },
    {
      company: "Professional Services Firm",
      industry: "Legal/Compliance",
      problem: "Contract review was a bottleneck—senior lawyers spending 60% of time on routine document analysis.",
      whatWasntAutomated: "Legal judgment, client advice, and high-risk clause negotiation.",
      whatWasBuilt: "AI contract analysis for risk flags, clause extraction, and precedent search with full audit trail.",
      howValidated: "Blinded test against human reviewers, measured consistency and false-positive rates.",
      outcome: "Senior lawyer time freed from 60% to 15% for routine reviews. Risk detection improved by 40%."
    },
    {
      company: "Financial Services",
      industry: "Banking",
      problem: "Customer onboarding had 40% drop-off due to complex verification processes.",
      whatWasntAutomated: "Final approval decisions, high-risk account reviews, and regulatory overrides.",
      whatWasBuilt: "AI-assisted document verification, risk scoring, and automated decision routing with explainable outputs.",
      howValidated: "Regression testing on 10,000 historical applications, fairness audits across demographic groups.",
      outcome: "Drop-off reduced from 40% to 18%. Compliance audit time reduced by 70%."
    }
  ];

  const cases = caseStudiesData && caseStudiesData.length > 0 ? caseStudiesData : defaultCases;

  return (
    <section id="case-studies" className="py-32 px-6 bg-[var(--cream)]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--cyan)] mb-4 block">
            Evidence, not logos
          </span>
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-6">
            Proof & Case Studies
          </h2>
          <p className="text-[var(--muted)] max-w-[600px] mx-auto text-lg">
            You don't need big logos—you need evidence. Here's what we've built, how we validated it, and what changed.
          </p>
        </div>

        <div className="space-y-12 max-w-[1000px] mx-auto">
          {cases.map((study, index) => (
            <div key={index} className="bg-white p-10 rounded-2xl shadow-sm">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-black/10">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{study.company}</h3>
                  <p className="text-[var(--cyan)] text-sm font-medium">{study.industry}</p>
                </div>
                <div className="bg-[var(--cyan)] text-white px-4 py-2 rounded-lg">
                  <p className="text-sm font-semibold">Verified</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                      Problem
                    </h4>
                    <p className="text-[var(--charcoal)] leading-relaxed">{study.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                      What wasn't automated
                    </h4>
                    <p className="text-[var(--charcoal)] leading-relaxed">{study.whatWasntAutomated}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                      What was built
                    </h4>
                    <p className="text-[var(--charcoal)] leading-relaxed">{study.whatWasBuilt}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                      How it was validated
                    </h4>
                    <p className="text-[var(--charcoal)] leading-relaxed">{study.howValidated}</p>
                  </div>

                  <div className="bg-[var(--cream)] p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                      Measured outcome
                    </h4>
                    <p className="text-[var(--charcoal)] leading-relaxed font-medium">{study.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-black/10">
          <p className="text-[var(--muted)] mb-6 text-lg">
            Want similar outcomes? Let's talk about what's possible for your business.
          </p>
          <a href="#contact" className="btn btn-primary">
            Discuss Your Use Case
          </a>
        </div>
      </div>
    </section>
  );
}
