export default function Sidebar({ activeTab, onNavigate, onSignOut }) {
  const navItems = [
    { id: "dashboard",  icon: "dashboard",  label: "Dashboard" },
    { id: "roadmap",    icon: "book",        label: "Roadmap" },
    { id: "practice-questions", icon: "quiz", label: "Practice Questions" },
    { id: "practice-interviews", icon: "psychology", label: "Practice Interviews" },
  ];

  return (
    <aside style={{ width: 256, background: "#f8fafa", height: "100vh", position: "sticky", top: 0, display: "flex", flexDirection: "column", padding: 16, gap: 4, flexShrink: 0 }}>
      <div style={{ padding: "16px 8px 24px" }}>
        <span style={{ fontFamily: "Manrope", fontWeight: 900, fontSize: 22, color: "#004D40", letterSpacing: "-0.5px" }}>Otto</span>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3" style={{ padding: "8px 8px 20px" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eceeef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ color: "#004D40", fontSize: 20 }}>person</span>
        </div>
        <div>
          <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#191c1d", lineHeight: 1.2 }}>Welcome, Architect</p>
          <p style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>Phase: Discovery</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3"
              style={{
                padding: "10px 16px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", width: "100%",
                background: isActive ? "white" : "transparent",
                color: isActive ? "#004D40" : "#475569",
                fontFamily: "Inter", fontSize: 13, fontWeight: isActive ? 700 : 500,
                boxShadow: isActive ? "0 1px 8px rgba(0,51,52,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Upgrade */}
      <div style={{ background: "rgba(0,51,52,0.05)", borderRadius: 16, padding: 16, marginBottom: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#004D40", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Upgrade to Pro</p>
        <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>Get unlimited mock interviews and expert reviews.</p>
        <button style={{ width: "100%", padding: "8px 0", background: "#004D40", color: "white", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          Unlock Access
        </button>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[{ icon: "help", label: "Support" }, { icon: "logout", label: "Logout" }].map((item) => (
          <button
            key={item.label}
            onClick={item.label === "Logout" ? onSignOut : undefined}
            className="flex items-center gap-3"
            style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: 13, fontFamily: "Inter", fontWeight: 500 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
