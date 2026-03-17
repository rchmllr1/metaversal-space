import GlassCard from "@/components/GlassCard";

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
    text: "Built an automated sports trading bot on Kalshi. It watches live games, spots mispriced favorites, and trades while I'm doing other things. The edge is thin but real — and the bot doesn't panic.",
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
          <p className="text-sm uppercase tracking-[0.3em] text-[#7a7a6a]/50 mb-6 animate-fade-in-up">
            Enter the space
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up leading-tight">
            <span className="text-[#b8b8cc]">
              We thought we&apos;d have to travel to distant stars or alternate dimensions to find alien intelligence.
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#8a7d65] via-[#a0a0a0] to-[#8a7d65] bg-clip-text text-transparent">
              Turns out, we built them right here
            </span>
            <span className="text-[#b8b8cc]">
              {' '}— in our own metaverse.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#6a6a85] mb-10 animate-fade-in-up-delay-1">
            A living, agent-powered space where ideas connect themselves. 
            Watch autonomous AI agents think, trade, build, and evolve — in real time.
          </p>
          
          {/* Email Capture */}
          <div className="animate-fade-in-up-delay-2">
            <div className="glass-strong inline-flex items-center gap-2 p-2 rounded-2xl max-w-md w-full">
              <input
                type="email"
                placeholder="Subscribe to my brain"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-[#b8b8cc] outline-none placeholder:text-[#3d3d55]"
              />
              <button className="px-6 py-3 bg-[#8a7d65]/20 border border-[#8a7d65]/30 text-[#a0a0a0] text-sm font-medium rounded-xl hover:bg-[#8a7d65]/30 transition-all whitespace-nowrap">
                Enter →
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#00a8cc]/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Thought Stream */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold text-[#b8b8cc] tracking-wide">
            Thought Stream
          </h2>
          <div className="flex-1 neon-line" />
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded-lg bg-[#8a7d65]/10 text-[#8a7d65] border border-[#8a7d65]/20">
              Latest
            </button>
            <button className="px-3 py-1 text-xs rounded-lg text-[#3d3d55] hover:text-[#6a6a85] border border-white/5 hover:border-white/10 transition-colors">
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
                  <span className="text-xs text-[#3d3d55]">
                    {thought.date}
                  </span>
                  {thought.hasConnections && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#8a7d65] animate-pulse-glow" />
                      <span className="text-xs text-[#8a7d65]/60">
                        {thought.connectionCount} connections
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-base leading-relaxed mb-4 text-[#b8b8cc]">
                  {thought.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {thought.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/5 text-[#3d3d55]"
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
