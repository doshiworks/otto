import { useState, useEffect } from "react";
import { ARCHETYPES } from "../lib/scoring";
import { generateInsights } from "../lib/gemini";
import QuoteBanner from "../components/QuoteBanner";

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

function getPhaseLabel(score) {
  if (score >= 80) return "Ready to Apply";
  if (score >= 60) return "Acceleration Phase";
  if (score >= 40) return "Discovery Phase";
  return "Foundation Phase";
}

export default function ReadinessReportPage({ results, user, onUnlock }) {
  const overall = results?.overall ?? 58;
  const archetypeName = results?.archetype ?? "Builder";
  const archetype = ARCHETYPES[archetypeName];
  const dimensions = results?.dimensions ?? [
    { name: "Strategy", score: 50, weak: false },
    { name: "Execution", score: 50, weak: false },
    { name: "Tech & Data", score: 50, weak: false },
    { name: "Communication", score: 50, weak: false },
  ];

  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);

  useEffect(() => {
    generateInsights({ archetype: archetypeName, overall, dimensions })
      .then(setAiInsights)
      .catch(() => setAiInsights(null))
      .finally(() => setAiLoading(false));
  }, []);

  const riskAreas = aiInsights?.riskAreas ?? archetype.riskAreas;
  const insight = aiInsights?.insight ?? archetype.insight;
  const summary = aiInsights?.summary ?? archetype.description;

  // SVG gauge math — circumference of r=40 circle = 251.32
  const circumference = 251.32;
  const dashOffset = circumference - (overall / 100) * circumference;

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

      <QuoteBanner />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: "#003334", marginBottom: 8 }}>
            {user?.name ? `${user.name}'s Readiness Report` : "Your Readiness Report"}
          </h1>
          <p style={{ fontSize: 16, color: "#3f4945" }}>A comprehensive analysis of your PM transition potential across 4 core dimensions.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 32, alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Archetype reveal */}
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#004c4d 0.5px, transparent 0.5px)", backgroundSize: "12px 12px", opacity: 0.03 }} />
              <div style={{ padding: "40px 48px", display: "flex", gap: 40, alignItems: "center" }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#004c4d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 64, color: "#8dd3d3" }}>{archetype.icon}</span>
                </div>
                <div>
                  <span style={{ display: "inline-block", background: "rgba(124,45,0,0.1)", color: "#7c2d00", padding: "3px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    Your PM Archetype
                  </span>
                  <h2 style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 40, color: "#003334", marginBottom: 12, lineHeight: 1 }}>
                    You are {archetypeName === "Explorer" ? "an" : "a"} {archetypeName}
                  </h2>
                  <p style={{ fontSize: 15, color: "#3f4945", lineHeight: 1.7, maxWidth: 500, marginBottom: 20 }}>
                    {aiLoading ? "Analysing your results..." : summary}
                  </p>
                  <div className="flex gap-3">
                    {archetype.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2" style={{ background: "#eceeef", padding: "6px 14px", borderRadius: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#003334" }}>{archetype.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Dimensions — partially paywalled */}
            <div style={{ background: "white", borderRadius: 16, padding: 32, position: "relative" }}>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: "#003334", marginBottom: 28 }}>Your 4 Dimensions</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  {/* Show first 2 dimensions unlocked */}
                  {dimensions.slice(0, 2).map((d) => (
                    <div key={d.name} style={{ marginBottom: 20 }}>
                      <div className="flex justify-between" style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: d.weak ? "#7c2d00" : "#191c1d" }}>
                        <span>{d.name}</span><span>{d.score}%</span>
                      </div>
                      <div style={{ height: 8, background: "#e6e8e9", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${d.score}%`, background: d.weak ? "#7c2d00" : "#003334", borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                  {/* Blurred locked dimensions */}
                  <div style={{ position: "relative" }}>
                    {[75, 60].map((w, i) => <LockedRow key={i} width={`${w}%`} />)}
                  </div>
                </div>

                <div style={{ background: "#f2f4f5", borderRadius: 12, padding: 20 }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(124,45,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "#7c2d00", fontSize: 20 }}>warning</span>
                    </div>
                    <h4 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: "#191c1d" }}>Interview Risk Areas</h4>
                  </div>
                  {/* Show first risk area */}
                  <div className="flex items-start gap-2" style={{ marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c2d00", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6 }}>{riskAreas[0]}</p>
                  </div>
                  {/* Blurred locked risk items */}
                  <div style={{ filter: "blur(4px)" }}>
                    {riskAreas.slice(1).map((r, i) => (
                      <div key={i} className="flex items-start gap-2" style={{ marginBottom: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c2d00", marginTop: 6, flexShrink: 0 }} />
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
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 32, color: "#003334", lineHeight: 1 }}>{overall}%</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3f4945", marginTop: 4 }}>Ready</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6, marginBottom: 20 }}>
                You are in the <strong style={{ color: "#003334" }}>{getPhaseLabel(overall)}</strong>. Unlock your full report to see exactly what to do next.
              </p>
              <button
                onClick={onUnlock}
                style={{ width: "100%", padding: "14px", background: "#003334", color: "white", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                Unlock full personalised roadmap
              </button>
            </div>

            {/* Insight */}
            <div style={{ background: "#7c2d00", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -8, right: -8, opacity: 0.08 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 80 }}>lightbulb</span>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                {archetypeName}'s Insight
              </p>
              <p style={{ fontSize: 13, color: "white", lineHeight: 1.7, fontWeight: 500 }}>
                {aiLoading ? "Generating your insight..." : `"${insight}"`}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
