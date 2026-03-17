export const meta = {
  slug: "automated-kalshi-sports-trader",
  title: "I Built an AI-Powered Sports Trading Bot — Here's What Actually Happened",
  subtitle: "A garden center owner, a prediction market exchange, and a fleet of AI agents",
  excerpt:
    "A small business owner, a prediction market exchange, and a fleet of AI agents walk into a bar. The bot doesn't panic. The bot follows the rules. The bot was right.",
  date: "Mar 17, 2026",
  readTime: "12 min read",
  tags: ["kalshi", "trading", "automation", "build-log"],
};

export const content = `
I'm not a software engineer. I own a garden center in upstate New York — 26 acres of greenhouses, dirt, and chaos. I also run a fleet of AI agents that manage chunks of my life: morning briefs, task management, trading automation, and a dozen other things that used to eat my time.

One of those agents is a sports trading bot that operates on Kalshi, a regulated prediction market exchange. It watches live games, identifies pricing inefficiencies on heavy favorites, and executes trades automatically while I'm selling perennials or putting my kids to bed.

This is the story of building it, running it with real money, and what it taught me about the collision of AI agents and financial markets.

## What Is Kalshi (And Why Should You Care)?

Kalshi is a CFTC-regulated exchange where you trade contracts on real-world events. Think of it like a stock market, but instead of buying shares in a company, you're buying contracts on outcomes: Will the Yankees win tonight? Will Bitcoin close above $75K?

Each contract settles at $1.00 (yes) or $0.00 (no). If you buy a "yes" contract at $0.80 and the event happens, you make $0.20. If it doesn't, you lose your $0.80.

The interesting part: these markets are often inefficient, especially during live sporting events. Prices move on emotion, delayed information, and thin order books. That's where a bot with no emotions and fast execution has an edge.

## The Thesis: Exploit Favorite Mispricing in Live Markets

The core idea is simple. When a heavy favorite (75%+ probability) is playing a live game, the market occasionally misprices them — usually during momentum swings by the underdog. The crowd panics. The price dips. The bot buys.

Here's the logic:

1. **Scan** — Every 30 seconds, the bot pulls today's Kalshi sports markets (NCAA basketball, NBA, MLB) and filters for games where the favorite is priced at 75% or higher.
2. **Wait for live** — It doesn't trade pre-game. It waits until the game is actually in progress, because that's when emotional mispricing happens.
3. **Enter small** — When the favorite's price dips about 6% below its current level, the bot places a limit buy for $5. Small. Deliberate.
4. **Take profit or average down** — If the price recovers 6%, it sells for profit. If it drops another 6%, it buys more (up to $15 total per game). If the favorite collapses entirely, it cuts losses.
5. **Stop by halftime** — The bot has a hard cutoff. For basketball, it stops entering new trades before the halftime window. No late-game gambling.

## The Stack: An AI Agent Running a Trading Desk

Here's where it gets interesting from a technology standpoint. This bot isn't a standalone script running in a cron job. It's part of an agentic AI ecosystem — OpenClaw — that manages my entire digital life.

**The architecture:**
- **OpenClaw** (the AI agent) orchestrates everything: scheduling, monitoring, alerting, P&L reporting
- **Python scripts** handle the actual Kalshi API integration, order execution, and risk management
- **macOS launchd** runs the data refresh jobs (no unnecessary AI token burn for simple scripts)
- **Telegram** delivers real-time alerts: fills, cancels, loss-limit triggers, daily recaps
- **Obsidian** stores the decision log and strategy notes

The bot has its own risk management system:
- $350 portfolio cap
- $5 initial position size (roughly 1.4% of portfolio)
- $15 max per game after averaging down
- $50 daily realized loss limit — hit this and the bot shuts down for the day
- Automatic take-profit and stop-loss logic

## The Pilot: Shadow Mode to Real Money

I didn't just yeet $350 at a live market and hope for the best. The rollout had structure:

**Phase 0 — Prep:** Configure everything, validate API connections, run the full pipeline once with no money on the line.

**Phase 1 — Shadow burn-in:** The bot ran for two sessions watching real markets, logging hypothetical trades without placing actual orders. This caught bugs in the scanner, timing issues with the odds feed, and edge cases in how Kalshi formats ticker symbols.

**Phase 2 — Hybrid micro-trades:** One real $1 trade per session while the rest stayed in shadow mode. This validated that the actual order placement, fill detection, and P&L tracking worked correctly with Kalshi's API.

**Phase 3 — Live pilot:** Full automation enabled. $5 entries, $15 max DCA, $50 daily loss cap. The bot runs, I get Telegram pings, and I check the ledger after each session.

**Promotion criteria:** At least 30 trades, net positive P&L, max drawdown under 10% of bankroll. Only then would I consider scaling up.

## What I've Learned So Far

### 1. The edge is real, but thin
Favorite mispricing during live games does happen. But the margin is small and fees eat into it. You need volume and discipline, not home runs.

### 2. Automation removes the worst trader: you
The biggest advantage isn't speed or data — it's that the bot doesn't panic, doesn't chase, doesn't revenge trade. It follows the rules every single time. I've watched games where I would have absolutely sold at the worst moment. The bot held. The bot was right.

### 3. The boring parts matter most
Getting the ticker symbol mapping right. Handling edge cases in MLB spring training series formats. Making sure the daily loss cap accounts for pending orders, not just settled ones. These aren't glamorous problems, but they're the difference between a bot that works and one that silently bleeds money.

### 4. AI agents aren't magic — they're leverage
OpenClaw doesn't make better trading decisions than a well-written Python script. What it does is make the entire system *manageable*. It monitors health, sends alerts, generates P&L reports, and lets me focus on the garden center while an automated system handles the tedium.

## The Bigger Picture: Prediction Markets + AI Agents

This isn't really a story about sports betting. It's a story about what happens when regulated prediction markets meet autonomous AI agents.

Kalshi is just the beginning. The CFTC has approved event contracts on elections, weather, economic indicators, and more. As these markets mature and liquidity deepens, the opportunity for automated, agent-driven trading strategies grows exponentially.

We're heading toward a world where:
- **Personal AI agents manage diversified prediction market portfolios** alongside traditional investments
- **Information arbitrage becomes automated** — your agent reads news, assesses impact, and trades before you finish your coffee
- **Risk management is continuous**, not something you check once a day
- **The barrier to entry drops to near zero** — you don't need a Bloomberg terminal or a finance degree, you need a well-configured agent

The question isn't whether this will happen. It's whether individuals will participate or cede this space entirely to institutional players with bigger compute budgets.

## Where This Goes Next

I'm continuing to run the pilot while tracking toward the 30-trade promotion gate. If the numbers hold:
- Scale the bankroll
- Add more sports and event types
- Explore cross-market strategies (e.g., news event + prediction market + traditional equity)
- Open-source parts of the framework for other builders

The garden center opens in a few weeks for spring. The bot will be trading while I'm moving flats of petunias. That's the point.

---

*Rich Miller runs a garden center in upstate New York and builds AI agent systems in his spare time.*
`;
