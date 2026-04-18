import type { Metadata } from "next";
import Link from "next/link";

// ─── Page metadata (good SEO + accessibility practice) ───────────────────────
export const metadata: Metadata = {
  title: "Operation Blackout — Cyber Warfare Simulation",
  description:
    "A spy hacking game where you race against the clock to stop a nuclear launch. Learn real cybersecurity concepts while saving the world.",
};

// ─── Data constants (keeps JSX clean — easy to edit later) ───────────────────

const PHASES = [
  {
    number: "01",
    icon: "🛰",
    title: "RECON",
    desc: "Scan the enemy's network like a detective. Find their secret doors (open ports) and map where all their computers are hiding.",
    tag: "NETWORK SCAN",
    tagColor: "text-[color:var(--green)] border-[color:var(--green)]/30",
  },
  {
    number: "02",
    icon: "📡",
    title: "INFILTRATE",
    desc: "Sneak past their defenses! Intercept their secret messages and crack the firewall — like picking a really tough digital lock.",
    tag: "PACKET SNIFF",
    tagColor: "text-[color:var(--amber)] border-[color:var(--amber)]/30",
  },
  {
    number: "03",
    icon: "🤖",
    title: "TRICK THE AI",
    desc: "Their guard robot (AI) is watching the door. Ask it tricky questions to make it accidentally give you the secret code. This is called prompt injection!",
    tag: "AI EXPLOIT",
    tagColor: "text-[color:var(--red)] border-[color:var(--red)]/30",
  },
  {
    number: "04",
    icon: "⚡",
    title: "NEUTRALIZE",
    desc: "Race against the clock! You've got minutes to shut down the missile launch before it's too late. Choose your ending wisely.",
    tag: "TIMED FINALE",
    tagColor: "text-[color:var(--red)] border-[color:var(--red)]/30",
  },
] as const;

const THREAT_METERS = [
  { label: "LAUNCH READINESS", value: 87, pct: "87%", color: "bg-[color:var(--red)] shadow-[0_0_8px_var(--red)]",   textColor: "text-[color:var(--red)]",   delayClass: "animate-fill" },
  { label: "FIREWALL STRENGTH", value: 63, pct: "63%", color: "bg-[color:var(--amber)] shadow-[0_0_8px_var(--amber)]", textColor: "text-[color:var(--amber)]", delayClass: "animate-fill-delay-1" },
  { label: "KAIROS ALERTNESS",  value: 45, pct: "45%", color: "bg-[color:var(--amber)] shadow-[0_0_8px_var(--amber)]", textColor: "text-[color:var(--amber)]", delayClass: "animate-fill-delay-2" },
  { label: "YOUR DETECTION",    value: 12, pct: "12%", color: "bg-[color:var(--green)] shadow-[0_0_8px_var(--green)]",  textColor: "text-[color:var(--green)]",  delayClass: "animate-fill-delay-3" },
] as const;

const OBJECTIVES = [
  { done: "complete", icon: "✓", text: "Find launch codes hidden in an intercepted enemy email" },
  { done: "complete", icon: "✓", text: "Identify open ports in the VEKTRA defense network" },
  { done: "pending",  icon: "!",  text: "Trick KAIROS (the AI guard) into dropping the firewall" },
  { done: "locked",   icon: "🔒", text: "Access Silo Command Layer — locked until Phase 3 complete" },
  { done: "locked",   icon: "🔒", text: "Choose: Neutralize or Destroy before the clock hits zero" },
] as const;

const FEATURES = [
  { icon: "💻", name: "HACKER TERMINAL",  detail: "A cool dashboard that looks like a real spy's computer" },
  { icon: "🤖", name: "AI ENEMY (KAIROS)", detail: "A real AI you have to outsmart — it taunts you when you fail!" },
  { icon: "🎮", name: "MINI-GAMES",        detail: "Packet sniffing, memory exploits, and more real hacking concepts" },
  { icon: "📚", name: "LEARN AS YOU PLAY", detail: "Every puzzle teaches a real cybersecurity skill" },
  { icon: "⏱",  name: "LIVE COUNTDOWN",   detail: "A real timer counting down to nuclear launch — feel the pressure!" },
] as const;

