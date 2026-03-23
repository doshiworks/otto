import { useState } from "react";

export default function PaymentPage({ onComplete }) {
  const [loading, setLoading] = useState(false);

  function handlePay() {
    setLoading(true);
    setTimeout(() => { setLoading(false); onComplete(); }, 1500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafa", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 22, color: "#004D40" }}>Otto</span>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: "#191c1d", marginTop: 16, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Unlock your full report
          </h1>
          <p style={{ fontSize: 14, color: "#3f4945" }}>Everything you need to land a PM role.</p>
        </div>

        {/* Plan card */}
        <div style={{ background: "#003334", borderRadius: 20, padding: 28, marginBottom: 20, color: "white" }}>
          <div className="flex justify-between items-start" style={{ marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#77bcbd", marginBottom: 4 }}>Pro Plan</p>
              <p style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 28 }}>₹999 <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.7 }}>/month</span></p>
            </div>
            <span style={{ background: "#511e00", color: "#ffb692", padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>Most popular</span>
          </div>
          {[
            "Full readiness report + gap analysis",
            "Personalised 1/3/6 month roadmap",
            "Unlimited practice questions + AI feedback",
            "Mock interview simulations",
            "Archetype-based role matching",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3" style={{ marginBottom: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#8dd3d3" }}>check_circle</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Payment form placeholder */}
        <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 4px 24px rgba(0,51,52,0.07)" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#3f4945", marginBottom: 16 }}>Payment details</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#3f4945", display: "block", marginBottom: 6 }}>Card number</label>
              <input
                placeholder="4242 4242 4242 4242"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e1e3e4", fontSize: 14, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#3f4945", display: "block", marginBottom: 6 }}>Expiry</label>
                <input placeholder="MM / YY" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e1e3e4", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#3f4945", display: "block", marginBottom: 6 }}>CVV</label>
                <input placeholder="•••" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e1e3e4", fontSize: 14, fontFamily: "Inter", outline: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#3f4945", display: "block", marginBottom: 6 }}>Name on card</label>
              <input placeholder="Arjun Sharma" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e1e3e4", fontSize: 14, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }} />
            </div>

            <button
              onClick={handlePay}
              style={{ width: "100%", padding: "14px", background: loading ? "#004c4d" : "#004D40", color: "white", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8, transition: "background 0.2s" }}
            >
              {loading ? "Processing..." : "Pay ₹999 and unlock →"}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2" style={{ marginTop: 20, color: "#94a3b8", fontSize: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span>
            Secured by Razorpay · Cancel anytime
          </div>
        </div>
      </div>
    </div>
  );
}
