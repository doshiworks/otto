import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateInsights({ archetype, overall, dimensions }) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
