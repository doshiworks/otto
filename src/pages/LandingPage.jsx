// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ onCTA }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(248,250,250,0.80)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 20, color: "var(--primary)", letterSpacing: "-0.5px" }}>
        ET.
      </span>
      <div className="flex items-center gap-8">
        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: "var(--on-surface-variant)" }}>Assessments</a>
        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: "var(--on-surface-variant)" }}>Resources</a>
      </div>
      <button
        onClick={onCTA}
        style={{
          background: "var(--primary)",
          color: "var(--on-primary)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
        }}
      >
        Check Readiness
      </button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onCTA }) {
  return (
    <section
      className="relative pt-32 pb-24 px-8 overflow-hidden"
      style={{ background: "var(--surface-lowest)" }}
    >
      {/* Offset background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        style={{ background: "linear-gradient(135deg, transparent 40%, #e0f2f1 100%)" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center relative">
        {/* Left — headline */}
        <div>
          <div
            className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: "var(--surface-low)", color: "var(--primary)" }}
          >
            PM Transition Platform · Built for India
          </div>
          <h1
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: 52,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "var(--on-surface)",
            }}
          >
            Stop Guessing.<br />
            Start Getting<br />
            <span style={{ color: "var(--primary)" }}>Hired.</span>
          </h1>
          <p
            className="mt-5 mb-8"
            style={{ fontSize: 16, lineHeight: 1.7, color: "var(--on-surface-variant)", maxWidth: 420 }}
          >
            The first PM transition platform built for the Indian market that focuses on your readiness, not just courses. We will show you exactly where you stand and get you ready for top-tier roles.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onCTA}
              style={{
                background: "var(--primary)",
                color: "var(--on-primary)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 28px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Check your PM readiness
            </button>
            <button
              style={{
                background: "transparent",
                color: "var(--primary)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                padding: "14px 20px",
                borderRadius: 8,
                border: "1.5px solid rgba(0,51,52,0.2)",
                cursor: "pointer",
              }}
            >
              How it works
            </button>
          </div>
          <p style={{ fontSize: 12, color: "var(--outline-variant)", marginTop: 16 }}>
            Preparing for PM for 6+ months but still not getting calls? You need this.
          </p>
        </div>

        {/* Right — floating readiness card */}
        <div className="flex justify-end">
          <div
            style={{
              background: "var(--surface-lowest)",
              borderRadius: 16,
              padding: 24,
              width: 280,
              boxShadow: "0 16px 48px rgba(0,51,52,0.10)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--outline-variant)", marginBottom: 12 }}>
              Architectural Readiness
            </div>
            {[
              { label: "Strategy", pct: 72, color: "var(--primary)" },
              { label: "Execution", pct: 45, color: "#e57373" },
              { label: "Communication", pct: 58, color: "#ffb300" },
              { label: "Tech & Data", pct: 80, color: "var(--primary)" },
            ].map((d) => (
              <div key={d.label} className="mb-3">
                <div className="flex justify-between mb-1" style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>
                  <span>{d.label}</span><span style={{ fontWeight: 600 }}>{d.pct}%</span>
                </div>
                <div style={{ height: 4, background: "var(--surface-container)", borderRadius: 99 }}>
                  <div style={{ height: 4, width: `${d.pct}%`, background: d.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
            <div
              className="mt-4 flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "var(--surface-low)" }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: 14 }}>⚡</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface)" }}>The Technical Architect PM</div>
                <div style={{ fontSize: 11, color: "var(--on-surface-variant)" }}>Your archetype match</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="max-w-6xl mx-auto mt-16 flex items-center gap-3" style={{ color: "var(--on-surface-variant)", fontSize: 13 }}>
        <div className="flex -space-x-2">
          {["#003334","#004c4d","#00695c","#00796b","#00897b"].map((c, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid white" }} />
          ))}
        </div>
        <span>Trusted by <strong style={{ color: "var(--on-surface)" }}>2,400+</strong> aspiring PMs across India</span>
      </div>
    </section>
  );
}

// ─── Value Props ──────────────────────────────────────────────────────────────

function ValueProps() {
  const props = [
    {
      icon: "◎",
      title: "Clarity of Outcome",
      body: "We assess your actual background instead of paying for courses. You'll know exactly where you stand.",
    },
    {
      icon: "⬡",
      title: "The Archetype System",
      body: "Map your background to one of 5 core PM personas. Understand your strengths as an 'Architect' or 'Operator'.",
    },
    {
      icon: "◷",
      title: "Interview Prep Loop",
      body: "Real-time case studies built for what you're weak at. Get feedback on every response.",
    },
  ];

  return (
    <section style={{ background: "var(--surface)", padding: "80px 32px" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center mb-2"
          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 32, color: "var(--on-surface)" }}
        >
          Outcome-Focused, Not Content-Heavy
        </h2>
        <p className="text-center mb-12" style={{ fontSize: 15, color: "var(--on-surface-variant)" }}>
          We don't sell 500-hour video courses. We provide a surgical system designed<br />to get you hired into strong PM roles.
        </p>
        <div className="grid grid-cols-3 gap-8">
          {props.map((p) => (
            <div key={p.title}>
              <div style={{ fontSize: 28, marginBottom: 16, color: "var(--primary)" }}>{p.icon}</div>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8, color: "var(--on-surface)" }}>{p.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--on-surface-variant)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Archetype System ─────────────────────────────────────────────────────────

function ArchetypeSystem() {
  const archetypes = [
    {
      name: "The Builder",
      tags: ["PM Strategy", "Durability Time"],
      desc: "Thrives in high-stakes technical systems and platform products. You don't just manage features; you architect the foundational PM capability.",
      featured: true,
    },
    {
      name: "The Strategist",
      desc: "Thrives in product positioning and business model innovation. Growth-oriented.",
      featured: false,
    },
    {
      name: "The Advocate",
      desc: "Thrives in roles that focus on research, empathy and deeply understanding users.",
      featured: false,
    },
  ];

  return (
    <section style={{ background: "var(--primary)", padding: "80px 32px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
              Know your type
            </p>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 36, color: "white", lineHeight: 1.1 }}>
              The Archetype System
            </h2>
          </div>
          <button style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            View all archetypes
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {archetypes.map((a) => (
            <div
              key={a.name}
              style={{
                background: a.featured ? "var(--primary-container)" : "rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle geometric texture for featured */}
              {a.featured && (
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              )}
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 20, color: "white", marginBottom: 12 }}>
                {a.name}
              </h3>
              {a.tags && (
                <div className="flex gap-2 mb-3">
                  {a.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", padding: "3px 10px", borderRadius: 99 }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.7)" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks({ onCTA }) {
  const steps = [
    { n: "01", label: "Assessment", desc: "Understand your real starting point across 5 PM dimensions." },
    { n: "02", label: "Archetype", desc: "Discover your PM persona and target the right roles for you." },
    { n: "03", label: "Roadmap",   desc: "Follow a personalised 1/3/6 month plan built around your gaps." },
    { n: "04", label: "Coach",     desc: "Practice interviews with instant feedback until you're ready." },
  ];

  return (
    <section style={{ background: "var(--surface-lowest)", padding: "80px 32px" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center mb-2"
          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 32, color: "var(--on-surface)" }}
        >
          A System to Get You Hired
        </h2>
        <p className="text-center mb-14" style={{ fontSize: 15, color: "var(--on-surface-variant)" }}>
          Not a course. Not a community. An architectural journey.
        </p>

        <div className="grid grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: 20, left: "60%", right: "-40%", height: 1, background: "var(--surface-container)" }} />
              )}
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: "white" }}>{s.n}</span>
              </div>
              <h4 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--on-surface)", marginBottom: 6 }}>{s.label}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--on-surface-variant)" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="text-center py-16 px-8 rounded-2xl"
          style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)" }}
        >
          <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 34, color: "white", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Ready to stop guessing and start<br />architecting your career?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
            Take the first step. Get your PM Readiness Score in 15 minutes.
          </p>
          <button
            onClick={onCTA}
            style={{
              background: "white",
              color: "var(--primary)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Check your PM readiness now
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "var(--on-surface)", padding: "40px 32px" }}>
      <div className="max-w-6xl mx-auto flex items-start justify-between">
        <div>
          <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, color: "white" }}>ET.</span>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6, maxWidth: 220, lineHeight: 1.6 }}>
            Executive Transition — PM transition platform built for the Indian market.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-16">
          {[
            { heading: "Platform", links: ["Assessments", "Roadmap", "Interview Prep", "Resources"] },
            { heading: "Company",  links: ["About", "Blog", "Careers", "Contact"] },
            { heading: "Legal",    links: ["Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.heading}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                {col.heading}
              </div>
              {col.links.map((l) => (
                <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function LandingPage({ onCTA }) {
  return (
    <div>
      <Nav onCTA={onCTA} />
      <Hero onCTA={onCTA} />
      <ValueProps />
      <ArchetypeSystem />
      <HowItWorks onCTA={onCTA} />
      <Footer />
    </div>
  );
}
