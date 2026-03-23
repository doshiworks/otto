# Otto — PM Career Transition Platform

## What this is
A guided PM transition system for aspiring PMs in India.
Core flow: Landing → Diagnostic → Readiness Report → Dashboard/Roadmap → Practice → Feedback.

## Target user
Software engineers, analysts, marketers, MBAs in India looking to break into PM roles.

## Stack
- Frontend: React + Tailwind (Vite)
- Backend: TBD
- AI: Anthropic API (claude-sonnet-4-6)
- Fonts: Manrope (headings) + Inter (body)

## Design System — The Executive Transition Framework
- **Primary:** #003334 (deep teal) · **Primary container:** #004c4d
- **Tertiary:** #511e00 (terracotta) · **Tertiary dim:** #ffb692
- **Surface hierarchy:** #f8fafa → #f2f4f5 → #eceeef → #ffffff
- **On-surface:** #191c1d · **Variant:** #3f4948
- **No borders rule:** structure via tonal shifts, not 1px lines
- **Glass nav:** surface at 80% opacity + 24px blur
- **Asymmetric layouts:** avoid perfectly centered grids (editorial feel)
- **No 100% black:** always use on-surface (#191c1d)

## Archetype System (5 PM personas)
1. The Builder — technical systems, platform products
2. The Strategist — positioning, business model, growth
3. The Advocate — research, user empathy, community
4. The Operator — execution, process, scale
5. The Explorer — 0→1, new markets, innovation

## Wireframes source
Extracted from Google Stitch: C:\Users\parth\otto-wireframes\stitch\

---

## Progress Log

### 2026-03-23
- New project created (fresh start from PM Buddy / pm-readiness-engine)
- Scaffolded React + Tailwind (Vite)
- Loaded Manrope + Inter from Google Fonts
- Implemented full design system tokens in index.css
- Built Landing Page (screen 1 of 6)
  - Glassmorphic nav
  - Hero with offset layout, readiness card float, social proof
  - Value props section
  - Archetype System section (dark teal background)
  - How It Works (4-step journey)
  - Full-width CTA gradient banner
  - Footer

---

## Screens status

| Screen | Status |
|---|---|
| Landing page | Done |
| Onboarding & diagnostic | Not started |
| Full readiness report | Not started |
| Personalized dashboard + roadmap | Not started |
| Practice question (interview prep loop) | Not started |
| Interview feedback | Not started |

---

## Key files
- `src/App.jsx` — router/page state
- `src/index.css` — design system tokens + Tailwind
- `src/pages/LandingPage.jsx` — landing page (all sections)
