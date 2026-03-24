import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateInsights({ archetype, overall, dimensions }) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const dimSummary = dimensions
    .map((d) => `${d.name}: ${d.score}%`)
    .join(", ");

  const weakDims = dimensions
    .filter((d) => d.weak)
    .map((d) => d.name)
    .join(" and ");

  const prompt = `
You are Otto, an expert PM career coach helping people in India transition into product management roles.

A user just completed their PM readiness diagnostic. Here are their results:
- PM Archetype: ${archetype}
- Overall Readiness Score: ${overall}%
- Dimension Scores: ${dimSummary}
- Weak areas: ${weakDims || "none — well balanced"}

Generate a JSON response with exactly this structure:
{
  "summary": "A 2-sentence personalized summary of this person's PM readiness. Be direct, specific to their scores, and encouraging but honest.",
  "riskAreas": [
    "First specific interview risk area based on their weak dimensions",
    "Second specific interview risk area",
    "Third specific interview risk area"
  ],
  "insight": "One sharp, actionable insight (1-2 sentences) that this specific archetype needs to hear to level up. Make it feel like advice from a mentor who knows them."
}

Rules:
- Reference their actual dimension scores, not generic advice
- Keep each risk area under 15 words
- The insight should feel personal and specific, not generic
- Do not use bullet points or markdown inside the JSON strings
- Return only valid JSON, no other text
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip markdown code fences if present
  const cleaned = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  return JSON.parse(cleaned);
}

export async function generateInterviewFeedback({ question, context, answer, archetype, dimensions }) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const dimSummary = dimensions?.map((d) => `${d.name}: ${d.score}%`).join(", ") ?? "unknown";

  const prompt = `
You are Otto, an expert PM interview coach helping candidates in India land PM roles.

The candidate is a "${archetype}" archetype with these dimension scores: ${dimSummary}

They were given this interview question:
"${question}"

Context: ${context}

Their answer was:
"""
${answer || "(no answer provided)"}
"""

Evaluate their answer and return a JSON response with exactly this structure:
{
  "score": <integer 0-100>,
  "label": "<3-4 word quality label like 'Structured but Surface-Level' or 'Strong Strategic Thinking'>",
  "summary": "<2 sentences: overall assessment of the answer quality>",
  "whatWorked": [
    { "title": "<short title>", "body": "<1 sentence specific observation about what they did well>" },
    { "title": "<short title>", "body": "<1 sentence specific observation>" },
    { "title": "<short title>", "body": "<1 sentence specific observation>" }
  ],
  "whatDidnt": [
    { "title": "<short title>", "body": "<1 sentence specific gap or missed opportunity>" },
    { "title": "<short title>", "body": "<1 sentence specific gap>" },
    { "title": "<short title>", "body": "<1 sentence specific gap>" }
  ],
  "improvementPath": "<2-3 sentences: what they should focus on to improve this specific type of answer>",
  "recommendedAction": "<One concrete next action they can take today>",
  "learningResource": "<One specific framework, concept, or skill to study>"
}

Rules:
- Be specific to their actual answer — don't give generic feedback
- Score honestly: 0-40 = needs major work, 41-65 = developing, 66-80 = solid, 81-100 = exceptional
- Reference their archetype when relevant
- Return only valid JSON, no other text
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  return JSON.parse(cleaned);
}
