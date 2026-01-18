export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`
        }}
      ></div>
      <div className="relative z-10 text-center text-white max-w-[800px] px-6">
        <h1 className="serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.02em] mb-6 drop-shadow-[0_2px_40px_rgba(0,0,0,0.3)]">
          Transform Your Business with AI
        </h1>
        <p className="text-lg opacity-90 max-w-[500px] mx-auto mb-10">
          We integrate AI into your systems to maximize profit, optimize performance, and secure your operations.
        </p>
        <p className="text-[0.95rem] tracking-[0.04em] uppercase opacity-85 -mt-5 mb-10">
          Trusted by Australian businesses | $100k+ enterprise implementations
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#contact" className="btn btn-white">Start a conversation</a>
          <a href="#services" className="btn btn-secondary">See our work</a>
        </div>
      </div>
    </section>
  );
}
