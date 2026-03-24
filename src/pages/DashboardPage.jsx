import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ARCHETYPES } from "../lib/scoring";
import { generateInterviewFeedback } from "../lib/gemini";

// ─── Shared shell ─────────────────────────────────────────────────────────────

function Shell({ activeTab, onNavigate, onSignOut, onRetake, user, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafa" }}>
      <Sidebar activeTab={activeTab} onNavigate={onNavigate} onSignOut={onSignOut} onRetake={onRetake} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", position: "sticky", top: 0, zIndex: 50, padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(191,201,196,0.15)" }}>
          <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#191c1d" }}>
            {user?.name ? `Welcome back, ${user.name.split(" ")[0]}` : "Welcome back"}
          </span>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined" style={{ color: "#64748b", cursor: "pointer" }}>notifications</span>
            <span className="material-symbols-outlined" style={{ color: "#64748b", cursor: "pointer" }}>settings</span>
          </div>
        </header>
        <main style={{ flex: 1, padding: "32px 40px", maxWidth: 1200, width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab({ onNavigate, results, user }) {
  const archetypeName = results?.archetype ?? "Builder";
  const archetype = ARCHETYPES[archetypeName];
  const overall = results?.overall ?? 0;
  const dimensions = results?.dimensions ?? [];
  const weakDims = dimensions.filter((d) => d.weak);
  const topWeak = weakDims[0]?.name ?? "Product Sense";

  // SVG gauge
  const circumference = 251.32;
  const dashOffset = circumference - (overall / 100) * circumference;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Priority action */}
        <div style={{ background: "#004c4d", borderRadius: 24, padding: 36, color: "white", position: "relative", overflow: "hidden" }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", padding: "4px 12px", borderRadius: 99, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Priority Action</span>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 28, lineHeight: 1.2, marginBottom: 12, maxWidth: 480 }}>
            Strengthen your {topWeak} skills
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 440 }}>
            As {archetypeName === "Explorer" ? "an" : "a"} <span style={{ color: "#8dd3d3", fontWeight: 700, fontStyle: "italic" }}>{archetypeName}</span>, this is your biggest gap before interviews. Completing this module will boost your Readiness Score by +12 points.
          </p>
          <button style={{ background: "#8dd3d3", color: "#003334", padding: "12px 28px", borderRadius: 12, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Execute Module
          </button>
        </div>

        {/* Roadmap */}
        <div>
          <div className="flex items-end justify-between" style={{ marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: "#191c1d" }}>Your Roadmap</h3>
              <p style={{ fontSize: 13, color: "#3f4945", marginTop: 4 }}>Timeline: <strong style={{ color: "#003334" }}>3 Months Standard</strong></p>
            </div>
            <div className="flex" style={{ background: "#f2f4f5", borderRadius: 12, padding: 4, gap: 2 }}>
              {["1m", "3m", "6m"].map((t, i) => (
                <button key={t} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: i === 1 ? "white" : "transparent", color: i === 1 ? "#003334" : "#64748b", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", boxShadow: i === 1 ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>{t}</button>
              ))}
            </div>
          </div>

          {[
            { icon: "psychology", title: "Foundations: Product Sense", status: "In Progress", pct: 75, week: "Week 3 of 12", target: "Target: Oct 14", locked: false },
            { icon: "groups",     title: "Execution: User Research",   status: "Locked",      pct: 0,  week: "Next Phase",   target: "Target: Nov 01", locked: true },
          ].map((item) => (
            <div key={item.title} style={{ background: item.locked ? "rgba(255,255,255,0.5)" : "white", borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16, marginBottom: 12, opacity: item.locked ? 0.6 : 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: item.locked ? "#eceeef" : "#004c4d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: item.locked ? "#94a3b8" : "#8dd3d3", fontSize: 22 }}>{item.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#191c1d" }}>{item.title}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: item.locked ? "#94a3b8" : "#003334" }}>{item.status}</span>
                </div>
                <div style={{ height: 6, background: "#eceeef", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.pct}%`, background: "#003334", borderRadius: 99 }} />
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#3f4945" }}>{item.week}</p>
                <p style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", marginTop: 4 }}>{item.target}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Practice performance + daily loop */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 28 }}>
            <h3 className="flex items-center gap-2" style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, marginBottom: 24, color: "#191c1d" }}>
              <span className="material-symbols-outlined" style={{ color: "#7c2d00", fontSize: 20 }}>history</span>
              Practice Performance
            </h3>
            {[
              { label: "Product Estimation", filled: 3, total: 4 },
              { label: "Strategy & Vision",  filled: 2, total: 4 },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between" style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: "#475569" }}>{row.label}</span>
                <div className="flex gap-1">
                  {Array.from({ length: row.total }).map((_, i) => (
                    <div key={i} style={{ width: 16, height: 8, borderRadius: 99, background: i < row.filled ? "#003334" : "#e6e8e9" }} />
                  ))}
                </div>
              </div>
            ))}
            <p style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6, borderTop: "1px solid #f2f4f5", paddingTop: 16 }}>
              "Your strategy answers are structurally sound but lack specific KPI alignment."
            </p>
          </div>

          <div style={{ background: "#f2f4f5", borderRadius: 24, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#191c1d" }}>Daily Mock Loop</h3>
              <p style={{ fontSize: 13, color: "#3f4945", marginBottom: 20 }}>3 Practice Questions queued for today.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: "chat",    label: "Estimate the market size for..." },
                  { icon: "videocam", label: "Mock: Conflict with Engineer..." },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3" style={{ background: "white", padding: "10px 14px", borderRadius: 12 }}>
                    <span className="material-symbols-outlined" style={{ color: "#003334", fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#191c1d" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => onNavigate("practice-interviews")}
              className="flex items-center justify-center gap-2"
              style={{ width: "100%", marginTop: 20, padding: "12px", background: "#004D40", color: "white", borderRadius: 12, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
            >
              Start Daily Loop
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Readiness gauge */}
        <div style={{ background: "white", borderRadius: 24, padding: 28, textAlign: "center" }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#94a3b8", marginBottom: 20 }}>Readiness Score</p>
          <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 16px" }}>
            <svg width="140" height="140" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f2f4f5" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003334" strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 30, color: "#191c1d", lineHeight: 1 }}>{overall}</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#003334", marginTop: 4 }}>Ready</span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#3f4945", lineHeight: 1.6 }}>
            {overall >= 70 ? "You're in strong shape. Keep up the practice." : "Keep going — you're making progress every day."}
          </p>
        </div>

        {/* Archetype card */}
        <div style={{ background: "#e1e3e4", borderRadius: 24, padding: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -16, right: -16, opacity: 0.1 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 100 }}>{archetype.icon}</span>
          </div>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7c2d00", marginBottom: 8 }}>My Archetype</p>
          <h3 style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 20, color: "#191c1d", marginBottom: 8 }}>{archetype.title}</h3>
          <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, marginBottom: 16 }}>{archetype.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {archetype.tags.map((t) => (
              <span key={t} style={{ background: "white", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "#003334" }}>{t}</span>
            ))}
            {weakDims.map((d) => (
              <span key={d.name} style={{ background: "rgba(255,255,255,0.5)", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>Grow: {d.name}</span>
            ))}
          </div>
        </div>

        {/* Dimension breakdown */}
        <div style={{ background: "white", borderRadius: 24, padding: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: 20 }}>Score Breakdown</p>
          {dimensions.map((d) => (
            <div key={d.name} style={{ marginBottom: 16 }}>
              <div className="flex justify-between" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: d.weak ? "#7c2d00" : "#191c1d" }}>{d.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: d.weak ? "#7c2d00" : "#003334" }}>{d.score}%</span>
              </div>
              <div style={{ height: 6, background: "#eceeef", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${d.score}%`, background: d.weak ? "#7c2d00" : "#003334", borderRadius: 99, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
          {weakDims.length > 0 && (
            <p style={{ fontSize: 11, color: "#7c2d00", marginTop: 4, fontWeight: 600 }}>
              ↑ Green = focus areas for your next session
            </p>
          )}
        </div>

        {/* Next milestone */}
        <div style={{ background: "#003334", borderRadius: 24, padding: 24 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#77bcbd", marginBottom: 12, display: "block" }}>flag</span>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#77bcbd", marginBottom: 6 }}>Next Milestone</p>
          <p style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: "white", marginBottom: 8, lineHeight: 1.4 }}>
            Complete your first practice interview to unlock your personalised roadmap.
          </p>
          <button style={{ width: "100%", padding: "10px", background: "#004c4d", color: "white", borderRadius: 8, border: "1px solid rgba(119,188,189,0.3)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope" }}>
            Start Practice Interview
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Practice Questions tab ───────────────────────────────────────────────────

const practiceQuestions = [
  { id: 1, category: "Product Strategy", q: "Design a new feature for Razorpay to improve merchant retention.", time: "15 mins", company: "Razorpay" },
  { id: 2, category: "Estimation",       q: "Estimate the number of Swiggy orders placed on a typical Sunday in Mumbai.", time: "10 mins", company: "Swiggy" },
  { id: 3, category: "Behavioural",      q: "Tell me about a time you had to make a product decision with incomplete data.", time: "8 mins",  company: "Any" },
  { id: 4, category: "Product Design",   q: "Design an onboarding experience for first-time investors on Groww.", time: "20 mins", company: "Groww" },
  { id: 5, category: "Strategy",         q: "You're the PM for Zomato Gold. How do you increase renewals by 20%?", time: "15 mins", company: "Zomato" },
];

const CAT_COLORS = {
  "Product Strategy": { bg: "#cbe4e9", text: "#4f666a" },
  "Estimation":       { bg: "#fde8d8", text: "#7c2d00" },
  "Behavioural":      { bg: "#e1e3e4", text: "#3f4945" },
  "Product Design":   { bg: "#cbe4e9", text: "#4f666a" },
  "Strategy":         { bg: "rgba(0,51,52,0.08)", text: "#003334" },
};

function PracticeQuestionsTab({ results }) {
  const [active, setActive] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const fb = await generateInterviewFeedback({
        question: active.q,
        context: `Category: ${active.category}. Company context: ${active.company}.`,
        answer,
        archetype: results?.archetype ?? "Builder",
        dimensions: results?.dimensions ?? [],
      });
      setFeedback(fb);
    } catch {
      setFeedback(null);
    }
    setLoading(false);
    setSubmitted(true);
  }

  function handleBack() {
    setActive(null);
    setAnswer("");
    setSubmitted(false);
    setFeedback(null);
  }

  // Answer view
  if (active && !submitted) {
    return (
      <div style={{ maxWidth: 800 }}>
        <button className="flex items-center gap-2" onClick={handleBack} style={{ background: "none", border: "none", color: "#003334", fontWeight: 700, fontSize: 12, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back to Questions
        </button>
        <div style={{ background: "white", borderRadius: 16, padding: 32, marginBottom: 16 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
            <span style={{ background: CAT_COLORS[active.category]?.bg ?? "#eceeef", color: CAT_COLORS[active.category]?.text ?? "#3f4945", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{active.category}</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>{active.company} · {active.time}</span>
          </div>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 22, color: "#003334", lineHeight: 1.4 }}>{active.q}</h2>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here. Be specific — the more detail you give, the better the AI feedback."
          rows={12}
          style={{ width: "100%", background: "white", borderRadius: 16, border: "none", padding: 24, fontSize: 14, fontFamily: "Inter", color: "#191c1d", resize: "vertical", outline: "none", boxSizing: "border-box", boxShadow: "0 2px 8px rgba(0,51,52,0.06)", marginBottom: 16 }}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading || !answer.trim()}
            className="flex items-center gap-2"
            style={{ background: loading || !answer.trim() ? "#e1e3e4" : "#003334", color: loading || !answer.trim() ? "#94a3b8" : "white", padding: "12px 28px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: loading || !answer.trim() ? "default" : "pointer" }}
          >
            {loading ? "Analysing..." : "Get AI Feedback"}
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{loading ? "hourglass_empty" : "auto_awesome"}</span>
          </button>
        </div>
      </div>
    );
  }

  // Feedback view
  if (active && submitted) {
    const f = feedback;
    const circumference = 251.32;
    const score = f?.score ?? 0;
    const dashOffset = circumference - (score / 100) * circumference;
    return (
      <div style={{ maxWidth: 800 }}>
        <button className="flex items-center gap-2" onClick={handleBack} style={{ background: "none", border: "none", color: "#003334", fontWeight: 700, fontSize: 12, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back to Questions
        </button>
        {!f ? (
          <div style={{ background: "white", borderRadius: 16, padding: 40, textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#3f4945" }}>Couldn't generate feedback — please try again.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Score card */}
            <div style={{ background: "white", borderRadius: 16, padding: 28, display: "flex", gap: 28, alignItems: "center" }}>
              <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e6e8e9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003334" strokeWidth="8"
                    strokeDasharray={circumference} strokeDashoffset={dashOffset}
                    strokeLinecap="round" style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 22, color: "#003334", lineHeight: 1 }}>{score}</span>
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>/ 100</span>
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 18, color: "#003334", fontStyle: "italic", marginBottom: 6 }}>"{f.label}"</h3>
                <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6 }}>{f.summary}</p>
              </div>
            </div>
            {/* What worked / didn't */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "white", borderRadius: 16, padding: 24 }}>
                <p style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#16a34a", marginBottom: 16 }}>What Worked</p>
                {(f.whatWorked ?? []).map((item) => (
                  <div key={item.title} className="flex gap-2" style={{ marginBottom: 12 }}>
                    <span style={{ color: "#16a34a", fontWeight: 700 }}>•</span>
                    <div><p style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{item.title}</p><p style={{ fontSize: 12, color: "#3f4945" }}>{item.body}</p></div>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", borderRadius: 16, padding: 24 }}>
                <p style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#ba1a1a", marginBottom: 16 }}>What to Improve</p>
                {(f.whatDidnt ?? []).map((item) => (
                  <div key={item.title} className="flex gap-2" style={{ marginBottom: 12 }}>
                    <span style={{ color: "#ba1a1a", fontWeight: 700 }}>•</span>
                    <div><p style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{item.title}</p><p style={{ fontSize: 12, color: "#3f4945" }}>{item.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Improvement path */}
            <div style={{ background: "#f2f4f5", borderRadius: 16, padding: 24 }}>
              <p style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#003334", marginBottom: 8 }}>How to improve</p>
              <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6, marginBottom: 16 }}>{f.improvementPath}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "white", borderRadius: 10, padding: 14, borderLeft: "4px solid #7c2d00" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#7c2d00", marginBottom: 4 }}>Next Action</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#003334" }}>{f.recommendedAction}</p>
                </div>
                <div style={{ background: "white", borderRadius: 10, padding: 14, borderLeft: "4px solid #003334" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#003334", marginBottom: 4 }}>Study This</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#003334" }}>{f.learningResource}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Question list
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: "#191c1d", marginBottom: 6 }}>Practice Questions</h2>
        <p style={{ fontSize: 14, color: "#3f4945" }}>Write your answer, then get personalised AI feedback.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {practiceQuestions.map((q) => {
          const c = CAT_COLORS[q.category] || { bg: "#eceeef", text: "#3f4945" };
          return (
            <div key={q.id} style={{ background: "white", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{q.category}</span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{q.company} · {q.time}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#191c1d", lineHeight: 1.5 }}>{q.q}</p>
              </div>
              <button
                onClick={() => { setActive(q); setAnswer(""); setSubmitted(false); setFeedback(null); }}
                style={{ background: "#003334", color: "white", padding: "10px 22px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0 }}
              >
                Start →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Practice Interviews tab ──────────────────────────────────────────────────

const interviewScenarios = [
  {
    id: 1,
    category: "Product Strategy",
    title: "Design a new feature for Razorpay to improve merchant retention.",
    context: "Razorpay is seeing a slight uptick in churn among mid-market merchants who are being courted by competitors with aggressive pricing. As the PM, how would you design a feature that increases switching cost and adds long-term value beyond simple payment processing?",
    persona: "As a Builder Persona",
    personaHint: "Focus on technical feasibility, API extensibility, and infrastructure scaling to create 'sticky' integrations.",
    tips: [
      { title: "Use the CIRCLES framework", body: "Don't jump to the solution. Start with Comprehending the situation and Identifying customers." },
      { title: "Clarify user goals first", body: "Is the goal revenue growth or long-term retention? Align your feature set to that specific north star." },
      { title: "Scale & Infrastructure", body: "Since you are a Builder, mention how this feature would scale to 10M+ transactions without latency." },
    ],
    timeLimit: 15 * 60,
  },
];

function PracticeInterviewsTab({ onSubmit, results }) {
  const [active, setActive] = useState(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function startInterview(scenario) {
    setActive(scenario);
    setAnswer("");
    setTimeLeft(scenario.timeLimit);
  }

  async function handleSubmit() {
    if (!answer.trim()) return;
    setSubmitting(true);
    try {
      const feedback = await generateInterviewFeedback({
        question: active.title,
        context: active.context,
        answer,
        archetype: results?.archetype ?? "Builder",
        dimensions: results?.dimensions ?? [],
      });
      onSubmit({ feedback, scenario: active });
    } catch {
      onSubmit({ feedback: null, scenario: active });
    }
    setSubmitting(false);
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  if (!active) {
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: "#191c1d", marginBottom: 6 }}>Practice Interviews</h2>
          <p style={{ fontSize: 14, color: "#3f4945" }}>Timed simulations. Write your full answer before the clock runs out, then get AI feedback.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {interviewScenarios.map((s) => (
            <div key={s.id} style={{ background: "white", borderRadius: 16, padding: 28 }}>
              <div className="flex items-start justify-between gap-4">
                <div style={{ flex: 1 }}>
                  <span style={{ background: "#cbe4e9", color: "#4f666a", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, display: "inline-block", marginBottom: 12 }}>{s.category}</span>
                  <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: "#191c1d", marginBottom: 8, lineHeight: 1.4 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6 }}>{s.context.slice(0, 120)}...</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>⏱ {Math.floor(s.timeLimit / 60)} min</p>
                  <button
                    onClick={() => startInterview(s)}
                    style={{ background: "#003334", color: "white", padding: "10px 22px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                  >
                    Start Interview →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7c2d00" }}>Interview Module</span>
            <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: "#191c1d", marginTop: 4 }}>Interview Prep Loop</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 13, color: "#3f4945", fontWeight: 500 }}>Question 1 of {interviewScenarios.length}</span>
            <div style={{ height: 6, width: 120, background: "#e6e8e9", borderRadius: 99, marginTop: 6, overflow: "hidden" }}>
              <div style={{ width: "30%", height: "100%", background: "#7c2d00", borderRadius: 99 }} />
            </div>
          </div>
        </div>

        {/* Scenario */}
        <div style={{ background: "white", borderRadius: 16, padding: 32, position: "relative", overflow: "hidden" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#cbe4e9", color: "#4f666a", padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, marginBottom: 20 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>business_center</span>
            {active.category}
          </span>
          <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 22, color: "#003334", marginBottom: 16 }}>{active.title}</h3>
          <p style={{ fontSize: 14, color: "#3f4945", lineHeight: 1.7, marginBottom: 20 }}>{active.context}</p>
          <div style={{ background: "rgba(0,51,52,0.04)", borderLeft: "4px solid #003334", borderRadius: "0 8px 8px 0", padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: "#003334", marginTop: 2, fontSize: 18 }}>construction</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#003334", marginBottom: 4 }}>{active.persona}</p>
              <p style={{ fontSize: 13, color: "#3f4945" }}>{active.personaHint}</p>
            </div>
          </div>
        </div>

        {/* Answer */}
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#191c1d" }}>Your Strategic Response</label>
            <div className="flex items-center gap-2" style={{ fontSize: 12, color: timeLeft < 120 ? "#ba1a1a" : "#3f4945", fontWeight: 700 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>timer</span>
              {timeLeft !== null ? formatTime(timeLeft) : `${active.timeLimit / 60} min`}
            </div>
          </div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Structure your answer using the CIRCLES framework..."
            rows={12}
            style={{ width: "100%", background: "white", borderRadius: 16, border: "none", padding: 24, fontSize: 14, fontFamily: "Inter", color: "#191c1d", resize: "vertical", outline: "none", boxSizing: "border-box", boxShadow: "0 2px 8px rgba(0,51,52,0.06)" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setActive(null)}
            style={{ padding: "12px 24px", background: "transparent", color: "#003334", border: "1.5px solid #bfc9c4", borderRadius: 8, fontFamily: "Manrope", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || !answer.trim()}
            className="flex items-center gap-2"
            style={{ background: submitting || !answer.trim() ? "#e1e3e4" : "#003334", color: submitting || !answer.trim() ? "#94a3b8" : "white", padding: "12px 28px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: submitting || !answer.trim() ? "default" : "pointer", transition: "all 0.2s" }}
          >
            {submitting ? "Analysing your answer..." : "Submit for AI Feedback"}
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{submitting ? "hourglass_empty" : "auto_awesome"}</span>
          </button>
        </div>
      </div>

      {/* Tips sidebar */}
      <div style={{ background: "#f2f4f5", borderRadius: 16, padding: 24, position: "sticky", top: 80, alignSelf: "flex-start" }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fde8d8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ color: "#7c2d00", fontSize: 20 }}>tips_and_updates</span>
          </div>
          <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: "#003334" }}>Architect's Tips</h3>
        </div>
        {active.tips.map((tip, i) => (
          <div key={tip.title} className="flex gap-4" style={{ marginBottom: 20 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e1e3e4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#003334", flexShrink: 0 }}>{i + 1}</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#191c1d", marginBottom: 4 }}>{tip.title}</p>
              <p style={{ fontSize: 12, color: "#3f4945", lineHeight: 1.6 }}>{tip.body}</p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #e1e3e4", paddingTop: 20, marginTop: 4 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3f4945", marginBottom: 12 }}>Peer Insight</p>
          <div style={{ background: "white", borderRadius: 10, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eceeef", flexShrink: 0 }} />
            <p style={{ fontSize: 11, fontStyle: "italic", color: "#3f4945", lineHeight: 1.5 }}>"Think about the data moat. Retention usually follows data depth." — Anjali, L7 PM at Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Interview Feedback tab ───────────────────────────────────────────────────

function InterviewFeedbackTab({ onRetry, feedback, scenario }) {
  const f = feedback;
  const circumference = 251.32;
  const score = f?.score ?? 0;
  const dashOffset = circumference - (score / 100) * circumference;

  if (!f) {
    return (
      <div style={{ textAlign: "center", padding: "80px 40px" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#94a3b8", marginBottom: 16, display: "block" }}>warning</span>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 20, color: "#191c1d", marginBottom: 8 }}>Couldn't generate feedback</h2>
        <p style={{ fontSize: 14, color: "#3f4945", marginBottom: 24 }}>Something went wrong with the AI. Please try again.</p>
        <button onClick={onRetry} style={{ background: "#003334", color: "white", padding: "12px 28px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button className="flex items-center gap-2" onClick={onRetry} style={{ background: "none", border: "none", color: "#003334", fontWeight: 700, fontSize: 12, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back to Practice Labs
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 32, color: "#003334", marginBottom: 6, letterSpacing: "-0.5px" }}>Interview Feedback</h1>
        <p style={{ fontSize: 14, color: "#3f4945" }}>Analysis for: <em>"{scenario?.title}"</em></p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 20 }}>
        {/* Score */}
        <div style={{ background: "white", borderRadius: 16, padding: 32, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 128, height: 128, marginBottom: 20 }}>
            <svg width="128" height="128" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e6e8e9" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003334" strokeWidth="8"
                strokeDasharray={circumference} strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 28, color: "#003334", lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>out of 100</span>
            </div>
          </div>
          <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 17, color: "#003334", fontStyle: "italic", marginBottom: 8 }}>"{f.label}"</h3>
          <p style={{ fontSize: 12, color: "#3f4945", lineHeight: 1.6 }}>{f.summary}</p>
        </div>

        {/* Improvement path */}
        <div style={{ background: "#f2f4f5", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 16, right: 16, opacity: 0.08 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 72 }}>trending_up</span>
          </div>
          <span style={{ background: "#fde8d8", color: "#511e00", padding: "3px 12px", borderRadius: 99, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", marginBottom: 16 }}>Next Milestone</span>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: "#003334", marginBottom: 12 }}>Improvement Path</h2>
          <p style={{ fontSize: 14, color: "#3f4945", lineHeight: 1.6, marginBottom: 24, maxWidth: 420 }}>{f.improvementPath}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 16, borderLeft: "4px solid #7c2d00" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#7c2d00", marginBottom: 4 }}>Recommended Action</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#003334" }}>{f.recommendedAction}</p>
            </div>
            <div style={{ background: "white", borderRadius: 10, padding: 16, borderLeft: "4px solid #003334" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#003334", marginBottom: 4 }}>Learning Resource</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#003334" }}>{f.learningResource}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* What worked */}
        <div style={{ background: "white", borderRadius: 16, padding: 24 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ color: "#16a34a", fontSize: 18 }}>check_circle</span>
            </div>
            <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: "#003334" }}>What Worked</h3>
          </div>
          {(f.whatWorked ?? []).map((item) => (
            <div key={item.title} className="flex gap-3" style={{ marginBottom: 14 }}>
              <span style={{ color: "#16a34a", fontWeight: 700, marginTop: 2 }}>•</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{item.title}</p>
                <p style={{ fontSize: 12, color: "#3f4945" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What didn't */}
        <div style={{ background: "white", borderRadius: 16, padding: 24 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ color: "#ba1a1a", fontSize: 18 }}>warning</span>
            </div>
            <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: "#003334" }}>What Didn't</h3>
          </div>
          {(f.whatDidnt ?? []).map((item) => (
            <div key={item.title} className="flex gap-3" style={{ marginBottom: 14 }}>
              <span style={{ color: "#ba1a1a", fontWeight: 700, marginTop: 2 }}>•</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{item.title}</p>
                <p style={{ fontSize: 12, color: "#3f4945" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Score context */}
        <div style={{ background: "#003334", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#77bcbd", marginBottom: 12, display: "block" }}>insights</span>
            <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 17, color: "white", marginBottom: 8 }}>Score Context</h3>
            <p style={{ fontSize: 12, color: "#77bcbd", lineHeight: 1.6 }}>
              {score >= 80 ? "Exceptional answer. You're interview-ready for this question type." :
               score >= 65 ? "Solid answer. A few more practice rounds and you'll nail this." :
               score >= 45 ? "Developing. Focus on the improvement path above before retrying." :
               "Needs work. Read the feedback carefully and try again with a fresh approach."}
            </p>
          </div>
          <button onClick={onRetry} style={{ width: "100%", padding: "10px", background: "#004c4d", color: "white", borderRadius: 8, border: "1px solid rgba(119,188,189,0.3)", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 20, fontFamily: "Manrope" }}>
            Try Another Question
          </button>
        </div>
      </div>

      {/* Action footer */}
      <div className="flex items-center justify-center gap-4" style={{ background: "#eceeef", borderRadius: 20, padding: 28, border: "2px dashed #bfc9c4" }}>
        {[
          { icon: "restart_alt", label: "Try Another Question", primary: true },
          { icon: "description",  label: "View Correct Sample Answer", primary: false },
          { icon: "map",          label: "Update My Roadmap", primary: false },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.label === "Try Another Question" ? onRetry : undefined}
            className="flex items-center gap-2"
            style={{ padding: "12px 24px", background: btn.primary ? "#003334" : "white", color: btn.primary ? "white" : "#003334", border: btn.primary ? "none" : "1px solid rgba(112,121,117,0.2)", borderRadius: 8, fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Roadmap tab ──────────────────────────────────────────────────────────────

const PLANS = {
  "1m": {
    label: "1 Month — Intensive Sprint",
    description: "High-pressure, high-reward. Covers only the most interview-critical material. Best for someone with an interview coming up soon.",
    phases: [
      { title: "PM Fundamentals Crash Course",        icon: "bolt",        desc: "Core frameworks: CIRCLES, prioritisation, metrics. Non-negotiable foundations.", week: "Week 1" },
      { title: "Product Sense & Case Studies",        icon: "psychology",  desc: "5 timed case study walkthroughs. Learn to structure any product question under pressure.", week: "Week 2" },
      { title: "Behavioural & Communication",         icon: "forum",       desc: "STAR method, stakeholder scenarios, conflict resolution. Fast-tracks your soft skills.", week: "Week 3" },
      { title: "Mock Interviews & Final Prep",        icon: "mic",         desc: "3 full mock interviews with AI feedback. Fix weak spots before the real thing.", week: "Week 4" },
    ],
  },
  "3m": {
    label: "3 Months — Standard Prep",
    description: "The most popular path. Broad, balanced coverage across all PM dimensions with enough time to actually build the skill, not just memorise it.",
    phases: [
      { title: "PM Foundations & Mental Models",      icon: "school",      desc: "Deep dive into product thinking, user empathy, and decision-making frameworks.", week: "Month 1 · Week 1–2" },
      { title: "Strategy & Market Thinking",          icon: "insights",    desc: "Competitive analysis, go-to-market thinking, opportunity sizing, and roadmap design.", week: "Month 1 · Week 3–4" },
      { title: "Execution & Data Fluency",            icon: "analytics",   desc: "SQL basics, metrics trees, A/B testing, and driving delivery with engineering teams.", week: "Month 2 · Week 1–2" },
      { title: "Product Sense Deep Dive",             icon: "psychology",  desc: "20+ case studies across consumer, B2B, and platform products. Real companies, real problems.", week: "Month 2 · Week 3–4" },
      { title: "Communication & Influence",           icon: "forum",       desc: "Stakeholder management, executive communication, cross-functional alignment scenarios.", week: "Month 3 · Week 1–2" },
      { title: "Mock Interviews & Polish",            icon: "mic",         desc: "5 full mock interviews, personalised feedback, and final story refinement.", week: "Month 3 · Week 3–4" },
    ],
  },
  "6m": {
    label: "6 Months — Deep Transition",
    description: "The full journey. Built for career changers who want to be genuinely ready — not just interview-ready, but PM-ready. Covers everything, at depth.",
    phases: [
      { title: "PM Foundations & Mindset",            icon: "school",      desc: "What makes a great PM, thinking in systems, user-centricity from first principles.", week: "Month 1" },
      { title: "User Research & Empathy",             icon: "groups",      desc: "Conducting interviews, synthesising insights, turning research into product decisions.", week: "Month 2" },
      { title: "Strategy & Business Acumen",          icon: "insights",    desc: "Business models, market sizing, competitive positioning, and long-term roadmap vision.", week: "Month 3" },
      { title: "Data, Tech & Analytical Reasoning",   icon: "analytics",   desc: "SQL, metrics design, instrumentation, working with engineers and data scientists.", week: "Month 4" },
      { title: "Execution, Delivery & Leadership",    icon: "settings",    desc: "Agile practices, sprint planning, OKRs, cross-functional leadership and trade-off decisions.", week: "Month 5" },
      { title: "Interview Mastery & Final Polish",    icon: "mic",         desc: "10+ mock interviews, story crafting, negotiation basics, and offer evaluation.", week: "Month 6" },
    ],
  },
};

function RoadmapTab() {
  const [timeline, setTimeline] = useState("3m");
  const plan = PLANS[timeline];

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between" style={{ marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: "#191c1d", marginBottom: 6 }}>Your Roadmap</h2>
          <p style={{ fontSize: 14, color: "#3f4945" }}>Choose the timeline that fits your situation.</p>
        </div>
        <div className="flex" style={{ background: "#f2f4f5", borderRadius: 12, padding: 4 }}>
          {["1m", "3m", "6m"].map((t) => (
            <button key={t} onClick={() => setTimeline(t)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: timeline === t ? "white" : "transparent", color: timeline === t ? "#003334" : "#64748b", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", boxShadow: timeline === t ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Plan header card */}
      <div style={{ background: "#003334", borderRadius: 16, padding: "24px 28px", marginBottom: 20, color: "white" }}>
        <p style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{plan.label}</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 600 }}>{plan.description}</p>
      </div>

      {/* Phases */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {plan.phases.map((p, i) => (
          <div key={p.title} style={{ background: "white", borderRadius: 16, padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: i === 0 ? "#004c4d" : "#eceeef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: i === 0 ? "#8dd3d3" : "#94a3b8", fontSize: 20 }}>{p.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#191c1d" }}>{p.title}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: i === 0 ? "#003334" : "#94a3b8" }}>
                  {i === 0 ? "Start Here" : p.week}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#3f4945", lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard export ────────────────────────────────────────────────────

export default function DashboardPage({ results, user, onSignOut, onRetake }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [interviewResult, setInterviewResult] = useState(null);

  function handleInterviewSubmit({ feedback, scenario }) {
    setInterviewResult({ feedback, scenario });
  }
  function handleRetry() { setInterviewResult(null); }

  return (
    <Shell activeTab={activeTab} onNavigate={setActiveTab} onSignOut={onSignOut} onRetake={onRetake} user={user}>
      {activeTab === "dashboard"           && <OverviewTab onNavigate={setActiveTab} results={results} user={user} />}
      {activeTab === "roadmap"             && <RoadmapTab results={results} />}
      {activeTab === "practice-questions"  && <PracticeQuestionsTab results={results} />}
      {activeTab === "practice-interviews" && !interviewResult && <PracticeInterviewsTab onSubmit={handleInterviewSubmit} results={results} />}
      {activeTab === "practice-interviews" && interviewResult  && <InterviewFeedbackTab onRetry={handleRetry} feedback={interviewResult.feedback} scenario={interviewResult.scenario} />}
    </Shell>
  );
}
