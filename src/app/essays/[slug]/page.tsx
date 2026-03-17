import { notFound } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import {
  predictionMarketsKShapedEconomyMeta,
  predictionMarketsKShapedEconomyContent,
  theMetaverseAlreadyHappenedMeta,
  theMetaverseAlreadyHappenedContent,
  automatedKalshiSportsTraderMeta,
  automatedKalshiSportsTraderContent,
  theyBuiltTheWrongMetaverseMeta,
  theyBuiltTheWrongMetaverseContent,
} from "@/content/essays";

type EssayMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
};

const essayMap: Record<string, { meta: EssayMeta; content: string }> = {
  "prediction-markets-k-shaped-economy": {
    meta: predictionMarketsKShapedEconomyMeta,
    content: predictionMarketsKShapedEconomyContent,
  },
  "the-metaverse-already-happened": {
    meta: theMetaverseAlreadyHappenedMeta,
    content: theMetaverseAlreadyHappenedContent,
  },
  "automated-kalshi-sports-trader": {
    meta: automatedKalshiSportsTraderMeta,
    content: automatedKalshiSportsTraderContent,
  },
  "they-built-the-wrong-metaverse": {
    meta: theyBuiltTheWrongMetaverseMeta,
    content: theyBuiltTheWrongMetaverseContent,
  },
};

function renderMarkdown(raw: string) {
  const lines = raw.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let listBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key++} className="list-disc list-inside space-y-2 my-4" style={{ color: "var(--text-secondary)" }}>
        {listBuffer.map((li, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(li.replace(/^[-*]\s*/, "")) }} />
        ))}
      </ul>
    );
    listBuffer = [];
  }

  function inlineFormat(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong style='color:var(--text-primary)'>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^[-*]\s/.test(line.trim())) {
      listBuffer.push(line.trim());
      continue;
    }
    flushList();

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold mt-10 mb-4" style={{ color: "var(--text-primary)" }}>
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.trim() === "") {
      continue;
    } else if (line.trim() === "---") {
      elements.push(<hr key={key++} className="my-8 border-white/10" />);
    } else {
      elements.push(
        <p
          key={key++}
          className="text-base leading-relaxed my-4"
          style={{ color: "var(--text-secondary)" }}
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    }
  }
  flushList();

  return elements;
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = essayMap[slug];
  if (!essay) notFound();

  const { meta, content } = essay;

  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <a
        href="/essays"
        className="text-sm mb-8 inline-block hover:text-cyan-400 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        ← Back to Essays
      </a>

      <article className="animate-fade-in-up">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {meta.date}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-400/10 text-cyan-400/70">
              {meta.readTime}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
              {meta.subtitle}
            </p>
          )}
          <div className="neon-line mt-6" />
        </div>

        <div className="prose-custom">{renderMarkdown(content)}</div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/5"
                style={{ color: "var(--text-muted)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
