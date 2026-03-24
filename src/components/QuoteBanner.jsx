const quotes = [
  { text: "Fall in love with the problem, not the solution.", author: "Uri Levine, Waze co-founder" },
  { text: "Talk to your users. That's it. That's the secret.", author: "Paul Graham, Y Combinator" },
  { text: "The best PMs think of themselves as the CEO of their product.", author: "Ken Norton, Google" },
  { text: "Strategy is about making choices and deliberately choosing to be different.", author: "Michael Porter" },
  { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates" },
  { text: "A PM's job is to make the team's product as successful as possible.", author: "Marty Cagan, SVPG" },
  { text: "Ship early, ship often, and listen hard.", author: "Reid Hoffman, LinkedIn" },
  { text: "The goal is not to be good at metrics. The goal is to build something people love.", author: "Julie Zhuo, Facebook" },
  { text: "Good products are built by people who can't stop thinking about the problem.", author: "Unknown" },
  { text: "Data informs. Taste decides.", author: "Shreyas Doshi, ex-Stripe PM" },
];

// Pick a stable quote per session using the current hour
const quote = quotes[new Date().getHours() % quotes.length];

export default function QuoteBanner() {
  return (
    <div style={{ background: "#f2f4f5", borderBottom: "1px solid rgba(191,201,196,0.2)", padding: "10px 48px", display: "flex", alignItems: "center", gap: 12 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#7c2d00", flexShrink: 0 }}>format_quote</span>
      <p style={{ fontSize: 12, color: "#3f4945", fontStyle: "italic", margin: 0 }}>
        "{quote.text}" <span style={{ fontStyle: "normal", fontWeight: 600, color: "#64748b" }}>— {quote.author}</span>
      </p>
    </div>
  );
}
