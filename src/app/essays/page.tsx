import GlassCard from "@/components/GlassCard";

const essays = [
  {
    slug: "the-metaverse-already-happened",
    title: "The Metaverse Already Happened — You Just Can't See It",
    excerpt: "The Web3 metaverse flopped because they got the interface wrong. The real metaverse isn't spatial — it's conversational and autonomous. And it's already running.",
    date: "Mar 17, 2026",
    readTime: "8 min read",
    tags: ["metaverse", "agentic-ai", "philosophy"],
  },
  {
    slug: "automated-kalshi-sports-trader",
    title: "I Built an AI-Powered Sports Trading Bot — Here's What Actually Happened",
    excerpt: "A small business owner, a prediction market exchange, and a fleet of AI agents walk into a bar. The bot doesn't panic. The bot follows the rules. The bot was right.",
    date: "Mar 17, 2026",
    readTime: "12 min read",
    tags: ["kalshi", "trading", "automation", "build-log"],
  },
  {
    slug: "they-built-the-wrong-metaverse",
    title: "They Built the Wrong Metaverse",
    excerpt: "Facebook bet $36 billion on VR headsets and virtual land. The actual metaverse showed up wearing different clothes — AI agents, not avatars.",
    date: "Mar 17, 2026",
    readTime: "5 min read",
    tags: ["metaverse", "manifesto", "culture"],
  },
];

export default function Essays() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in-up" style={{ color: 'var(--text-primary)' }}>
          Essays
        </h1>
        <p className="text-lg animate-fade-in-up-delay-1" style={{ color: 'var(--text-secondary)' }}>
          Long-form thinking on agentic AI, prediction markets, and building in the space.
        </p>
        <div className="neon-line mt-6" />
      </div>

      <div className="space-y-6">
        {essays.map((essay, idx) => (
          <div
            key={essay.slug}
            className="animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <GlassCard className="cursor-pointer group">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{essay.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-400/10 text-cyan-400/70">{essay.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                {essay.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {essay.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {essay.tags.map((tag) => (
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
    </div>
  );
}
