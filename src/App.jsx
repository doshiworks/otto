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

  if (page === "landing")    return <LandingPage onCTA={() => setPage("diagnostic")} />;
  if (page === "diagnostic") return <DiagnosticPage onComplete={() => setPage("signup")} />;
  if (page === "signup")     return <SignUpPage onContinue={() => setPage("report")} />;
  if (page === "report")     return <ReadinessReportPage onUnlock={() => setPage("payment")} />;
  if (page === "payment")    return <PaymentPage onComplete={() => setPage("dashboard")} />;
  if (page === "dashboard")  return <DashboardPage onSignOut={() => setPage("landing")} />;
}
