import { useState } from "react";
import Sidebar from "../components/Sidebar";

// ─── Shared shell ─────────────────────────────────────────────────────────────

function Shell({ activeTab, onNavigate, onSignOut, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafa" }}>
      <Sidebar activeTab={activeTab} onNavigate={onNavigate} onSignOut={onSignOut} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", position: "sticky", top: 0, zIndex: 50, padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(191,201,196,0.15)" }}>
          <div className="flex gap-6">
            {["Assessments", "Resources"].map((l) => (
              <span key={l} style={{ fontSize: 14, fontWeight: 600, color: "#64748b", cursor: "pointer", fontFamily: "Manrope" }}>{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button style={{ background: "#004D40", color: "white", padding: "8px 18px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Check Readiness
            </button>
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

function OverviewTab({ onNavigate }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Priority action */}
        <div style={{ background: "#004c4d", borderRadius: 24, padding: 36, color: "white", position: "relative", overflow: "hidden" }}>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", padding: "4px 12px", borderRadius: 99, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Priority Action</span>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 28, lineHeight: 1.2, marginBottom: 12, maxWidth: 480 }}>Finalize your User Research Case Study</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 440 }}>
            As a <span style={{ color: "#8dd3d3", fontWeight: 700, fontStyle: "italic" }}>Builder</span>, interviewers expect deep technical product sense. Completing this module will boost your Readiness Score by +12 points.
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
              <span className="material-symbols-outlined" style={{ color: "#511e00", fontSize: 20 }}>history</span>
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
                strokeDasharray="251.32" strokeDashoffset="90"
                strokeLinecap="round"
                style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 30, color: "#191c1d", lineHeight: 1 }}>68</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#003334", marginTop: 4 }}>Elite Tier</span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#3f4945", lineHeight: 1.6 }}>You are in the top 15% of candidates applying for L6 roles.</p>
        </div>

        {/* Archetype card */}
        <div style={{ background: "#e1e3e4", borderRadius: 24, padding: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -16, right: -16, opacity: 0.1 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 100 }}>architecture</span>
          </div>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#742e00", marginBottom: 8 }}>My Archetype</p>
          <h3 style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 20, color: "#191c1d", marginBottom: 8 }}>The Builder</h3>
          <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, marginBottom: 16 }}>Strength in User Research and technical execution. Growth needed in Stakeholder Alignment.</p>
          <div className="flex flex-wrap gap-2">
            {["User Research", "Execution"].map((t) => (
              <span key={t} style={{ background: "white", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "#003334" }}>{t}</span>
            ))}
            <span style={{ background: "rgba(255,255,255,0.5)", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>Strategy</span>
          </div>
        </div>

        {/* Recommended roles */}
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>Recommended Roles</h3>
            <button style={{ fontSize: 12, fontWeight: 700, color: "#003334", background: "none", border: "none", cursor: "pointer" }}>See All</button>
          </div>
          {[
            { company: "G", name: "Senior PM, Cloud", sub: "Google · Mountain View" },
            { company: "A", name: "Product Lead", sub: "Airbnb · Remote" },
          ].map((role) => (
            <div key={role.name} className="flex items-center gap-3" style={{ background: "white", padding: "14px 16px", borderRadius: 16, marginBottom: 8, cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "#eceeef", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: "#003334", flexShrink: 0 }}>{role.company}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#191c1d" }}>{role.name}</p>
                <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{role.sub}</p>
              </div>
              <span className="material-symbols-outlined" style={{ color: "#003334", fontSize: 18 }}>chevron_right</span>
            </div>
          ))}
        </div>

        {/* Application tracker */}
        <div style={{ background: "white", borderRadius: 24, padding: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: 16 }}>Application Progress</p>
          <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
            {[{ n: 12, label: "Sent" }, { n: 4, label: "Interviews", color: "#003334" }, { n: 1, label: "Offers", color: "#511e00" }].map((s, i) => (
              <div key={s.label} className="text-center" style={{ flex: 1 }}>
                {i > 0 && <div style={{ width: 1, height: 32, background: "#f2f4f5", display: "inline-block", verticalAlign: "middle" }} />}
                <div>
                  <p style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 18, color: s.color || "#191c1d" }}>{s.n}</p>
                  <p style={{ fontSize: 10, textTransform: "uppercase", color: "#94a3b8", letterSpacing: "0.08em" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "10px", background: "rgba(0,51,52,0.05)", color: "#003334", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            View Tracker
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
  "Estimation":       { bg: "#ffdbcb", text: "#7a3000" },
  "Behavioural":      { bg: "#e1e3e4", text: "#3f4945" },
  "Product Design":   { bg: "#cbe4e9", text: "#4f666a" },
  "Strategy":         { bg: "rgba(0,51,52,0.08)", text: "#003334" },
};

function PracticeQuestionsTab({ onStartQuestion }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: "#191c1d", marginBottom: 6 }}>Practice Questions</h2>
        <p style={{ fontSize: 14, color: "#3f4945" }}>Work through these at your own pace. Each question comes with framework tips.</p>
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
                onClick={() => onStartQuestion(q)}
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

function PracticeInterviewsTab({ onSubmit }) {
  const [active, setActive] = useState(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  function startInterview(scenario) {
    setActive(scenario);
    setAnswer("");
    setTimeLeft(scenario.timeLimit);
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
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#511e00" }}>Interview Module</span>
            <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: "#191c1d", marginTop: 4 }}>Interview Prep Loop</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 13, color: "#3f4945", fontWeight: 500 }}>Question 1 of {interviewScenarios.length}</span>
            <div style={{ height: 6, width: 120, background: "#e6e8e9", borderRadius: 99, marginTop: 6, overflow: "hidden" }}>
              <div style={{ width: "30%", height: "100%", background: "#511e00", borderRadius: 99 }} />
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
            onClick={() => onSubmit(answer)}
            className="flex items-center gap-2"
            style={{ background: "#003334", color: "white", padding: "12px 28px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Submit for AI Feedback
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
          </button>
        </div>
      </div>

      {/* Tips sidebar */}
      <div style={{ background: "#f2f4f5", borderRadius: 16, padding: 24, position: "sticky", top: 80, alignSelf: "flex-start" }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#ffdbcb", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ color: "#511e00", fontSize: 20 }}>tips_and_updates</span>
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

function InterviewFeedbackTab({ onRetry }) {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button className="flex items-center gap-2" onClick={onRetry} style={{ background: "none", border: "none", color: "#003334", fontWeight: 700, fontSize: 12, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back to Practice Labs
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 32, color: "#003334", marginBottom: 6, letterSpacing: "-0.5px" }}>Feedback: Product Sense Case Study</h1>
        <p style={{ fontSize: 14, color: "#3f4945" }}>Analysis for your session: <em>"Designing a subscription model for a high-end wellness app."</em></p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 20 }}>
        {/* Score */}
        <div style={{ background: "white", borderRadius: 16, padding: 32, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 128, height: 128, marginBottom: 20 }}>
            <svg width="128" height="128" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e6e8e9" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003334" strokeWidth="8"
                strokeDasharray="251.32" strokeDashoffset="70"
                strokeLinecap="round"
                style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 28, color: "#003334", lineHeight: 1 }}>72</span>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>out of 100</span>
            </div>
          </div>
          <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 17, color: "#003334", fontStyle: "italic", marginBottom: 8 }}>"Authoritative & Strategic"</h3>
          <p style={{ fontSize: 12, color: "#3f4945", lineHeight: 1.6 }}>Strong structuring and user empathy, but missed the edge-case monetization strategy needed for executive-level depth.</p>
        </div>

        {/* Improvement path */}
        <div style={{ background: "#f2f4f5", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 16, right: 16, opacity: 0.08 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 72 }}>trending_up</span>
          </div>
          <span style={{ background: "#ffdbcb", color: "#341100", padding: "3px 12px", borderRadius: 99, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", marginBottom: 16 }}>Next Milestone</span>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: "#003334", marginBottom: 12 }}>Improvement Path</h2>
          <p style={{ fontSize: 14, color: "#3f4945", lineHeight: 1.6, marginBottom: 24, maxWidth: 420 }}>
            Your Product Sense is sharp, but your <strong>Technical Fluency</strong> score lagged. To bridge the gap for Lead PM roles, focus on articulating system constraints.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 16, borderLeft: "4px solid #511e00" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#511e00", marginBottom: 4 }}>Recommended Action</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#003334" }}>Retry this question with a focus on Tech Fluency</p>
            </div>
            <div style={{ background: "white", borderRadius: 10, padding: 16, borderLeft: "4px solid #003334" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#003334", marginBottom: 4 }}>Learning Resource</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#003334" }}>Review the Metrics Framework</p>
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
          {[
            { title: "Clear user segments", body: "Identified high-value personas early." },
            { title: "Logical flow", body: "Framework followed a consistent path." },
            { title: "Value Proposition", body: "Articulated 'Why' behind every feature." },
          ].map((item) => (
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
          {[
            { title: "Vague success metrics", body: "KPIs were too generic (e.g., 'more users')." },
            { title: "Ignored technical constraints", body: "Proposals required heavy real-time infra." },
            { title: "Monetization Depth", body: "Skipped tier-based pricing logic." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3" style={{ marginBottom: 14 }}>
              <span style={{ color: "#ba1a1a", fontWeight: 700, marginTop: 2 }}>•</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#003334" }}>{item.title}</p>
                <p style={{ fontSize: 12, color: "#3f4945" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Archetype sync */}
        <div style={{ background: "#003334", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#77bcbd", marginBottom: 12, display: "block" }}>psychology_alt</span>
            <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 17, color: "white", marginBottom: 8 }}>Archetype Sync</h3>
            <p style={{ fontSize: 12, color: "#77bcbd", lineHeight: 1.6 }}>Your answers currently align 85% with "The Strategic Visionary" archetype. To reach "The Technical Architect," we need to tighten your engineering tradeoffs.</p>
          </div>
          <button style={{ width: "100%", padding: "10px", background: "#004c4d", color: "white", borderRadius: 8, border: "1px solid rgba(119,188,189,0.3)", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 20, fontFamily: "Manrope" }}>
            Explore My Archetype
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

function RoadmapTab() {
  const [timeline, setTimeline] = useState("3m");
  const phases = [
    { title: "Foundations: Product Sense", status: "in-progress", week: "Week 3 of 12", pct: 75, icon: "psychology" },
    { title: "Execution: User Research",   status: "locked",      week: "Next Phase",  pct: 0,  icon: "groups" },
    { title: "Communication: Stakeholder Mgmt", status: "locked", week: "Phase 3",     pct: 0,  icon: "forum" },
    { title: "Strategy: Market Positioning",     status: "locked", week: "Phase 4",     pct: 0,  icon: "insights" },
  ];
  return (
    <div>
      <div className="flex items-end justify-between" style={{ marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: "#191c1d", marginBottom: 6 }}>Your Roadmap</h2>
          <p style={{ fontSize: 14, color: "#3f4945" }}>Timeline: <strong style={{ color: "#003334" }}>3 Months Standard</strong></p>
        </div>
        <div className="flex" style={{ background: "#f2f4f5", borderRadius: 12, padding: 4 }}>
          {["1m", "3m", "6m"].map((t) => (
            <button key={t} onClick={() => setTimeline(t)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: timeline === t ? "white" : "transparent", color: timeline === t ? "#003334" : "#64748b", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", boxShadow: timeline === t ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {phases.map((p) => (
          <div key={p.title} style={{ background: p.status === "locked" ? "rgba(255,255,255,0.5)" : "white", borderRadius: 16, padding: 22, display: "flex", alignItems: "center", gap: 16, opacity: p.status === "locked" ? 0.55 : 1 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: p.status === "locked" ? "#eceeef" : "#004c4d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: p.status === "locked" ? "#94a3b8" : "#8dd3d3", fontSize: 22 }}>{p.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#191c1d" }}>{p.title}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: p.status === "in-progress" ? "#003334" : "#94a3b8" }}>
                  {p.status === "in-progress" ? "In Progress" : "Locked"}
                </span>
              </div>
              <div style={{ height: 6, background: "#eceeef", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p.pct}%`, background: "#003334", borderRadius: 99 }} />
              </div>
            </div>
            <span style={{ fontSize: 12, color: "#64748b", flexShrink: 0 }}>{p.week}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard export ────────────────────────────────────────────────────

export default function DashboardPage({ onSignOut }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFeedback, setShowFeedback] = useState(false);

  function handleInterviewSubmit() { setShowFeedback(true); }
  function handleRetry() { setShowFeedback(false); }

  return (
    <Shell activeTab={activeTab} onNavigate={setActiveTab} onSignOut={onSignOut}>
      {activeTab === "dashboard"           && <OverviewTab onNavigate={setActiveTab} />}
      {activeTab === "roadmap"             && <RoadmapTab />}
      {activeTab === "practice-questions"  && <PracticeQuestionsTab onStartQuestion={() => {}} />}
      {activeTab === "practice-interviews" && !showFeedback && <PracticeInterviewsTab onSubmit={handleInterviewSubmit} />}
      {activeTab === "practice-interviews" && showFeedback  && <InterviewFeedbackTab onRetry={handleRetry} />}
    </Shell>
  );
}
