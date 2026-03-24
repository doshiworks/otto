import { useState } from "react";
import { computeResults } from "../lib/scoring";

const questions = [
  {
    id: 1, dimension: "Strategy",
    q: "When faced with a complex product tradeoff, which factor do you instinctively prioritize first?",
    options: [
      "Immediate technical feasibility and resource constraints",
      "Alignment with long-term user retention and core product vision",
      "Short-term revenue impact and business stakeholder demands",
      "Competitive parity — matching what the market leaders are doing",
    ],
  },
  {
    id: 2, dimension: "Strategy",
    q: "How do you decide what goes on the product roadmap for the next quarter?",
    options: [
      "I let the engineering team drive based on tech debt and feasibility",
      "I align with business goals and map features to OKRs",
      "I gather user feedback and prioritise by demand volume",
      "I benchmark against what competitors shipped recently",
    ],
  },
  {
    id: 3, dimension: "Execution",
    q: "A feature you shipped 2 weeks ago has caused a 10% drop in DAU. What do you do first?",
    options: [
      "Roll it back immediately to restore metrics",
      "Dig into the data to understand which user segment is affected",
      "Set up user interviews to gather qualitative feedback",
      "Escalate to leadership and wait for a decision",
    ],
  },
  {
    id: 4, dimension: "Execution",
    q: "Your engineering team says the feature will take 8 weeks. Your launch date is in 4. What do you do?",
    options: [
      "Push the launch date — quality over speed",
      "Scope down to an MVP that can ship in 4 weeks",
      "Hire contractors to speed up delivery",
      "Negotiate with stakeholders for a phased release",
    ],
  },
  {
    id: 5, dimension: "Tech & Data",
    q: "Which SQL query would you use to find the top 5 users by session count in the last 30 days?",
    options: [
      "SELECT user_id, COUNT(*) FROM sessions GROUP BY user_id LIMIT 5",
      "SELECT user_id, COUNT(*) as sessions FROM sessions WHERE date >= NOW()-30 GROUP BY user_id ORDER BY sessions DESC LIMIT 5",
      "I'd ask a data analyst to run this for me",
      "I'd use a BI tool like Looker without writing SQL",
    ],
  },
  {
    id: 6, dimension: "Tech & Data",
    q: "What is an API and why does it matter for a PM?",
    options: [
      "A design pattern — it defines how the UI is structured",
      "A contract between services that defines how they communicate; PMs need it to scope integrations and define requirements",
      "A backend infrastructure concern — PMs don't need to understand it",
      "A way to store data in the cloud",
    ],
  },
  {
    id: 7, dimension: "Communication",
    q: "You need to get sign-off on a risky feature from a skeptical VP. How do you approach it?",
    options: [
      "Send a detailed doc and wait for their response",
      "Build a prototype and show it in a 1:1, pre-aligned with allies",
      "Get engineering to present the technical merits directly",
      "Delay until you have more data to justify the risk",
    ],
  },
  {
    id: 8, dimension: "Communication",
    q: "How do you keep a cross-functional team (eng, design, marketing) aligned on a 6-month project?",
    options: [
      "Weekly all-hands with status updates",
      "A shared PRD + async check-ins + clear DRI per workstream",
      "Rely on the project manager to coordinate everything",
      "Daily standups to catch blockers early",
    ],
  },
];

const DIMENSIONS = ["Strategy", "Execution", "Tech & Data", "Communication"];

