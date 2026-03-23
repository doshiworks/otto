import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignUpPage({ onContinue }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name || !email) return;
    setLoading(true);
    await supabase.from("signups").insert({ name, email });
    setLoading(false);
    onContinue({ name, email });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafa", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 24, color: "#004D40" }}>Otto</span>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 30, color: "#191c1d", marginTop: 16, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Your report is ready.
          </h1>
          <p style={{ fontSize: 15, color: "#3f4945", lineHeight: 1.6 }}>
            Create a free account to see your full readiness report, archetype, and personalized roadmap.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: 20, padding: 40, boxShadow: "0 4px 24px rgba(0,51,52,0.08)" }}>

          {/* Score preview */}
          <div style={{ background: "#f2f4f5", borderRadius: 12, padding: 20, marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#004D40", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 18, color: "white" }}>58%</span>
            </div>
            <div>
              <p style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#191c1d" }}>You are a Builder</p>
              <p style={{ fontSize: 12, color: "#3f4945", marginTop: 3, lineHeight: 1.5 }}>Sign up to unlock your full report, gap analysis, and 3-month roadmap.</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3f4945", marginBottom: 6 }}>Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arjun Sharma"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e1e3e4", fontSize: 14, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#3f4945", marginBottom: 6 }}>Work email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arjun@company.com"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e1e3e4", fontSize: 14, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", padding: "14px", background: "#004D40", color: "white", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8 }}
            >
              {loading ? "Saving..." : "See my readiness report →"}
            </button>
          </div>

          <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
            By continuing you agree to our Terms. No spam — just your results.
          </p>
        </div>

        {/* What you'll see */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 28 }}>
          {["Your PM Archetype", "5-Dimension Score", "Interview Risk Areas", "Personalised Roadmap"].map((item) => (
            <div key={item} className="flex items-center gap-1.5" style={{ fontSize: 12, color: "#3f4945" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#004D40" }}>check_circle</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