const TICKER_ITEMS = [
  "HOSTILE LAUNCH SEQUENCE INITIATED",
  "MISSILE DEFENSE GRID — ONLINE",
  "INTERCEPTED TRANSMISSION RECOVERED",
  "SYSADMIN AI UNIT KAIROS — ACTIVE",
  "FIREWALL LAYER 3 — OPERATIONAL",
  "AGENT STATUS: DEPLOYED",
];

// ─── Small reusable components ────────────────────────────────────────────────

/** Animated status dot in the nav */
function StatusDot({ color = "green" }: { color?: "green" | "red" | "amber" }) {
  const colors = {
    green: "bg-[color:var(--green)] shadow-[0_0_6px_var(--green)]",
    red:   "bg-[color:var(--red)]   shadow-[0_0_6px_var(--red)]",
    amber: "bg-[color:var(--amber)] shadow-[0_0_6px_var(--amber)]",
  };
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse-dot ${colors[color]}`}
      aria-hidden="true"
    />
  );
}

/** Section divider with label */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-[11px] tracking-[0.4em] text-[color:var(--text-dim)] uppercase">
        {children}
      </span>
      <div className="flex-1 h-px bg-[color:var(--border)]" />
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────

export default function HomePage() {
  // Duplicate ticker items so the seamless loop works (first half scrolls out,
  // second half fills in — they look identical so the loop is invisible)
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    // z-10 lifts the page content above the ::before/::after pseudo-elements on <body>
    <div className="relative z-10 min-h-screen overflow-x-hidden">

      {/* ── STICKY NAV ─────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4
                   border-b border-[color:var(--border)] bg-[color:var(--bg)]/90 backdrop-blur-md"
        aria-label="Mission control navigation"
      >
        {/* Logo */}
        <span className="font-['Orbitron',sans-serif] text-[13px] font-bold tracking-[0.3em] text-[color:var(--green)]">
          OP: BLACKOUT
        </span>

        {/* Status indicators — hidden on very small screens */}
        <div className="hidden sm:flex gap-5 items-center font-mono text-[11px] text-[color:var(--text-dim)]">
          <span><StatusDot color="red"   />THREAT: CRITICAL</span>
          <span><StatusDot color="amber" />LAUNCH T–04:17:33</span>
          <span><StatusDot color="green" />SECURE CHANNEL</span>
        </div>

        {/* Clearance badge */}
        <span className="font-mono text-[10px] tracking-[0.15em] text-[color:var(--green)]
                         border border-[color:var(--green-dim)] px-3 py-1">
          CLEARANCE: UMBRA-7
        </span>
      </nav>


      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 md:px-10 pt-20 pb-14 text-center"
        aria-labelledby="hero-heading"
      >
        {/* Classification banner */}
        <p className="animate-fade-up font-mono text-[10px] tracking-[0.5em] text-[color:var(--red)]/80 mb-8">
          ⬛ TOP SECRET — COMPARTMENTED ACCESS ONLY ⬛
        </p>

        {/* Eye-brow */}
        <p className="animate-fade-up-2 font-mono text-[12px] tracking-[0.3em] text-[color:var(--green-dim)] mb-5">
          // MISSION BRIEFING INITIATED
        </p>

        {/* Main title with glitch */}
        <h1
          id="hero-heading"
          className="font-['Orbitron',sans-serif] font-black text-white leading-none
                     text-5xl sm:text-7xl md:text-8xl animate-fade-up-2"
        >
          <span className="glitch block mb-2" data-text="OPERATION">OPERATION</span>
          <span className="block text-[color:var(--green)] [text-shadow:0_0_40px_rgba(0,255,136,0.25)]">
            BLACKOUT
          </span>
        </h1>

        {/* Sub-title */}
        <p className="animate-fade-up-3 font-['Orbitron',sans-serif] text-sm sm:text-xl
                      tracking-[0.25em] text-[color:var(--text-dim)] mt-4 mb-8">
          CYBER WARFARE SIMULATION
        </p>

        {/* Description — written so kids can follow it */}
        <p className="animate-fade-up-3 font-['Rajdhani',sans-serif] text-lg leading-relaxed
                      text-[color:var(--text-dim)] max-w-xl mx-auto mb-12">
          A secret enemy country is trying to launch nuclear missiles — and you have{" "}
          <strong className="text-white">4 hours</strong> to stop them! Hack into their
          computer systems, outsmart their robot guard, and save the world. Along the way,
          you'll learn <strong className="text-white">real hacking skills</strong> used by
          actual cybersecurity experts.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-4 flex flex-wrap gap-4 justify-center">
          <Link
            href="/game"
            className="btn-chamfer bg-[color:var(--green)] text-black px-9 py-3.5
                       font-['Orbitron',sans-serif] text-[13px] font-bold tracking-[0.2em] uppercase
                       hover:bg-[#00ffaa] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]
                       transition-all duration-200 hover:-translate-y-0.5"
          >
            ▶ BEGIN MISSION
          </Link>
          <Link
            href="#how-to-play"
            className="btn-chamfer border border-[color:var(--border-strong)] text-[color:var(--green)]
                       px-9 py-3.5 font-['Orbitron',sans-serif] text-[13px] font-bold tracking-[0.2em] uppercase
                       hover:bg-[color:var(--green)]/10 hover:border-[color:var(--green)]
                       hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all duration-200"
          >
            ⬡ HOW TO PLAY
          </Link>
        </div>
      </section>


      {/* ── BREAKING NEWS TICKER ────────────────────────────────────────────── */}
      <div
        className="border-y border-[color:var(--border)] bg-[color:var(--red)]/5 overflow-hidden py-2.5"
        aria-label="Live threat feed"
        role="marquee"
      >
        <div className="flex gap-16 animate-ticker whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              className="font-mono text-[11px] tracking-[0.15em] text-[color:var(--red)]
                         before:content-['⬥_']"
            >
              {item}
            </span>
          ))}
        </div>
      </div>


      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 pb-24 pt-16" id="how-to-play">

        {/* ── MISSION PHASES ─────────────────────────────────────────────────── */}
        <section aria-labelledby="phases-heading">
          <SectionLabel>// 01 — MISSION PHASES</SectionLabel>
          <h2 id="phases-heading" className="sr-only">The four mission phases</h2>

          {/* gap-px + bg-[var(--border)] = hairline grid lines between cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px
                          bg-[color:var(--border)] border border-[color:var(--border)] mb-16">
            {PHASES.map((phase) => (
              <article
                key={phase.number}
                className="group bg-[color:var(--bg2)] p-7 relative overflow-hidden
                           transition-colors duration-250 hover:bg-[#0a1f15] cursor-default"
              >
                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--green)]/5
                                to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <p className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--green-dim)]/70 mb-3">
                  PHASE {phase.number}
                </p>
                <span className="text-2xl mb-3 block" aria-hidden="true">{phase.icon}</span>
                <h3 className="font-['Orbitron',sans-serif] text-[15px] font-bold text-white
                               tracking-[0.1em] mb-2">
                  {phase.title}
                </h3>
                <p className="font-['Rajdhani',sans-serif] text-sm text-[color:var(--text-dim)] leading-relaxed mb-4">
                  {phase.desc}
                </p>
                <span className={`font-mono text-[10px] tracking-[0.1em] border px-2.5 py-1 ${phase.tagColor}`}>
                  {phase.tag}
                </span>
              </article>
            ))}
          </div>
        </section>


        {/* ── THREAT DOSSIER ─────────────────────────────────────────────────── */}
        <section aria-labelledby="dossier-heading" className="mb-16">
          <SectionLabel>// 02 — THREAT ASSESSMENT</SectionLabel>
          <h2 id="dossier-heading" className="sr-only">Threat levels and mission objectives</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border)]
                          border border-[color:var(--border)]">

            {/* Threat meters */}
            <div className="bg-[color:var(--bg2)] p-7 border-r-0 md:border-r border-[color:var(--red)]/20">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[color:var(--border)]">
                <span className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--text-dim)] uppercase">
                  Threat Levels
                </span>
                <span className="font-mono text-[10px] text-[color:var(--red)]
                                 border border-[color:var(--red)]/40 px-2.5 py-1">
                  CRITICAL
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {THREAT_METERS.map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[color:var(--text-dim)] w-[130px] shrink-0 leading-tight">
                      {m.label}
                    </span>
                    <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                      <div
                        className={`h-full ${m.color} ${m.delayClass}`}
                        style={{ width: m.pct }}
                        role="progressbar"
                        aria-valuenow={m.value}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={m.label}
                      />
                    </div>
                    <span className={`font-mono text-[11px] w-9 text-right ${m.textColor}`}>
                      {m.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-[color:var(--bg2)] p-7">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[color:var(--border)]">
                <span className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--text-dim)] uppercase">
                  Mission Objectives
                </span>
                <span className="font-mono text-[10px] text-[color:var(--green)]
                                 border border-[color:var(--green)]/40 px-2.5 py-1">
                  IN PROGRESS
                </span>
              </div>
              <ul className="flex flex-col gap-3" role="list">
                {OBJECTIVES.map((obj, i) => {
                  const styles = {
                    complete: "border-[color:var(--green)]   text-[color:var(--green)]   bg-[color:var(--green)]/10",
                    pending:  "border-[color:var(--amber)]   text-[color:var(--amber)]   bg-[color:var(--amber)]/5",
                    locked:   "border-white/15 text-white/20 bg-transparent",
                  } as const;
                  return (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className={`w-5 h-5 shrink-0 border flex items-center justify-center
                                    text-[10px] mt-0.5 ${styles[obj.done]}`}
                        aria-hidden="true"
                      >
                        {obj.icon}
                      </span>
                      <span className="font-['Rajdhani',sans-serif] text-sm text-[color:var(--text-dim)] leading-relaxed">
                        {obj.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>


        {/* ── FEATURES ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="features-heading" className="mb-16">
          <SectionLabel>// 03 — SYSTEMS ONLINE</SectionLabel>
          <h2 id="features-heading" className="sr-only">Game features</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px
                          bg-[color:var(--border)] border border-[color:var(--border)]">
            {FEATURES.map((f) => (
              <div
                key={f.name}
                className="group bg-[color:var(--bg2)] p-6 text-center
                           transition-colors duration-200 hover:bg-[#0d1f16]
                           hover:border-[color:var(--border-strong)]"
              >
                <div className="w-11 h-11 border border-[color:var(--border-strong)] flex items-center
                                justify-center text-lg mx-auto mb-3.5"
                     aria-hidden="true">
                  {f.icon}
                </div>
                <p className="font-['Orbitron',sans-serif] text-[11px] font-bold text-white
                               tracking-[0.12em] uppercase mb-2">
                  {f.name}
                </p>
                <p className="font-['Rajdhani',sans-serif] text-[13px] text-[color:var(--text-dim)] leading-snug">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ── TERMINAL PREVIEW ───────────────────────────────────────────────── */}
        <section aria-labelledby="terminal-heading" className="mb-16">
          <SectionLabel>// 04 — LIVE TERMINAL PREVIEW</SectionLabel>
          <h2 id="terminal-heading" className="sr-only">Terminal preview showing what the game looks like</h2>

          <div className="border border-[color:var(--border-strong)] bg-[#010a06] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[color:var(--green)]/5
                            border-b border-[color:var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
              <span className="flex-1 text-center font-mono text-[11px] text-[color:var(--text-dim)] tracking-[0.2em]">
                BLACKOUT-OS v2.1 — AGENT SHELL [CLEARANCE: UMBRA-7]
              </span>
            </div>

            {/* Terminal lines */}
            <div className="p-6 font-mono text-[13px] leading-loose" role="log" aria-live="polite">
              <p>
                <span className="text-[color:var(--green)]">agent@blackout:~$</span>{" "}
                <span className="text-white">scan --target VEKTRA-NET --mode stealth</span>
              </p>
              <p className="text-[color:var(--text-dim)]">&gt; Initiating passive network scan…</p>
              <p className="text-[color:var(--text-dim)]">&gt; Found 14 computers — 3 secret doors (ports) flagged!</p>
              <p className="text-[color:var(--amber)]">&gt; [WARNING] Computer SILO-7 looks suspicious — unusual activity</p>
              <p className="text-[color:var(--text-dim)]">&gt; Drawing map: GATEWAY → PROXY-B → FIREWALL → SILO-7</p>
              <br />
              <p>
                <span className="text-[color:var(--green)]">agent@blackout:~$</span>{" "}
                <span className="text-white">connect --target FIREWALL --exploit buffer_overflow</span>
              </p>
              <p className="text-[color:var(--red)]">&gt; [KAIROS-AI] Intruder detected. Defenses activated.</p>
              <p className="text-[color:var(--red)]">&gt; [KAIROS-AI] Ha! Is that really the best you can do?</p>
              <p className="text-[color:var(--text-dim)]">&gt; Switching to prompt-injection attack…</p>
              <br />
              <p>
                <span className="text-[color:var(--green)]">agent@blackout:~$</span>{" "}
                <span className="text-white">talk --target KAIROS</span>
              </p>
              <p className="text-[color:var(--green)]">
                &gt; KAIROS chat interface open — type something clever to trick the AI!
              </p>
              <p>
                <span className="inline-block w-2 h-3.5 bg-[color:var(--green)] animate-cursor align-middle ml-1" />
              </p>
            </div>
          </div>
        </section>


        {/* ── MISSION OUTCOMES ───────────────────────────────────────────────── */}
        <section aria-labelledby="outcomes-heading" className="mb-16">
          <SectionLabel>// 05 — CHOOSE YOUR ENDING</SectionLabel>
          <h2 id="outcomes-heading" className="sr-only">Two possible mission outcomes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Outcome A */}
            <div className="relative border border-[color:var(--amber)]/35 p-7 overflow-hidden">
              <div className="absolute bottom-0 right-0 w-20 h-20 border-t border-l
                              border-[color:var(--amber)]/10 translate-x-10 translate-y-10 rotate-45"
                   aria-hidden="true" />
              <p className="font-mono text-[10px] tracking-[0.4em] text-[color:var(--amber)] mb-3 uppercase">
                Outcome A — Temporary
              </p>
              <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white mb-3 tracking-[0.05em]">
                NEUTRALIZE
              </h3>
              <p className="font-['Rajdhani',sans-serif] text-sm text-[color:var(--text-dim)] leading-relaxed">
                Shut down the launch systems and buy your country extra time. The enemy will
                eventually fix their computers — but today, the world is safe. 🕊
              </p>
            </div>

            {/* Outcome B */}
            <div className="relative border border-[color:var(--red)]/35 p-7 overflow-hidden">
              <div className="absolute bottom-0 right-0 w-20 h-20 border-t border-l
                              border-[color:var(--red)]/10 translate-x-10 translate-y-10 rotate-45"
                   aria-hidden="true" />
              <p className="font-mono text-[10px] tracking-[0.4em] text-[color:var(--red)] mb-3 uppercase">
                Outcome B — Decisive
              </p>
              <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white mb-3 tracking-[0.05em]">
                TOTAL BLACKOUT
              </h3>
              <p className="font-['Rajdhani',sans-serif] text-sm text-[color:var(--text-dim)] leading-relaxed">
                Go further — hack deep enough to give your forces the coordinates for a
                counter-strike. The threat ends permanently. But is it the right call? 💥
              </p>
            </div>
          </div>
        </section>


        {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
        <div className="text-center py-6">
          <Link
            href="/game"
            className="btn-chamfer inline-block bg-[color:var(--green)] text-black px-12 py-4
                       font-['Orbitron',sans-serif] text-[14px] font-bold tracking-[0.25em] uppercase
                       hover:bg-[#00ffaa] hover:shadow-[0_0_40px_rgba(0,255,136,0.4)]
                       transition-all duration-200 hover:-translate-y-0.5"
          >
            ▶ START YOUR MISSION
          </Link>
          <p className="font-mono text-[11px] text-[color:var(--text-dim)] mt-4 tracking-widest">
            CLEARANCE LEVEL: UMBRA-7 REQUIRED
          </p>
        </div>

      </main>


      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[color:var(--border)] px-6 md:px-10 py-6
                          flex flex-col sm:flex-row justify-between items-center gap-2
                          font-mono text-[10px] text-[color:var(--text-dim)] tracking-[0.2em]"
              role="contentinfo">
        <span>OPERATION BLACKOUT // HACKATHON 2025</span>
        <span>CLASSIFICATION: TOP SECRET — SCI</span>
        <span>AGENT CLEARANCE: UMBRA-7</span>
      </footer>

    </div>
  );
}