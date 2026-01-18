export function MCPComparison() {
  return (
    <section id="mcp" className="py-32 px-6">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="serif text-[clamp(2rem,4vw,3rem)] font-normal mb-4">
            Why MCP Servers Matter for Your Business
          </h2>
          <p className="text-[var(--muted)] max-w-[500px] mx-auto">
            MCP (Model Context Protocol) turns AI from a chat tool into a secure, scalable operator inside your systems.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-6 md:p-7 bg-[var(--accent)] text-white font-medium">Old Way (Generic AI)</th>
                <th className="text-left p-6 md:p-7 bg-[var(--accent)] text-white font-medium">MCP Way (Atlas AI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--charcoal)]">Manual copy-paste between tools</td>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--charcoal)]"><strong>Direct secure connectors</strong> to your systems</td>
              </tr>
              <tr>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--charcoal)]">Shadow IT risks and data exposure</td>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--charcoal)]"><strong>Enterprise permissions</strong>, logging, and audit trails</td>
              </tr>
              <tr>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--muted)]">One-off workflows that break easily</td>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--muted)]"><strong>Scales across teams</strong> and departments</td>
              </tr>
              <tr>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--charcoal)]">No visibility into what AI did</td>
                <td className="text-left p-6 md:p-7 border-b border-black/5 bg-white text-[var(--charcoal)]"><strong>Full audit trail</strong> of every action</td>
              </tr>
              <tr>
                <td className="text-left p-6 md:p-7 bg-white text-[var(--charcoal)]">API spaghetti when trying to integrate</td>
                <td className="text-left p-6 md:p-7 bg-white text-[var(--charcoal)]"><strong>Standardized protocol</strong> that works with any tool</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8 mt-8">
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">Operations</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">Real-time data access for forecasting, reporting, and decision-making.</p>
          </div>
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">Security</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">Controlled permissions, logging, and data boundaries built in.</p>
          </div>
          <div className="bg-[var(--cream)] p-12 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold mb-3">Performance</h3>
            <p className="text-[var(--muted)] text-[0.9375rem] leading-relaxed">Milliseconds, not hours — automations run instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
