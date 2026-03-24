// ─── Score weights per answer option (0–3) ───────────────────────────────────
// Index = option index in DiagnosticPage questions array
const QUESTION_SCORES = [
  [1, 3, 2, 0], // Q1 Strategy: tech-first=1, vision-first=3, revenue=2, competitor=0
  [0, 3, 2, 1], // Q2 Strategy: eng-driven=0, OKRs=3, user demand=2, competitor=1
  [1, 3, 2, 0], // Q3 Execution: rollback=1, dig data=3, interviews=2, escalate=0
  [1, 3, 0, 2], // Q4 Execution: push date=1, MVP=3, contractors=0, phased=2
  [1, 3, 0, 2], // Q5 Tech&Data: partial SQL=1, correct SQL=3, analyst=0, BI tool=2
  [0, 3, 0, 0], // Q6 Tech&Data: wrong=0, correct API def=3, wrong=0, wrong=0
  [1, 3, 1, 0], // Q7 Comms: doc+wait=1, prototype+1:1=3, eng presents=1, delay=0
  [1, 3, 0, 2], // Q8 Comms: all-hands=1, PRD+DRI=3, rely on PM=0, standups=2
];

// Maps question index (0-7) to dimension index
const QUESTION_DIMENSION = [0, 0, 1, 1, 2, 2, 3, 3];
const DIMENSION_NAMES = ["Strategy", "Execution", "Tech & Data", "Communication"];
const MAX_PER_DIMENSION = 6; // 2 questions × 3 max score

// ─── Archetype definitions ────────────────────────────────────────────────────
export const ARCHETYPES = {
  Builder: {
    title: "The Builder",
    icon: "construction",
    tagline: "Technical depth meets product instinct",
    description:
      "You understand how products are built. Your strength is technical feasibility, execution, and scaling complex systems. To crack PM interviews, you need to strengthen user thinking and strategic communication.",
    tags: ["Technical Depth", "High Velocity"],
    riskAreas: [
      "Over-explaining technical implementation instead of user value.",
      "Struggling with whiteboard product design questions requiring empathy maps.",
      "Communication style too bottom-up for executive leadership rounds.",
    ],
    topCompanies: ["Swiggy", "Zepto", "PhonePe", "Razorpay"],
    insight:
      "The best PMs aren't just technical — they're translators. Focus on the 'Why for the user' for the next 48 hours.",
  },
  Strategist: {
    title: "The Strategist",
    icon: "trending_up",
    tagline: "Vision-driven, business-first thinking",
    description:
      "You think in business models and market positioning. Your strength is aligning product with company goals and long-term vision. Sharpen your execution chops and technical fluency to stand out.",
    tags: ["Business Acumen", "Vision-Driven"],
    riskAreas: [
      "Underestimating execution complexity when pitching to engineering teams.",
      "Abstract vision without grounding in user research or real data.",
      "Difficulty scoping MVPs — tendency to over-engineer the roadmap.",
    ],
    topCompanies: ["CRED", "Meesho", "Groww", "Zepto"],
    insight:
      "Strategy without execution is hallucination. Ground every vision in a concrete Week 1 deliverable.",
  },
  Advocate: {
    title: "The Advocate",
    icon: "favorite",
    tagline: "User empathy as a competitive advantage",
    description:
      "You lead with empathy and user research. You understand what users need better than they do themselves. Strengthen your technical and strategic muscles to balance your profile.",
    tags: ["User Empathy", "Research-Led"],
    riskAreas: [
      "Struggling to quantify user insights into hard business impact metrics.",
      "Technical gaps that surface during feasibility discussions in interviews.",
      "Perceived as 'soft' without clear data-driven decision-making examples.",
    ],
    topCompanies: ["Swiggy", "Urban Company", "Nykaa", "Dunzo"],
    insight:
      "Empathy is your superpower — but interviewers want to see it translated into metrics. Always end with 'and here's how I'd measure success'.",
  },
  Operator: {
    title: "The Operator",
    icon: "settings",
    tagline: "Execution excellence, delivery at scale",
    description:
      "You excel at process design, cross-team coordination, and scaling operations. PMs love your reliability. Level up your strategic thinking and user advocacy to unlock senior roles.",
    tags: ["Process Excellence", "Delivery-Focused"],
    riskAreas: [
      "Seen as a 'project manager' without enough strategic product vision.",
      "Underrepresenting user empathy in case studies and interview answers.",
      "Difficulty articulating long-term product bets and market thinking.",
    ],
    topCompanies: ["Flipkart", "Amazon", "Zomato", "Ola"],
    insight:
      "Operators who can articulate 'why this market, why now' become the most promotable PMs in the room.",
  },
  Explorer: {
    title: "The Explorer",
    icon: "explore",
    tagline: "Generalist edge in a 0-to-1 world",
    description:
      "You're a rare generalist with balanced skills across all PM dimensions. You thrive in 0→1 environments and new market opportunities. Your challenge is depth — go deeper in 1–2 areas to anchor your story.",
    tags: ["Generalist", "0→1 Builder"],
    riskAreas: [
      "Lack of deep expertise in any single area — interviewers probe hard for this.",
      "Difficulty positioning yourself vs. specialist candidates in structured loops.",
      "Risk of coming across as a 'jack of all trades' without a clear PM identity.",
    ],
    topCompanies: ["Early-stage startups", "Y Combinator", "Elevation Capital portfolio"],
    insight:
      "Explorers win by owning their narrative. Pick your one signature strength and build every interview story around it.",
  },
};

// ─── Main scoring function ────────────────────────────────────────────────────
export function computeResults(answers) {
  const dimScores = [0, 0, 0, 0];

  answers.forEach(({ id, answer }) => {
    const qIndex = id - 1;
    const dimIndex = QUESTION_DIMENSION[qIndex];
    dimScores[dimIndex] += QUESTION_SCORES[qIndex][answer];
  });

  const dimPcts = dimScores.map((s) => Math.round((s / MAX_PER_DIMENSION) * 100));
  const overall = Math.round(dimPcts.reduce((a, b) => a + b, 0) / 4);
  const archetype = resolveArchetype(dimPcts);

  return {
    overall,
    dimensions: DIMENSION_NAMES.map((name, i) => ({
      name,
      score: dimPcts[i],
      weak: dimPcts[i] < 50,
    })),
    archetype,
  };
}

function resolveArchetype(dimPcts) {
  const max = Math.max(...dimPcts);
  const min = Math.min(...dimPcts);

  // Explorer: all dimensions within 20 points of each other and not terrible
  if (max - min <= 20 && max >= 40) return "Explorer";

  const dominantIndex = dimPcts.indexOf(max);
  return ["Strategist", "Operator", "Builder", "Advocate"][dominantIndex];
}
