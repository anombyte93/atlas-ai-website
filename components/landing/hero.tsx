/* eslint-disable react/no-unescaped-entities */
export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(12, 18, 32, 0.85) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`
        }}
      ></div>
      <div className="relative z-10 text-center text-white max-w-[800px] px-6">
        <h1 className="serif text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6 drop-shadow-[0_2px_40px_rgba(0,0,0,0.3)]">
          Governed AI systems for businesses that can't afford guesswork
        </h1>
        <p className="text-lg opacity-90 max-w-[600px] mx-auto mb-12 leading-relaxed">
          We design and install auditable AI workflows that reduce cost, risk, and time-to-decision.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#contact" className="btn btn-white">Book a Strategy Call</a>
          <a href="#process" className="btn btn-secondary">See How It Works</a>
        </div>
      </div>
    </section>
  );
}
