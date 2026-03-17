import GlassCard from "@/components/GlassCard";

export default function About() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <div className="mb-16 text-center">
        {/* Avatar placeholder */}
        <div className="w-28 h-28 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#8a7d65] to-[#5a5a6a] p-[2px] animate-fade-in-up">
          <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ background: '#030308' }}>
            <span className="text-4xl">🌌</span>
          </div>
        </div>
        
        <p className="text-lg animate-fade-in-up text-[#6a6a85]">
          Builder. Operator. Observer of digital wildlife.
        </p>
        <div className="neon-line mt-8 max-w-xs mx-auto" />
      </div>

      <div className="space-y-8">
        <GlassCard className="animate-fade-in-up-delay-1">
          <p className="text-base leading-relaxed mb-4 text-[#b8b8cc]">
            I&apos;m building AI agent systems that automate the parts of life I don&apos;t want 
            to think about — morning intelligence briefs, prediction market trading, task 
            orchestration, and a growing web of connected ideas.
          </p>
          <p className="text-base leading-relaxed mb-4 text-[#b8b8cc]">
            I&apos;m not a software engineer. My formal web design training was a 5-day HTML 
            camp in 1999. But the tools have changed. The gap between &quot;idea&quot; and &quot;built&quot; 
            has collapsed. If you can <span className="font-semibold text-[#a0a0a0]">think</span> clearly 
            and <span className="font-semibold text-[#a0a0a0]">reason</span> about what you want, AI 
            agents can help you build it.
          </p>
          <p className="text-base leading-relaxed text-[#b8b8cc]">
            Metaversal Space is where I document the build — raw thoughts, polished essays, 
            project demos, and a living thought stream powered by the same agents I&apos;m writing 
            about. The process of building this site is itself content on this site. We&apos;re 
            aware of the recursion.
          </p>
        </GlassCard>

        <GlassCard className="animate-fade-in-up-delay-2">
          <h3 className="text-sm uppercase tracking-widest mb-4 text-[#8a7d65]/70">What I&apos;m Exploring</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Agentic AI in daily life",
              "Prediction market trading",
              "Personal knowledge systems",
              "AI-powered content pipelines",
              "The real metaverse (not VR)",
              "Building wealth with automation",
            ].map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#8a7d65]" />
                <span className="text-sm text-[#6a6a85]">{topic}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="animate-fade-in-up-delay-3">
          <h3 className="text-sm uppercase tracking-widest mb-4 text-[#8a7d65]/70">Connect</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "𝕏 / Twitter", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "Email", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm border border-[#8a7d65]/15 text-[#6a6a85] hover:border-[#8a7d65]/30 hover:text-[#a0a0a0] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Digital twin teaser */}
      <div className="mt-16 text-center">
        <GlassCard glow className="inline-block">
          <p className="text-sm mb-2 text-[#6a6a85]">
            🧠 Digital twin chat coming soon
          </p>
          <p className="text-xs text-[#3d3d55]">
            Ask my AI anything about what I&apos;m building, thinking, or exploring.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
