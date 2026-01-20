/* eslint-disable react/no-unescaped-entities */
export function Footer() {
  return (
    <footer className="py-16 px-6 bg-[var(--charcoal)] text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Atlas AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Governed AI systems for businesses that can't afford guesswork. We design and install auditable AI workflows that reduce cost, risk, and time-to-decision.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#services" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">Services</a>
              <a href="#governance" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">Governance</a>
              <a href="#case-studies" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">Case Studies</a>
              <a href="#process" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">Our Process</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:contact@atlas-ai.au" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
                contact@atlas-ai.au
              </a>
              <a href="tel:+61494010006" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
                +61 494 010 006
              </a>
              <p className="text-gray-400 text-sm">Perth, Western Australia</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Atlas AI. All rights reserved. Built in Australia.
          </p>
        </div>
      </div>
    </footer>
  );
}