export default function DiagnosticPage({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const dimProgress = DIMENSIONS.reduce((acc, d) => {
    acc[d] = answers.filter((a) => questions[a.id - 1]?.dimension === d).length;
    return acc;
  }, {});

  function handleContinue() {
    if (selected === null) return;
    const newAnswers = [...answers, { id: q.id, answer: selected }];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onComplete(computeResults(newAnswers));
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafa", fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(191,201,196,0.2)" }}>
        <nav className="flex justify-between items-center w-full px-6 py-3">
          <div className="flex items-center gap-8">
            <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: "#004D40" }}>Otto</span>
            <div className="flex gap-6">
              <span style={{ fontSize: 14, fontWeight: 500, color: "#64748b" }}>Assessments</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#64748b" }}>Resources</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ background: "#eceeef", padding: "6px 16px", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3f4945" }}>Readiness Score</span>
              <span style={{ fontSize: 13, fontFamily: "Manrope", fontWeight: 700, color: "#004D40" }}>Diagnostic in Progress</span>
            </div>
            <div style={{ width: 128, height: 8, background: "#e1e3e4", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#7c2d00", borderRadius: 99, transition: "width 0.5s ease" }} />
            </div>
            <span className="material-symbols-outlined" style={{ color: "#64748b" }}>notifications</span>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eceeef" }} />
          </div>
        </nav>
      </header>

      {/* Slim sidebar */}
      <aside style={{ position: "fixed", left: 0, top: 0, width: 80, height: "100vh", background: "#f8fafa", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: 24, zIndex: 40, borderRight: "none" }}>
        <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 18, color: "#004D40" }}>ET</span>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", paddingTop: 40 }}>
          {[
            { icon: "dashboard", active: true },
            { icon: "book",      active: false },
            { icon: "mic",       active: false },
            { icon: "work",      active: false },
          ].map((item) => (
            <div key={item.icon} style={{ padding: 10, borderRadius: 12, background: item.active ? "white" : "transparent", boxShadow: item.active ? "0 2px 8px rgba(0,51,52,0.08)" : "none", opacity: item.active ? 1 : 0.35 }}>
              <span className="material-symbols-outlined" style={{ color: "#004D40", fontSize: 22 }}>{item.icon}</span>
            </div>
          ))}
        </div>
        <span className="material-symbols-outlined" style={{ color: "#64748b", fontSize: 20 }}>help</span>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 80, padding: "48px 96px", maxWidth: 1280, display: "grid", gridTemplateColumns: "4fr 8fr", gap: 48 }}>

        {/* Left panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Context card */}
          <div style={{ background: "#003334", color: "white", borderRadius: 16, padding: 32, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 16, right: 16, opacity: 0.1 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 64 }}>psychology</span>
            </div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 26, lineHeight: 1.2, marginBottom: 16 }}>Onboarding &amp; Diagnostic</h1>
            <p style={{ color: "#77bcbd", fontSize: 15, lineHeight: 1.65 }}>
              We're building your transition blueprint. Think of this as a conversation with a mentor who knows the path.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              {["No right or wrong answers", "15 minutes to clarity"].map((txt) => (
                <div key={txt} className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: "#8dd3d3", fontSize: 20 }}>check_circle</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3f4945" }}>Assessment Dimensions</h3>
            {DIMENSIONS.map((dim, i) => {
              const isActive = q.dimension === dim;
              const done = dimProgress[dim] > 0;
              return (
                <div key={dim} className="flex justify-between items-center" style={{ opacity: done || isActive ? 1 : 0.4 }}>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#003334" : "#191c1d" }}>{dim}</span>
                  <div style={{ width: 96, height: 4, background: "#e1e3e4", borderRadius: 99 }}>
                    {isActive && <div style={{ width: "25%", height: "100%", background: "#003334", borderRadius: 99 }} />}
                    {done && !isActive && <div style={{ width: "100%", height: "100%", background: "#8dd3d3", borderRadius: 99 }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — question card */}
        <div style={{ background: "white", borderRadius: 16, padding: 48, minHeight: 500, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(0,51,52,0.06)" }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
              <span style={{ background: "#eceeef", color: "#3f4945", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Question {current + 1} of {questions.length}
              </span>
              <span style={{ fontSize: 12, color: "#3f4945" }}>• {Math.round((current / questions.length) * 15)} minutes in</span>
            </div>

            <h2 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 26, lineHeight: 1.3, color: "#191c1d", marginBottom: 32 }}>
              {q.q}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
                      borderRadius: 12, border: `2px solid ${isSelected ? "#004c4d" : "#eceeef"}`,
                      background: isSelected ? "#f2f4f5" : "white", cursor: "pointer", textAlign: "left",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${isSelected ? "#003334" : "#bfc9c4"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#003334" }} />}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: isSelected ? 700 : 500, color: isSelected ? "#191c1d" : "#3f4945", lineHeight: 1.5 }}>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between" style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(191,201,196,0.2)" }}>
            <button
              onClick={() => { if (current > 0) { const prev = current - 1; setCurrent(prev); setSelected(answers.find(a => a.id === questions[prev].id)?.answer ?? null); } }}
              className="flex items-center gap-2"
              style={{ background: "none", border: "none", color: "#3f4945", fontWeight: 700, fontSize: 14, cursor: current > 0 ? "pointer" : "default", opacity: current > 0 ? 1 : 0.3 }}
            >
              <span className="material-symbols-outlined">arrow_back</span> Back
            </button>
            <div className="text-center">
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3f4945" }}>Goal</p>
              <p style={{ fontSize: 12, color: "#3f4945", fontStyle: "italic" }}>Getting closer to a PM job</p>
            </div>
            <button
              onClick={handleContinue}
              className="flex items-center gap-2"
              style={{ background: selected !== null ? "#004D40" : "#e1e3e4", color: selected !== null ? "white" : "#94a3b8", padding: "12px 36px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: selected !== null ? "pointer" : "default", transition: "all 0.2s" }}
            >
              {current + 1 === questions.length ? "See my results" : "Continue"}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom quote */}
      <div style={{ marginLeft: 80, textAlign: "center", padding: "16px 0 32px", color: "rgba(63,73,69,0.5)", fontSize: 13, fontStyle: "italic" }}>
        "Product management is not about knowing the answers, it's about asking the right questions." — We're helping you do both.
      </div>
    </div>
  );
}
