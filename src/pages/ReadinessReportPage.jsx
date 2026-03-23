const dimensions = [
  { label: "Product Sense",           pct: 42, color: "#3a5a1c", weak: true },
  { label: "Technical Execution",     pct: 88, color: "#003334", weak: false },
  { label: "Leadership & Soft Skills",pct: 65, color: "#003334", weak: false },
  { label: "Analytical Reasoning",    pct: 72, color: "#003334", weak: false },
  { label: "Strategic Communication", pct: 35, color: "#3a5a1c", weak: true },
];

const riskAreas = [
  "Over-explaining technical implementation details instead of user value.",
  "Struggling with 'whiteboard' product design questions requiring empathy maps.",
  "Communication style too 'bottom-up' for executive leadership rounds.",
];

// Blurred placeholder rows for locked content
function LockedRow({ width }) {
  return (
    <div style={{ height: 18, width, background: "#e1e3e4", borderRadius: 4, filter: "blur(5px)", marginBottom: 10 }} />
  );
}

function PaywallOverlay({ onUnlock }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(248,250,250,0) 0%, rgba(248,250,250,0.97) 40%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 40, zIndex: 10, borderRadius: 16 }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#004D40", marginBottom: 12, display: "block" }}>lock</span>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: "#191c1d", marginBottom: 8 }}>Unlock your full report</h3>
        <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6, marginBottom: 20 }}>
          See your complete gap analysis, interview risk areas, and your personalised 3-month roadmap.
        </p>
        <button
          onClick={onUnlock}
          style={{ background: "#004D40", color: "white", padding: "14px 40px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
        >
          Unlock full report — ₹999/mo
        </button>
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 10 }}>Cancel anytime. Instant access.</p>
      </div>
    </div>
  );
}

export default function ReadinessReportPage({ onUnlock }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafa" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(191,201,196,0.2)", padding: "12px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: "#004D40" }}>Otto</span>
        <button
          onClick={onUnlock}
          style={{ background: "#004D40", color: "white", padding: "8px 20px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
        >
          Unlock Full Report
        </button>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: "#003334", marginBottom: 8 }}>Full Readiness Report</h1>
          <p style={{ fontSize: 16, color: "#3f4945" }}>A comprehensive analysis of your PM transition potential based on 5 dimensional metrics.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 32, alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Archetype reveal */}
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#004c4d 0.5px, transparent 0.5px)", backgroundSize: "12px 12px", opacity: 0.03 }} />
              <div style={{ padding: "40px 48px", display: "flex", gap: 40, alignItems: "center" }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#004c4d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 64, color: "#8dd3d3" }}>architecture</span>
                </div>
                <div>
                  <span style={{ display: "inline-block", background: "rgba(58,90,28,0.1)", color: "#3a5a1c", padding: "3px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    Your PM Archetype
                  </span>
                  <h2 style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 40, color: "#003334", marginBottom: 12, lineHeight: 1 }}>You are a Builder</h2>
                  <p style={{ fontSize: 15, color: "#3f4945", lineHeight: 1.7, maxWidth: 500, marginBottom: 20 }}>
                    You understand how products are built. Your strength lies in technical feasibility, execution, and scaling complex systems. To crack PM interviews, you need to strengthen user thinking and communication.
                  </p>
                  <div className="flex gap-3">
                    {["Technical Depth", "High Velocity"].map((tag) => (
                      <div key={tag} className="flex items-center gap-2" style={{ background: "#eceeef", padding: "6px 14px", borderRadius: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#003334" }}>construction</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Dimensions — partially paywalled */}
            <div style={{ background: "white", borderRadius: 16, padding: 32, position: "relative" }}>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: "#003334", marginBottom: 28 }}>The 5 Dimensions of You</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  {dimensions.slice(0, 2).map((d) => (
                    <div key={d.label} style={{ marginBottom: 20 }}>
                      <div className="flex justify-between" style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: d.weak ? "#3a5a1c" : "#191c1d" }}>
                        <span>{d.label}</span><span>{d.pct}%</span>
                      </div>
                      <div style={{ height: 8, background: "#e6e8e9", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${d.pct}%`, background: d.color, borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                  {/* Blurred locked items */}
                  <div style={{ position: "relative" }}>
                    {[80, 65, 55].map((w, i) => <LockedRow key={i} width={`${w}%`} />)}
                  </div>
                </div>

                <div style={{ background: "#f2f4f5", borderRadius: 12, padding: 20 }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(58,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "#3a5a1c", fontSize: 20 }}>warning</span>
                    </div>
                    <h4 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: "#191c1d" }}>Interview Risk Areas</h4>
                  </div>
                  {riskAreas.slice(0, 1).map((r) => (
                    <div key={r} className="flex items-start gap-2" style={{ marginBottom: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3a5a1c", marginTop: 6, flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6 }}>{r}</p>
                    </div>
                  ))}
                  {/* Blurred locked risk items */}
                  <div style={{ filter: "blur(4px)" }}>
                    {riskAreas.slice(1).map((r, i) => (
                      <div key={i} className="flex items-start gap-2" style={{ marginBottom: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3a5a1c", marginTop: 6, flexShrink: 0 }} />
                        <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6 }}>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Paywall overlay */}
              <PaywallOverlay onUnlock={onUnlock} />
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Gauge */}
            <div style={{ background: "white", borderRadius: 16, padding: 32, textAlign: "center" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: 20 }}>Overall Readiness</p>
              <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 20px" }}>
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e6e8e9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003334" strokeWidth="8"
                    strokeDasharray="251.32" strokeDashoffset="105.55"
                    strokeLinecap="round"
                    style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 32, color: "#003334", lineHeight: 1 }}>58%</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3f4945", marginTop: 4 }}>Ready</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6, marginBottom: 20 }}>
                You are in the <strong style={{ color: "#003334" }}>Discovery Phase</strong>. Most successful Builders spend 4–6 weeks bridging the product-thinking gap.
              </p>
              <button
                onClick={onUnlock}
                style={{ width: "100%", padding: "14px", background: "#003334", color: "white", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                Unlock full personalised roadmap
              </button>
            </div>

            {/* Insight */}
            <div style={{ background: "rgba(255,182,146,0.15)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -8, right: -8, opacity: 0.08 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 80 }}>lightbulb</span>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3a5a1c", marginBottom: 8 }}>Architect's Insight</p>
              <p style={{ fontSize: 13, color: "#4e7a28", lineHeight: 1.7, fontWeight: 500 }}>
                "The best PMs aren't just technical; they're translators. Focus on the 'Why' for the next 48 hours."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
