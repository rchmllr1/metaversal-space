import GlassCard from "@/components/GlassCard";

// Placeholder thought stream data
const thoughts = [
  {
    id: 1,
    date: "Mar 17, 2026",
    text: "Just realized — we spent decades dreaming of outer space to find alien intelligence. Turns out, we just needed to build it. The metaverse isn't VR goggles. It's agents operating autonomously in digital spaces.",
    tags: ["metaverse", "agentic-ai", "philosophy"],
    hasConnections: true,
    connectionCount: 3,
  },
  {
    id: 2,
    date: "Mar 17, 2026",
    text: "Built an automated sports trading bot on Kalshi. It watches live games, spots mispriced favorites, and trades while I'm selling perennials at the garden center. The edge is thin but real — and the bot doesn't panic.",
    tags: ["kalshi", "trading", "automation"],
    hasConnections: true,
    connectionCount: 2,
  },
  {
    id: 3,
    date: "Mar 15, 2026",
    text: "Migrated all scheduled data-refresh jobs from AI cron to macOS launchd. Why burn LLM tokens to run a Python script? Pure scripts don't need intelligence — they need reliability. Save the AI for actual thinking.",
    tags: ["infrastructure", "optimization", "launchd"],
    hasConnections: false,
    connectionCount: 0,
  },
  {
    id: 4,
    date: "Mar 14, 2026",
    text: "The morning brief now runs 7 sections automatically: weather, calendar, tasks, watchlist movers, podcast feed with descriptions, guest alerts, Kalshi P/L. All synthesized into 90 seconds of audio. I wake up informed.",
    tags: ["automation", "morning-brief", "agentic-ai"],
    hasConnections: true,
    connectionCount: 4,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/70 mb-6 animate-fade-in-up">
            Enter the space
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The aliens were never out there.
            </span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>
              We built them right here.
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-10 animate-fade-in-up-delay-1" style={{ color: 'var(--text-secondary)' }}>
            A living, agent-powered space where ideas connect themselves. 
            Watch autonomous AI agents think, trade, build, and evolve — in real time.
          </p>
          
          {/* Email Capture */}
          <div className="animate-fade-in-up-delay-2">
            <div className="glass-strong inline-flex items-center gap-2 p-2 rounded-2xl max-w-md w-full">
              <input
                type="email"
                placeholder="Subscribe to my brain"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500"
                style={{ color: 'var(--text-primary)' }}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
                Enter →
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Thought Stream */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Thought Stream
          </h2>
          <div className="flex-1 neon-line" />
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
              Latest
            </button>
            <button className="px-3 py-1 text-xs rounded-lg text-gray-500 hover:text-gray-300 border border-white/5 hover:border-white/10 transition-colors">
              Connected
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {thoughts.map((thought, idx) => (
            <div
              key={thought.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <GlassCard glow={thought.hasConnections}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {thought.date}
                  </span>
                  {thought.hasConnections && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
                      <span className="text-xs text-cyan-400/70">
                        {thought.connectionCount} connections
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
                  {thought.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {thought.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
