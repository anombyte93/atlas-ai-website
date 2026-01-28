/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  service: string;
  company: string;
  team_size: string;
  timeline: string;
  message: string;
  referral: string;
}

export function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    company: '',
    team_size: '',
    timeline: '',
    message: '',
    referral: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Please enter your name';
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.service) {
        newErrors.service = 'Please select a service';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct email body from form data
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Service: ${formData.service}
Company: ${formData.company || 'Not provided'}
Team Size: ${formData.team_size || 'Not provided'}
Timeline: ${formData.timeline || 'Not provided'}
Message: ${formData.message || 'Not provided'}
Referral: ${formData.referral || 'Not provided'}
    `.trim();

    // Open email client with pre-filled information
    const subject = encodeURIComponent(`Atlas AI Inquiry: ${formData.name} - ${formData.service}`);
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:contact@atlas-ai.au?subject=${subject}&body=${body}`;

    // Show success state after brief delay
    setTimeout(() => {
      setCurrentStep(4);
      setIsSubmitting(false);
    }, 500);
  };

  const openCalBooking = () => {
    // Use email fallback instead of broken Cal.com link
    window.location.href = 'mailto:contact@atlas-ai.au?subject=Atlas%20AI%20Strategy%20Call%20Booking';
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-[#1a3a2f] to-[#2d5a4a] text-white py-32 px-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Contact Info */}
          <div>
            <h2 className="serif text-[clamp(2rem,4vw,2.75rem)] font-normal mb-6">
              Serious about governed AI?
            </h2>
            <p className="opacity-85 mb-8 leading-relaxed">
              Let's talk about what responsible AI looks like for your business. We start with a governance conversation, not a sales pitch.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 opacity-90">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09a2 2 0 0 1 2 1.72l.5 3a2 2 0 0 1-.55 1.82L8.9 11a16 16 0 0 0 4.1 4.1l1.46-1.14a2 2 0 0 1 1.82-.55l3 .5A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+61494010006" className="text-white no-underline hover:underline">
                  +61 494 010 006
                </a>
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <a href="mailto:contact@atlas-ai.au" className="text-white no-underline hover:underline">
                  contact@atlas-ai.au
                </a>
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span>Mon-Fri, 9am-5pm AWST</span>
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Perth, Western Australia</span>
              </div>
            </div>
          </div>

          {/* Multi-step Form */}
          <div className="bg-white rounded-xl p-12 text-[var(--charcoal)]">
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`progress-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    step === currentStep ? 'bg-[var(--cyan)] scale-125' : step < currentStep ? 'bg-[var(--success)]' : 'bg-[#ddd]'
                  }`}
                  data-step={step}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Error message display */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6" role="alert" aria-live="polite">
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl mb-2 text-center">Let&apos;s get started</h3>
                  <p className="text-[var(--muted)] text-center mb-8 text-[0.9375rem]">
                    Tell us a bit about yourself
                  </p>

                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your name *</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className={`w-full px-4 py-3.5 border rounded-xl ${errors.name ? 'border-[var(--error)]' : 'border-[#ddd]'}`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-[var(--error)] text-xs mt-1.5" role="alert" aria-live="polite">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Work email *</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com.au"
                      className={`w-full px-4 py-3.5 border rounded-xl ${errors.email ? 'border-[var(--error)]' : 'border-[#ddd]'}`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-[var(--error)] text-xs mt-1.5" role="alert" aria-live="polite">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" id="service-label">How can we help? *</label>
                    <div
                      role="radiogroup"
                      aria-labelledby="service-label"
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      className="grid grid-cols-2 gap-3"
                    >
                      {['AI Readiness Assessment', 'Governed AI Workflow', 'Evidence & Observability', 'Team Enablement', 'Not sure yet'].map((service) => (
                        <div key={service} className="radio-option relative">
                          <input
                            type="radio"
                            id={`service_${service}`}
                            name="service"
                            value={service}
                            checked={formData.service === service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="absolute opacity-0"
                          />
                          <label
                            htmlFor={`service_${service}`}
                            className="flex items-center justify-center p-4 border border-[#ddd] rounded-xl cursor-pointer transition-all text-sm text-center hover:border-[var(--cyan)]"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.service && (
                      <p id="service-error" className="text-[var(--error)] text-xs mt-1.5" role="alert" aria-live="polite">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={handleNext} className="btn btn-primary flex-1">
                      Continue
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Qualification */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl mb-2 text-center">Tell us more</h3>
                  <p className="text-[var(--muted)] text-center mb-2 text-[0.9375rem]">
                    Help us understand your needs better
                  </p>
                  <p className="text-[var(--muted)] text-center mb-8 text-xs">
                    Best fit: teams of 20+ or $5M+ annual revenue. Projects start at $100k.
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Company name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Pty Ltd"
                      className="w-full px-4 py-3.5 border border-[#ddd] rounded-xl"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Team size</label>
                    <select
                      value={formData.team_size}
                      onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                      className="w-full px-4 py-3.5 border border-[#ddd] rounded-xl"
                    >
                      <option value="">Select...</option>
                      <option value="1-5">1-5 people</option>
                      <option value="6-20">6-20 people</option>
                      <option value="21-50">21-50 people</option>
                      <option value="51-200">51-200 people</option>
                      <option value="200+">200+ people</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">When do you want to start?</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3.5 border border-[#ddd] rounded-xl"
                    >
                      <option value="">Select...</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-2 months">In 1-2 months</option>
                      <option value="3-6 months">In 3-6 months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={handleBack} className="btn btn-back flex-1">
                      Back
                    </button>
                    <button type="button" onClick={handleNext} className="btn btn-primary flex-1">
                      Continue
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Details + Submit */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl mb-2 text-center">Almost there!</h3>
                  <p className="text-[var(--muted)] text-center mb-8 text-[0.9375rem]">
                    Any details you&apos;d like to share?
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Tell us about your project (optional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What challenges are you facing? What would success look like?"
                      className="w-full px-4 py-3.5 border border-[#ddd] rounded-xl min-h-[100px] resize-y"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                    <select
                      value={formData.referral}
                      onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                      className="w-full px-4 py-3.5 border border-[#ddd] rounded-xl"
                    >
                      <option value="">Select...</option>
                      <option value="Google">Google search</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Friend or colleague</option>
                      <option value="Social media">Social media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={handleBack} className="btn btn-back flex-1">
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Success State */}
              {currentStep === 4 && (
                <div className="animate-fade-in text-center py-10">
                  <div className="w-20 h-20 bg-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl mb-3">Thanks for reaching out!</h3>
                  <p className="text-[var(--muted)] mb-6">
                    We&apos;ve received your request and will get back to you within 24 hours.
                  </p>

                  {/* Always show booking prompt - backend handles lead qualification */}
                  <div className="bg-[rgba(45,90,74,0.05)] rounded-xl p-6">
                    <p className="text-[var(--charcoal)] mb-4"><strong>Want to skip the wait?</strong> Book a discovery call directly:</p>
                    <button type="button" onClick={openCalBooking} className="btn btn-primary">
                      Book a 30-min call
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
