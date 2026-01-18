export function Technical() {
  const cards = [
    {
      title: "RAG Architecture",
      description: "We build retrieval systems that understand your business. Documents → Embeddings → Vector Database → Instant Retrieval. Your AI knows what you know.",
      items: ["Document ingestion & chunking", "Vector database (Pinecone/Vectorize)", "Semantic search & retrieval", "Source attribution & citations"]
    },
    {
      title: "MCP Server Development",
      description: "MCP servers connect AI to your business tools securely. We build custom connectors for CRM, databases, APIs, and internal systems.",
      items: ["Standard protocol (no vendor lock-in)", "Enterprise permissions & logging", "Secure credential management", "Comprehensive audit trails"]
    },
    {
      title: "Context Engineering",
      description: "Great AI needs great context. We optimize prompt design, context windows, and memory systems for accuracy and reliability.",
      items: ["Intelligent chunking strategies", "Metadata enrichment", "Feedback loops & optimization", "Reduced hallucinations"]
    },
    {
      title: "AI Guardrails & Safety",
      description: "Enterprise-grade safety without enterprise complexity. Content filtering, output validation, and access controls built in.",
      items: ["Content moderation", "Output validation rules", "Role-based access control", "Compliance-ready logging"]
    }
  ];

  return (
    <section className="bg-[var(--charcoal)] text-white py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">
            How We Build Enterprise AI
          </h2>
          <p className="opacity-90 max-w-[500px] mx-auto">
            Our technical approach combines modern architecture with proven methodology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white/5 p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-3 text-[var(--accent-light)]">
                {card.title}
              </h3>
              <p className="opacity-90 mb-4 text-[0.9375rem] leading-relaxed">
                {card.description}
              </p>
              <ul className="list-none p-0 m-0">
                {card.items.map((item, i) => (
                  <li key={i} className="py-1.5 text-sm opacity-85">
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
