/* eslint-disable react/no-unescaped-entities */
export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`
        }}
      ></div>
      <div className="relative z-10 text-center text-white max-w-[900px] px-6">
        <h1 className="serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.02em] mb-6 drop-shadow-[0_2px_40px_rgba(0,0,0,0.3)]">
          Governed AI systems for businesses that can't afford guesswork
        </h1>
        <p className="text-lg opacity-90 max-w-[600px] mx-auto mb-10">
          We design and install auditable AI workflows that reduce cost, risk, and time-to-decision.
        </p>

        {/* Three Pillars */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10 max-w-[700px] mx-auto">
          <div className="flex items-center gap-2 text-base">
            <span className="text-green-400 text-xl">✅</span>
            <span className="font-medium">Governed</span>
            <span className="text-sm opacity-80">— auditable, explainable, documented</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-green-400 text-xl">✅</span>
            <span className="font-medium">Integrated</span>
            <span className="text-sm opacity-80">— fits real tools and workflows</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="text-green-400 text-xl">✅</span>
            <span className="font-medium">Outcome-driven</span>
            <span className="text-sm opacity-80">— measurable business impact</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#contact" className="btn btn-white">Get an AI Readiness Assessment</a>
          <a href="#process" className="btn btn-secondary">See How It Works</a>
        </div>
      </div>
    </section>
  );
}
