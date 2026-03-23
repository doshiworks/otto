import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") {
    return <LandingPage onCTA={() => setPage("diagnostic")} />;
  }

  // Placeholder — more screens coming
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 24, color: "var(--on-surface)", marginBottom: 8 }}>
          Diagnostic coming next
        </h2>
        <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 24 }}>Next screen in progress.</p>
        <button
          onClick={() => setPage("landing")}
          style={{ fontSize: 14, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
        >
          ← Back to landing
        </button>
      </div>
    </div>
  );
}
