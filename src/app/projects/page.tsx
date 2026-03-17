import GlassCard from "@/components/GlassCard";

const projects = [
  {
    title: "Kalshi Sports Trading Bot",
    description: "Autonomous prediction market trader. Scans live NCAA, NBA, and MLB games on Kalshi, identifies mispriced favorites, and executes trades with built-in risk management. Real money, real edges, zero emotion.",
    status: "Live",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
    tags: ["python", "kalshi-api", "prediction-markets", "automation"],
    icon: "📈",
  },
  {
    title: "OpenClaw Agent Stack",
    description: "Personal AI agent ecosystem managing morning briefs, task orchestration, trading monitoring, cross-platform communication, and this website. The operating system for daily life.",
    status: "Live",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
    tags: ["openclaw", "agentic-ai", "orchestration", "telegram"],
    icon: "🤖",
  },
  {
    title: "Metaversal Space",
    description: "This site. A living, agent-powered space with real-time thought stream, AI-generated connections, interactive particle systems, and a digital twin chat. Built by the agents it documents.",
    status: "In Progress",
    statusColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    tags: ["next-js", "three-js", "vercel", "glassmorphism"],
    icon: "🌌",
  },
  {
    title: "Morning Intelligence Brief",
    description: "Automated 7-section daily briefing: weather, calendar, tasks, watchlist movers, podcast feed, guest alerts, and Kalshi P/L. Delivered as text + 90-second audio to Telegram at 5:30 AM.",
    status: "Live",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
    tags: ["automation", "tts", "telegram", "data-synthesis"],
    icon: "☀️",
  },
  {
    title: "Thought Stream Engine",
    description: "Obsidian → site pipeline with AI-powered semantic connections. Raw ideas flow from voice dictation through agent transformation to published thoughts with auto-discovered links — visible in real time.",
    status: "Designing",
    statusColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    tags: ["obsidian", "rag", "websocket", "content-pipeline"],
    icon: "🧠",
  },
  {
    title: "Digital Twin",
    description: "AI-powered chat widget trained on all published content. Visitors ask questions and get answers as Rich — surfacing related thoughts, generating new connections, spanning the entire knowledge base.",
    status: "Planned",
    statusColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    tags: ["rag", "claude", "chat", "digital-twin"],
    icon: "👤",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in-up" style={{ color: 'var(--text-primary)' }}>
          Projects
        </h1>
        <p className="text-lg animate-fade-in-up-delay-1" style={{ color: 'var(--text-secondary)' }}>
          What&apos;s running, what&apos;s building, what&apos;s next. Real agents doing real work.
        </p>
        <div className="neon-line mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div
            key={project.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <GlassCard className="h-full group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{project.icon}</span>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-md bg-white/5 border border-white/5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {tag}
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
