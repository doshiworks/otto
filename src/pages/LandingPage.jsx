function Nav({ onCTA }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl"
      style={{ boxShadow: "0 1px 0 rgba(0,51,52,0.06)" }}>
      <div className="flex justify-between items-center w-full px-12 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: "#004D40", letterSpacing: "-0.5px" }}>
            Otto
          </span>
          <nav className="flex gap-8">
            <a href="#blog" style={{ color: "#64748b", fontSize: 14, fontWeight: 500 }}>Resources</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined" style={{ color: "#64748b", cursor: "pointer" }}>notifications</span>
          <span className="material-symbols-outlined" style={{ color: "#64748b", cursor: "pointer" }}>settings</span>
          <button onClick={onCTA} style={{ background: "#003334", color: "white", padding: "10px 24px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Check Readiness
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onCTA }) {
  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      <div className="absolute inset-0 hero-pattern pointer-events-none" />
      <div className="max-w-7xl mx-auto px-12 grid gap-8 items-center" style={{ gridTemplateColumns: "7fr 5fr" }}>

        {/* Left */}
        <div style={{ zIndex: 10 }}>
          <div className="inline-flex items-center gap-2 mb-8" style={{ background: "#cbe4e9", color: "#4f666a", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>group</span>
            Join 5,000+ PMs Architecting Their Careers
          </div>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 60, lineHeight: 1.08, letterSpacing: "-1.5px", color: "#004D40", marginBottom: 24 }}>
            Stop Guessing.<br />
            <span style={{ color: "#511e00" }}>Start Getting Hired.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#3f4945", lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
            The first PM transition platform built for the Indian market that focuses on your readiness, not just courses. We tell you where you stand and get you ready for top-tier roles.
          </p>
          <div className="flex gap-4">
            <button onClick={onCTA} style={{ background: "#004D40", color: "white", padding: "16px 32px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              Check your PM readiness
            </button>
            <button style={{ background: "transparent", color: "#004D40", padding: "16px 32px", borderRadius: 8, border: "1.5px solid #bfc9c4", fontFamily: "Manrope", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              How it works
            </button>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "#94a3b8", fontStyle: "italic" }}>
            "Preparing for PM but not getting calls? Don't know if you're ready? We've got you."
          </p>
        </div>

        {/* Right — Readiness card */}
        <div style={{ position: "relative" }}>
          <div className="tonal-lift" style={{ background: "white", borderRadius: 16, padding: 32, border: "1px solid rgba(191,201,196,0.15)", position: "relative", zIndex: 10 }}>
            <div className="flex justify-between items-start" style={{ marginBottom: 24 }}>
              <div>
                <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 17, color: "#004D40" }}>Architectural Readiness</h3>
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Candidate: Senior Lead Architect</p>
              </div>
              <div style={{ background: "#742e00", color: "#ff955e", width: 48, height: 48, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize: 18 }}>
                58%
              </div>
            </div>
            {[
              { label: "Strategic Thinking", pct: 72, color: "#004D40" },
              { label: "Product Sense",      pct: 45, color: "#511e00" },
              { label: "Execution Depth",    pct: 60, color: "#004c4d" },
            ].map((d) => (
              <div key={d.label} style={{ marginBottom: 20 }}>
                <div className="flex justify-between" style={{ fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <span>{d.label}</span><span>{d.pct}%</span>
                </div>
                <div style={{ height: 8, background: "#e6e8e9", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${d.pct}%`, background: d.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(191,201,196,0.2)" }}>
              <div className="flex items-center gap-3">
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#8dd3d3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "#003334", fontSize: 20 }}>architecture</span>
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Target Archetype</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#004D40" }}>The Technical Architect PM</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: -24, right: -24, width: "100%", height: "100%", background: "rgba(0,51,52,0.05)", borderRadius: 16, transform: "rotate(3deg)", zIndex: 1 }} />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const companies = ["Flipkart", "Razorpay", "Swiggy", "Zomato", "CRED", "PhonePe"];
  return (
    <section style={{ padding: "48px 48px", background: "#f2f4f5" }}>
      <div className="max-w-7xl mx-auto text-center">
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: 32 }}>
          Our alumni lead product teams at
        </p>
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {companies.map((c) => (
            <span key={c} style={{ fontSize: 16, fontWeight: 800, color: "#cbd5e1", letterSpacing: "-0.5px", fontFamily: "Manrope" }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: "target", title: "Clarity of Outcome", body: "Know exactly which PM roles match your background instead of applying blindly to every 'Associate PM' posting." },
    { icon: "architecture", title: "The Archetype System", body: "Map your unique professional DNA to one of 5 core PM archetypes. Leverage your strengths as an 'Architect' or 'Operator'." },
    { icon: "refresh", title: "Interview Prep Loop", body: "Real-time simulation loops that fix what you're missing before you ever face a recruiter at Zomato or Razorpay." },
  ];
  return (
    <section style={{ padding: "96px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: "#004D40", marginBottom: 16 }}>Outcome-Focused, Not Content-Heavy</h2>
          <p style={{ fontSize: 16, color: "#3f4945", maxWidth: 560, margin: "0 auto" }}>
            We don't sell 100-hour video courses. We provide a surgical system designed to get you hired into strong PM roles.
          </p>
        </div>
        <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          {items.map((item) => (
            <div key={item.title}>
              <div style={{ width: 56, height: 56, background: "#e6e8e9", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <span className="material-symbols-outlined" style={{ color: "#004D40" }}>{item.icon}</span>
              </div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 19, marginBottom: 10, color: "#191c1d" }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3f4945" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchetypeSection() {
  return (
    <section style={{ background: "#003334", padding: "96px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end" style={{ marginBottom: 56 }}>
          <div style={{ maxWidth: 480 }}>
            <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: "white", marginBottom: 12 }}>The Archetype System</h2>
            <p style={{ fontSize: 16, color: "#77bcbd", lineHeight: 1.6 }}>We identify your professional "Product Persona" to target the right companies and roles.</p>
          </div>
          <button style={{ color: "white", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: 4, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            View all archetypes
          </button>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "8fr 4fr" }}>
          {/* Featured */}
          <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)", borderRadius: 16, padding: 48, border: "1px solid rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
            <div className="flex gap-12 items-center" style={{ position: "relative", zIndex: 10 }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffb692" }}>Recommended for Engineers</span>
                <h3 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: "white", margin: "16px 0 20px" }}>The Builder</h3>
                <p style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: 28, fontSize: 14 }}>
                  Specializes in high-scale technical systems and platform products. You don't just manage features; you architect the foundations of the product.
                </p>
                <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {["System Architecture", "API Strategy", "Technical Debt Mgmt", "Scalability Focus"].map((s) => (
                    <div key={s} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#ffb692" }}>check_circle</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ width: "100%", aspectRatio: "4/3", background: "rgba(255,255,255,0.08)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 80, color: "rgba(255,255,255,0.2)" }}>architecture</span>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.05, pointerEvents: "none" }}>
              <svg width="300" height="300" viewBox="0 0 100 100"><path d="M50 0 L100 50 L50 100 L0 50 Z" fill="white" /></svg>
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-6">
            {[
              { icon: "insights", name: "The Strategist", desc: "Focuses on market positioning and revenue growth models." },
              { icon: "forum",    name: "The Advocate",   desc: "User-centric PM focusing on empathy and design-led growth." },
            ].map((a) => (
              <div key={a.name} style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: 28, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
                <span className="material-symbols-outlined" style={{ color: "#ffb692", marginBottom: 14, display: "block" }}>{a.icon}</span>
                <h4 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 19, color: "white", marginBottom: 8 }}>{a.name}</h4>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ onCTA }) {
  const steps = [
    { n: "1", label: "Assessment", desc: "Benchmark your skills across 5 core PM dimensions.", active: false },
    { n: "2", label: "Archetype",  desc: "Identify your persona and target the right companies.", active: false },
    { n: "3", label: "Roadmap",    desc: "Execute a tailored prep plan to fix your gaps.", active: true },
    { n: "4", label: "Hired",      desc: "Crack interviews with high-authority confidence.", active: false, tertiary: true },
  ];
  return (
    <section style={{ padding: "96px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: "#004D40", marginBottom: 16 }}>A System to Get You Hired</h2>
          <p style={{ fontSize: 16, color: "#3f4945" }}>Not just another course. A 4-step architectural journey.</p>
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr", position: "relative", marginBottom: 72 }}>
          <div style={{ position: "absolute", top: 24, left: 0, right: 0, height: 2, background: "#e6e8e9", zIndex: 0 }} />
          {steps.map((s) => (
            <div key={s.n} className="tonal-lift" style={{ background: "white", padding: 28, borderRadius: 16, textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: s.tertiary ? "#511e00" : s.active ? "#004D40" : "#e1e3e4", color: s.active || s.tertiary ? "white" : "#004D40", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 700, fontSize: 16, margin: "0 auto 20px", border: "4px solid #f8fafa" }}>
                {s.n}
              </div>
              <h4 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{s.label}</h4>
              <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ background: "#f2f4f5", borderTop: "1px solid rgba(191,201,196,0.15)", borderRadius: 24, padding: "80px 48px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 44, color: "#004D40", marginBottom: 16, lineHeight: 1.15, letterSpacing: "-1px" }}>
            Ready to stop guessing and start<br />architecting your career?
          </h2>
          <p style={{ fontSize: 18, color: "#3f4945", marginBottom: 40 }}>Take the first step. Get your PM Readiness Score in 15 minutes.</p>
          <button onClick={onCTA} style={{ background: "#004D40", color: "white", padding: "18px 48px", borderRadius: 8, border: "none", fontFamily: "Manrope", fontWeight: 700, fontSize: 18, cursor: "pointer" }}>
            Check your PM readiness now
          </button>
          <div className="flex items-center justify-center gap-2" style={{ marginTop: 20, color: "#94a3b8", fontSize: 13 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#511e00" }}>verified_user</span>
            Join 1,200+ candidates placed this quarter
          </div>
        </div>
      </div>
    </section>
  );
}

const blogPosts = [
  {
    tag: "AI & Product",
    title: "How AI Is Reshaping the PM Role in 2025",
    excerpt: "From Copilot to autonomous agents — what product managers need to understand about AI-native product development and where human judgment still wins.",
    readTime: "6 min read",
    date: "Mar 18, 2025",
  },
  {
    tag: "Career Strategy",
    title: "The PM Interview Is Changing. Here's What AI Means for Prep",
    excerpt: "Interviewers at top companies are now testing AI fluency. We break down the new question types and how to demonstrate AI-product thinking.",
    readTime: "5 min read",
    date: "Mar 12, 2025",
  },
  {
    tag: "Deep Dive",
    title: "Building With LLMs: A PM's Practical Handbook",
    excerpt: "Prompting, fine-tuning, RAG, evals — you don't need to write the code, but you do need to speak the language. A non-technical PM's field guide.",
    readTime: "9 min read",
    date: "Mar 5, 2025",
  },
  {
    tag: "Industry Trends",
    title: "Why Every Product Roadmap Needs an AI Layer Now",
    excerpt: "From Notion AI to GitHub Copilot, users expect intelligence baked into every workflow. How to roadmap AI features without the hype.",
    readTime: "7 min read",
    date: "Feb 27, 2025",
  },
  {
    tag: "Frameworks",
    title: "The CIRCLES Framework, Updated for the AI Era",
    excerpt: "The classic PM framework still works — but AI changes the Identify and Evaluate steps dramatically. Here's how we've updated it.",
    readTime: "5 min read",
    date: "Feb 20, 2025",
  },
  {
    tag: "Case Study",
    title: "Inside Notion AI's PM Strategy: Lessons for Aspiring PMs",
    excerpt: "Notion's approach to integrating AI wasn't a bolt-on. It was a full re-architecture of their product surface. What we can learn from it.",
    readTime: "8 min read",
    date: "Feb 14, 2025",
  },
];

function Blog() {
  return (
    <section id="blog" style={{ background: "#f8fafa", padding: "96px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ marginBottom: 56 }}>
          <span style={{ display: "inline-block", background: "rgba(0,77,64,0.08)", color: "#004D40", padding: "4px 14px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Resources</span>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 40, color: "#003334", letterSpacing: "-0.5px", marginBottom: 12 }}>
            AI & Product Thinking
          </h2>
          <p style={{ fontSize: 16, color: "#3f4945", maxWidth: 520 }}>
            Practical reads for PMs navigating the AI shift — no fluff, no hype.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {blogPosts.map((post) => (
            <article
              key={post.title}
              style={{ background: "white", borderRadius: 16, padding: 28, cursor: "pointer", transition: "box-shadow 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,51,52,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ background: "rgba(0,77,64,0.08)", color: "#004D40", padding: "3px 10px", borderRadius: 99, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {post.tag}
                </span>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{post.date}</span>
              </div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 17, color: "#191c1d", lineHeight: 1.4, marginBottom: 10 }}>
                {post.title}
              </h3>
              <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.7, marginBottom: 20 }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", fontWeight: 500 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
                {post.readTime}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "white", borderTop: "1px solid rgba(191,201,196,0.15)", padding: "72px 48px 32px" }}>
      <div className="max-w-7xl mx-auto grid gap-12" style={{ gridTemplateColumns: "4fr 2fr 2fr 2fr", marginBottom: 48 }}>
        <div>
          <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: "#004D40", display: "block", marginBottom: 16 }}>Otto</span>
          <p style={{ fontSize: 13, color: "#3f4945", lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
            The premium PM transition framework for high-impact leaders. We don't just teach product; we architect careers.
          </p>
        </div>
        {[
          { h: "Platform",  links: ["Assessments", "Archetype Quiz", "Roadmaps"] },
          { h: "Resources", links: ["Interview Guide", "Case Studies", "Alumni Network"] },
          { h: "Company",   links: ["About Us", "Careers", "Support"] },
        ].map((col) => (
          <div key={col.h}>
            <h5 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#94a3b8", marginBottom: 20 }}>{col.h}</h5>
            {col.links.map((l) => (
              <div key={l} style={{ fontSize: 13, color: "#475569", marginBottom: 12, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto flex justify-between items-center" style={{ paddingTop: 24, borderTop: "1px solid rgba(191,201,196,0.15)", fontSize: 11, color: "#94a3b8" }}>
        <p>© 2024 Stratos Career Systems Pvt Ltd. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" style={{ color: "#94a3b8" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#94a3b8" }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage({ onCTA }) {
  return (
    <div style={{ background: "#f8fafa" }}>
      <Nav onCTA={onCTA} />
      <Hero onCTA={onCTA} />
      <SocialProof />
      <WhyUs />
      <ArchetypeSection />
      <HowItWorks onCTA={onCTA} />
      <Blog />
      <Footer />
    </div>
  );
}
