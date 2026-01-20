/* eslint-disable react/no-unescaped-entities */
export function Governance() {
  return (
    <section id="governance" className="py-32 px-6 bg-[var(--cream)]">
      <div className="container-custom">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block">
              Why serious buyers lean in
            </span>
            <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-6">
              Governance isn't bureaucracy—it's leverage
            </h2>
            <p className="text-[var(--muted)] text-lg">
              Almost no AI consultancies explain this. We believe it's the most important conversation to have before deploying any AI system.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-sm font-bold">1</span>
              How Atlas-AI handles risk
            </h3>
            <div className="bg-white p-8 rounded-2xl space-y-4">
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Risk assessment first.</strong> Before writing a single line of code, we map out what could go wrong: data privacy issues, model hallucinations, regulatory compliance, and operational dependencies.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Mitigation by design.</strong> Every system we build includes guardrails: human-in-the-loop checkpoints, audit trails, rollback procedures, and clear escalation paths.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Transparency as a feature.</strong> You'll always know what the AI is doing, why it made a decision, and how to challenge it. No black boxes.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-sm font-bold">2</span>
              How decisions are validated
            </h3>
            <div className="bg-white p-8 rounded-2xl space-y-4">
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Quality gates at every stage.</strong> We don't ship without validation. Every output passes through accuracy checks, consistency tests, and human review before production.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Continuous monitoring.</strong> Post-deployment, we watch for drift, degradation, and edge cases. If performance drops, we know before you do.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Evidence, not claims.</strong> Every decision is traceable to data sources, model versions, and execution logs. You can prove correctness to auditors, regulators, or yourself.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-sm font-bold">3</span>
              How outputs are audited
            </h3>
            <div className="bg-white p-8 rounded-2xl space-y-4">
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Immutable audit trails.</strong> Every AI interaction is logged: inputs, outputs, timestamps, model versions, and confidence scores. Tamper-evident and always available.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">Explainability by default.</strong> Our systems can explain their reasoning in human-readable terms. No "trust me, it's AI" - we show the work.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--charcoal)]">External audit ready.</strong> Logs are structured, searchable, and exportable for compliance audits, security reviews, or internal investigations.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">!</span>
              When we say <strong className="text-red-600">no</strong> to AI
            </h3>
            <div className="bg-[var(--charcoal)] text-white p-8 rounded-2xl space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Not every problem needs AI. Some actively become worse with it. We will tell you when:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-2 mt-4">
                <li>❌ The cost of AI exceeds the value it creates</li>
                <li>❌ Data quality is insufficient for reliable outcomes</li>
                <li>❌ Regulatory requirements make AI impractical</li>
                <li>❌ A simple rule-based system would work better</li>
                <li>❌ You're not ready for the operational burden of AI</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-6 pt-6 border-t border-white/10">
                <strong className="text-white">We don't deploy AI without validation and exit criteria.</strong> If we can't prove it works, we don't ship it. If we can't hand it off sustainably, we don't build it.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-black/10">
            <p className="text-[var(--muted)] mb-6 text-lg">
              Serious about governance? Let's talk about what responsible AI looks like for your business.
            </p>
            <a href="#contact" className="btn btn-primary">
              Request a Governance Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
