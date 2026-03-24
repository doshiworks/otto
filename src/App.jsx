import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import SignUpPage from "./pages/SignUpPage";
import ReadinessReportPage from "./pages/ReadinessReportPage";
import PaymentPage from "./pages/PaymentPage";
import DashboardPage from "./pages/DashboardPage";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [results, setResults] = useState(null);
  const [user, setUser] = useState(null);

  if (page === "landing")    return <LandingPage onCTA={() => setPage("diagnostic")} />;
  if (page === "diagnostic") return <DiagnosticPage onComplete={(r) => { setResults(r); setPage("signup"); }} />;
  if (page === "signup")     return <SignUpPage results={results} onContinue={(u) => { setUser(u); setPage("report"); }} />;
  if (page === "report")     return <ReadinessReportPage results={results} user={user} onUnlock={() => setPage("payment")} />;
  if (page === "payment")    return <PaymentPage onComplete={() => setPage("dashboard")} />;
  if (page === "dashboard")  return <DashboardPage results={results} user={user} onSignOut={() => setPage("landing")} />;
}
