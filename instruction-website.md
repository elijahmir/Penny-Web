# Penny  Landing Page Build Instruction

> **For the implementing AI (Claude Code / Cursor / v0):** This is the complete brief to build the Penny marketing website. Read it end-to-end before writing code. Treat the "Mandatory Rules" section as inviolable.

---

## 1. What is Penny?

Penny is a **virtual phone teammate built for self-storage facilities**. She picks up every enquiry, calls every name on the waitlist, books every tour, welcomes every new customer, and chases every overdue account  twenty-four hours a day, seven days a week.

Penny is currently in production at **Harcourts Ulverstone & Penguin Storage** in Tasmania, handling real calls for real customers. The site you're building is the **commercialisation step**  taking what works at one facility and offering it to storage owners across Australia and New Zealand.

### Brand position (this is the headline-level pitch)

> Penny is the phone teammate built for storage. She picks up when you can't, calls the waitlist the moment a unit opens up, and books the tour while you're closing the gate  so every empty unit gets filled and every enquiry gets a real answer.

### Why the laser focus on storage

The client's commercialisation coaches advised approaching self-storage facility owners directly  the math is unusually sharp. An empty unit costs the facility roughly its monthly rent every month it sits vacant. Penny pays for herself the first month she fills a unit that would otherwise have rung out. That's the pitch  and it only lands cleanly if the site speaks the storage owner's language from the first headline.

### Target audience (in priority order)

1. **Independent self-storage facility owners** in Australia and New Zealand  the primary commercial target. Tasmania first, then mainland.
2. **Owner-operators with 50–300 units** across one to three sites  too small for a call centre, too busy to answer every call.
3. **Family-owned and second-generation storage businesses**  operators who built the facility but never wanted to be a switchboard.

### What this site is NOT

The website must read as **made specifically for self-storage**. Do not generalise to "any business with phones." Do not list other industries (real estate, trades, healthcare, clinics) as use cases or features. Penny will continue to do other work in private production, but the public marketing surface is storage-only. A focused pitch converts; a horizontal one dilutes.

The vocabulary on every page should be storage-fluent: **facility, units, waitlist, tour, move-in, move-out, gate code, vacancy, rentroll, overdue, agreement, monthly rate, bond**. Storage owners should read the site and feel "she gets us."

---

## 2. MANDATORY RULES  do not break these

These rules exist because of how Penny is sold and how it's billed. Breaking any of them creates problems.

1. **Never mention the underlying tech.** No "Retell AI", no "Twilio", no "Supabase", no "n8n", no "GPT", no "OpenAI", no "LLM", no "ChatGPT". The website talks about Penny as a service  not as a stack.
2. **Never describe Penny as "a robot", "a bot", "an AI assistant", "an AI agent", or "ChatGPT for phones".** Penny is a "virtual assistant", "phone teammate", "AI-powered assistant" (only if absolutely necessary), or just "Penny." Lean human, not technical.
3. **No robot imagery, circuit boards, neural nets, glowing particles, headsets, microphones with sound waves, or any visual sci-fi tropes.** Stick to abstract, brand-led graphics.
4. **Never expose the demo call's plumbing.** When a visitor uses the "Try Penny" feature, the UI must say things like "Penny is calling you now…"  never "Initiating Retell call" or anything technical.
5. **Pricing is not public yet.** Use "Get in touch" / "Book a chat" CTAs instead of price cards. A simple "Pricing scales with usage  let's talk" line is fine.
6. **No fabricated testimonials, logos, or customer counts.** If we don't have it, don't put it on the site. Placeholders are acceptable (clearly marked in code comments).

---

## 3. Information architecture

A single long-scroll landing page (one route, `/`) with these sections in order. Each section is its own component file.

| # | Section | Purpose |
|---|---|---|
| 1 | **Intro animation** | Plays once per session. The logo intro from `intro-test.html` adapted as a React component. |
| 2 | **Nav bar** | Logo (top-left), nav links (Features, Use cases, How it works, FAQ), CTA button (top-right: "Try Penny"). |
| 3 | **Hero** | Headline: **"Every enquiry answered. Every unit filled."** Sub-headline: **"Penny is the phone teammate built for self-storage. She picks up when you can't, calls the waitlist when a unit opens, and books the tour while you close the gate."** Two CTAs: **"Hear Penny in 30 seconds"** (scrolls to demo) and **"How she works"** (scrolls to features). Optional: 3D iPhone visual on the right showing an incoming call from Penny (see separate 3D iPhone instruction). |
| 4 | **Social proof strip** | One-line trust statement: *"Already filling units at Harcourts Ulverstone & Penguin Storage  Tasmania."* No fake logos. A small map pin / Tasmania graphic is acceptable. |
| 5 | **Feature grid** | 6 capability cards. See section 5. |
| 6 | **Use cases** | 4–5 industry/scenario cards with short narratives. See section 6. |
| 7 | **How it works** | 3 simple steps. No jargon. |
| 8 | **Try Penny (demo)** | The interactive demo. See section 7 and the separate `instruction-demo-call.md` for backend details. |
| 9 | **Video** | Single embedded video block. Use a styled placeholder (e.g. dark card with play icon and caption "Video coming soon  client to provide"). The client will replace this. |
| 10 | **Security & trust** | Short reassurance block: encrypted data, audit-logged calls, Australia-based, GDPR-respectful. |
| 11 | **FAQ** | 6–8 questions. Accordion component. Sample questions in section 9. |
| 12 | **Final CTA** | Big "Talk to us about Penny" block with a contact form or Calendly embed placeholder. |
| 13 | **Footer** | Penny logo, copyright, contact email, minimal links (Privacy, Terms  can be placeholder pages). |

---

## 4. Design system

### Colors

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F7F7F2` | Page background (warm off-white) |
| `--bg-elevated` | `#FFFFFF` | Cards, modals |
| `--ink` | `#242321` | Primary text, headings, buttons |
| `--ink-muted` | `#5A5853` | Secondary text, body copy |
| `--ink-subtle` | `#8B8985` | Tertiary, captions |
| `--copper` | `#C98160` | Brand accent, highlights, icon strokes |
| `--copper-deep` | `#A8654A` | Hover states for copper elements |
| `--border` | `#E8E6E0` | Card borders, dividers |
| `--success` | `#3D8C5B` | Status indicators |
| `--danger` | `#B84A3D` | Errors |

### Typography

- **Font:** Inter (Google Fonts), weights 400/500/600/700/800.
- **Headings:** Tight tracking (`-0.04em` on display sizes, `-0.02em` on body headings), weight 700–800.
- **Body:** 16–18px on desktop, 1.6 line-height, weight 400. Color `--ink-muted`.
- **Scale (desktop):** `text-display` 80px, `h1` 56px, `h2` 40px, `h3` 28px, `h4` 22px, `body` 17px, `caption` 14px.
- **Lockup:** lowercase "penny", consistent with logo.

### Components / tokens

- **Border radius:** 12px on cards, 10px on buttons, 100px on pills/tags.
- **Spacing rhythm:** 4/8/12/16/24/32/48/64/96/128 (in px).
- **Section padding:** `py-24` desktop, `py-16` mobile. Max content width `max-w-6xl` for prose sections, `max-w-7xl` for grids.
- **Shadows:** Subtle only  `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)`.
- **Buttons:**
  - Primary: charcoal bg, cream text, copper hover ring.
  - Secondary: transparent bg, charcoal text, 1px charcoal-10% border.
  - Ghost: transparent, charcoal text, underline on hover.
- **Cards:** white bg, 1px border `--border`, 12px radius, generous padding (24–32px).
- **Motion:** Framer Motion only. Easing `cubic-bezier(0.16, 1, 0.3, 1)` for most entrances. Stagger 60–80ms between siblings. Respect `prefers-reduced-motion`.

### Visual style references

- **Stripe**  confident typography, generous whitespace.
- **Linear**  restrained color, premium feel, subtle gradients.
- **Mercury**  warm-cool palette balance, calm pace.
- **Vercel**  clean wordmark, no kitsch.

**Avoid:** gradients on text, glowing buttons, glassmorphism, particle effects, animated SVG patterns in backgrounds, stock photos of people in headsets, generic SaaS hero illustrations.

---

## 5. Feature grid  content (6 cards)

Each card: icon (custom 24×24 line icon in copper), title (4–6 words), description (1–2 sentences). Every card is framed in **storage operator language**  units, waitlist, tours, gate codes, overdue accounts. Do not use generic phrases like "your business" or "appointments"  use "your facility" and "tours."

1. **Picks up at 2am, 6pm, weekends, public holidays**
   Every after-hours enquiry is a real conversation, not a voicemail. The first facility to answer almost always gets the move-in  that's now you, every time.

2. **Rings the waitlist the moment a unit opens**
   No more working down the list by hand. The minute a unit clears, Penny rings every name in order, presents the unit, and locks in the first taker. Usually the same day.

3. **Books tours and confirms move-ins**
   Penny offers real times against your calendar, locks in the tour on the call, and sends the confirmation by email or text. The customer arrives expected and ready.

4. **Chases overdue accounts  politely, persistently**
   The phone call no one wants to make. Penny does it on day one, day three, day seven  warmly, never accusatory, always clear about what's owed and what happens next.

5. **Welcomes new customers and explains the basics**
   Gate codes, access hours, after-hours contact, agreement signing. Penny walks every new customer through it so they don't ring you on Saturday asking how to get in.

6. **Logs every conversation in one place**
   Names, sizes asked about, move-in dates, payment commitments, complaints. Every call written down in a dashboard you can search. No more "did anyone follow up with Mark from Wynyard?"

---

## 6. What Penny does at your facility  content (5 workflow cards)

Replaces the old "use cases by industry" section. These are the **five workflows in a self-storage facility's customer lifecycle**, in order from prospect to long-term tenant. Each card: category tag, story title, one-paragraph narrative, and a "What Penny does" bullet list.

The section heading on the page should be: **"What Penny does at your facility."** (not "Use cases"  that's tech-speak.)

### Card 1  Filling a unit that just opened up
- **Tag:** Waitlist
- **Title:** Fill empty units before they cost you a month's rent.
- **Story:** A unit opens. Within the hour Penny has rung every name on your waitlist in order, presented the unit and the price, and booked the first taker. You wake up to a filled unit and a signed agreement waiting in your inbox.
- **What Penny does:** Rings the waitlist · Presents the unit and price · Books on the call · Sends the agreement link · Logs every conversation

### Card 2  Answering the enquiry you didn't catch
- **Tag:** Inbound
- **Title:** Every missed call is money your competitor just earned.
- **Story:** Penny picks up every call you don't, day or night. She finds out what size they need, when they want to move in, and books them in for a tour  or signs them on the spot if a unit's free. You see the result before you've finished your coffee.
- **What Penny does:** Answers 24/7 · Qualifies the enquiry · Books the tour · Captures contact details · Notifies you straight away

### Card 3  Coordinating tours and walkthroughs
- **Tag:** Tours
- **Title:** Tours that actually happen.
- **Story:** Penny books the tour, confirms it the day before, and reschedules when life happens. Your prospect arrives expected, the unit's ready, and you spend ten minutes closing instead of two days playing phone tag.
- **What Penny does:** Offers real times · Confirms 24 hours before · Handles reschedules · Notifies your on-site team

### Card 4  Welcoming a new customer on move-in day
- **Tag:** Move-in
- **Title:** A warm welcome that doesn't fall on your shoulders.
- **Story:** Move-in day. Penny rings the new customer, confirms the time, walks them through the gate code, the access hours, and the after-hours contact. You don't get a Saturday text saying "I can't get in."
- **What Penny does:** Confirms move-in time · Explains gate access · Sends the agreement · Triggers the welcome email

### Card 5  Chasing overdue accounts
- **Tag:** Collections
- **Title:** The phone call you've been putting off  handled.
- **Story:** Day one late, day three, day seven. Penny rings politely, finds out what's going on, takes a payment commitment on the call, and sends the link to settle. The conversation you hate is the one she's best at.
- **What Penny does:** Calls in the right tone · Takes payment commitments · Sends payment links · Escalates only when needed

---

## 7. "Try Penny" demo section

This is the **money feature** of the site  visitors give their name and phone number and receive a live demo call from Penny within seconds. Full backend spec is in `instruction-demo-call.md`. The **frontend** is your job here.

### UI requirements

- **Heading:** "Hear Penny in 30 seconds."
- **Subheading:** "Pick a scenario, drop your name and number, and Penny will give you a call right now."
- **Form fields:**
  1. **Scenario**  dropdown/select (radio group on desktop is nicer). All five are storage workflows. Options:
     - "🏢 A unit just opened up  Penny rings the waitlist"
     - "📞 A missed enquiry  Penny calls back to qualify and book a tour"
     - "📅 Tour booking  Penny locks in a viewing time"
     - "🎉 New customer move-in  Penny welcomes them and explains access"
     - "💳 Overdue account  Penny chases politely and takes a payment commitment"
  2. **Your name**  text input, 2–60 chars.
  3. **Phone number**  phone input with international formatting (default to Australia +61).
  4. **CAPTCHA**  Cloudflare Turnstile widget (free, invisible-friendly).
- **Submit button:** "Call me now"  disabled until form valid + CAPTCHA passed.
- **Submission states:**
  - Idle → Submitting (button spinner) → "Penny is calling you now ☎" (success state, ~10s, with animated indicator) → "Call ended  how was it?" (with feedback thumbs up/down).
  - Error states: "We've hit our daily demo limit  try again tomorrow", "Looks like this number was used recently  try in 5 minutes", "Couldn't reach that number  check it and try again".
- **Helper microcopy under form:**
  *"One demo per number per day · Calls last under 3 minutes · Penny may ask a quick question or two about your business  only saved if you say yes."*

### Frontend validation

- Phone number must be valid E.164 (use `libphonenumber-js`).
- Reject obvious non-mobile numbers, premium-rate prefixes, and any number in a hardcoded blocklist (initially empty).
- Disable the button while the request is in flight.
- After successful call, set a `localStorage` flag with a 24h timestamp to soft-block client-side re-submission (server is the authority though).

### Talking to the backend

Single endpoint: `POST /api/demo-call`

Request body:
```json
{
  "name": "Sarah",
  "phone": "+61400123456",
  "scenario": "storage_waitlist",
  "turnstile_token": "..."
}
```

Success response:
```json
{ "ok": true, "call_id": "abc123", "eta_seconds": 8 }
```

Error response:
```json
{ "ok": false, "error": "rate_limit", "message": "Please wait 4 minutes before trying again." }
```

Possible error codes the UI must handle: `rate_limit`, `daily_quota_exhausted`, `invalid_phone`, `blocked_number`, `captcha_failed`, `server_error`.

---

## 8. How it works (3 steps)

Plain English, no jargon. Storage-grounded. Each step is one short paragraph plus an icon.

1. **Tell us how your facility runs.**
   We sit down with you for an hour and map out the calls you wish you didn't have to make. The waitlist. The tours. The chasers. The new-customer welcomes. We listen to a real day at the office.

2. **We set Penny up with your facility's details.**
   Your unit sizes and prices, your gate codes, your access hours, your calendar, your billing system. Penny learns the facility name, the local landmarks, the way you talk about your customers. Usually live within a week.

3. **She picks up and starts calling.**
   Every conversation lands in a dashboard you can read, search, and listen back to. You see what worked, you tweak what didn't, and Penny gets better every week.

---

## 9. FAQ  content

Accordion component, all closed by default. 8 questions, all written for **storage facility owners**  not generic SMBs.

1. **What facilities is Penny built for?**
   Penny is built specifically for self-storage. Single-site operators, multi-site groups, family-owned facilities, owner-operated yards  anywhere from 50 to several hundred units. If you take calls about storage, Penny is for you.

2. **Will my customers know they're talking to a virtual assistant?**
   Penny will say so if they ask directly  but she sounds and acts like a real person, and most callers don't ask. We never pretend Penny is a specific staff member.

3. **What if someone needs to speak to me?**
   Penny transfers the call to you (or whoever you nominate) straight away, with full context. No "press 1 for service" menus  just a warm hand-off where your team already knows the situation.

4. **How quickly can you get Penny live at my facility?**
   Most facilities are live within 5–10 business days. We'll need a list of your unit sizes and rates, your gate codes, calendar access, and a chat about how you run a typical day.

5. **What does Penny cost?**
   Pricing scales with the volume of calls Penny handles. We quote based on your facility size and the workflows you want her to run. For most facilities, the math works out to less than one filled unit per month  get in touch and we'll show you the numbers for your operation.

6. **What if Penny gets a question she can't answer?**
   She tells the caller she'll have someone get back to them, captures the question, and notifies you. Over time, she learns the unusual stuff specific to your facility  local landmarks, the trailer access, the after-hours skip lockout.

7. **Is my customers' data safe?**
   Every call is encrypted in transit and at rest. Recordings and transcripts live in your private dashboard. We comply with Australian privacy law and the Privacy Act.

8. **Can I hear Penny in action before I commit?**
   Yes  use the "Try Penny" form above. Pick a scenario, drop your number, and Penny will call you within a minute. The whole demo takes about three minutes.

---

## 10. Tech stack

Use this stack  don't substitute:

- **Framework:** Next.js 14+ (App Router), TypeScript strict mode.
- **Styling:** Tailwind CSS v4 with the design tokens from section 4.
- **UI primitives:** shadcn/ui (manually install only the components used  Button, Input, Select, Accordion, Dialog).
- **Animation:** Framer Motion for the intro and section reveals.
- **Forms:** React Hook Form + Zod for validation.
- **Phone input:** `libphonenumber-js` + a custom input (don't pull in a heavy phone-input library).
- **CAPTCHA:** Cloudflare Turnstile (`@marsidev/react-turnstile`).
- **Icons:** Lucide React (line icons, copper stroke).
- **Hosting:** Vercel.
- **Domain:** Client-provided; ensure `next.config.js` has the canonical domain set for OG/Twitter cards.

### Env vars expected

```
# Public
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

# Server-only (NEVER expose to client)
TURNSTILE_SECRET_KEY=
DEMO_CALL_PROVIDER_API_KEY=
DEMO_CALL_FROM_NUMBER=
DEMO_AGENT_ID_STORAGE=
DEMO_AGENT_ID_PROPERTY=
DEMO_AGENT_ID_APPOINTMENT=
DEMO_AGENT_ID_REFERENCE=
DEMO_AGENT_ID_SERVICE=
DEMO_DAILY_BUDGET_CENTS=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CONTACT_INBOX_EMAIL=
```

Names use the abstraction `DEMO_CALL_PROVIDER_API_KEY` deliberately  the implementing AI must not put the word `RETELL` anywhere in code that could ship to the browser. Server-side env keys may be named however is most maintainable.

### File structure

```
/app
  /page.tsx                  ← single landing route
  /api/demo-call/route.ts    ← POST endpoint (see instruction-demo-call.md)
  /api/contact/route.ts      ← contact form submission
  /privacy/page.tsx          ← placeholder
  /terms/page.tsx            ← placeholder
  layout.tsx
  globals.css
/components
  PennyIntro.tsx             ← logo intro animation (adapt from intro-test.html)
  Nav.tsx
  Hero.tsx
  SocialProof.tsx
  FeatureGrid.tsx
  UseCases.tsx
  HowItWorks.tsx
  TryPenny.tsx               ← the demo form
  VideoBlock.tsx
  SecurityTrust.tsx
  FAQ.tsx
  FinalCTA.tsx
  Footer.tsx
  PennyLogo.tsx              ← SVG component, used everywhere
  ui/                        ← shadcn primitives
/lib
  rate-limit.ts
  phone.ts                   ← E.164 + validation helpers
  scenarios.ts               ← the 5 demo scenario configs
/public
  penny-logo.svg
  og-image.png               ← generate one
```

---

## 11. Accessibility & performance bar

- **Lighthouse:** 95+ on Performance, Accessibility, Best Practices, SEO.
- All interactive elements keyboard-reachable, visible focus rings (2px copper).
- Color contrast AA minimum on every text/bg pair.
- All non-decorative images have alt text.
- Form errors announced via `aria-live`.
- Respect `prefers-reduced-motion`  replace the intro with a static logo for those users.
- Hero LCP image (if any) preloaded. Inter font loaded via `next/font`.
- No layout shift on page load.

---

## 12. SEO

Search intent we're targeting: self-storage owners searching for "answering service for storage", "after hours phone for storage facility", "self storage call automation", "missed call storage units", "storage waitlist automation Australia".

- `<title>`: *Penny  The phone teammate built for self-storage. Answer every enquiry. Fill every unit.*
- `<meta description>`: *Penny picks up every enquiry, rings every waitlist, books every tour, welcomes every new customer, and chases every overdue account  for self-storage facilities across Australia and New Zealand. Hear her in 30 seconds.*
- Keywords to weave naturally into H2s, body copy, and alt text: *self-storage, storage facility, storage units, waitlist, move-in, after-hours, tour booking, overdue accounts, vacancy, Australian storage operators, virtual receptionist for storage*.
- OG image: branded card with the Penny logo, the headline *"The phone teammate built for self-storage,"* and copper accent. Generate at `/public/og-image.png` (1200×630).
- Structured data: `SoftwareApplication` + `Organization` + `Service` (serviceType: "Self-storage answering and waitlist service") JSON-LD in the root layout.
- Sitemap and robots.txt via Next.js conventions.

---

## 13. Deliverables checklist

When done, the implementing AI must be able to tick all of these:

- [ ] Single long-scroll landing page builds and renders at `/`.
- [ ] Intro animation plays once per session, respects reduced-motion.
- [ ] All 13 sections from §3 implemented with the copy from this doc.
- [ ] "Try Penny" form posts to `/api/demo-call` and handles all error states from §7.
- [ ] No reference to Retell, Twilio, Supabase, n8n, OpenAI, GPT, LLM anywhere in client-side code or copy.
- [ ] Mobile (375px) and desktop (1440px) both look polished.
- [ ] Lighthouse Performance, A11y, Best Practices, SEO all ≥ 95.
- [ ] `npm run build` passes with no TypeScript errors or warnings.
- [ ] `.env.example` committed with every variable from §10 (no real values).
- [ ] README.md at the project root explains how to run, build, and deploy.

---

## 14. Things deliberately left out

These are intentional  don't add them without asking:

- **Pricing page**  not yet.
- **Blog**  not yet.
- **Customer logo wall**  only one real customer; don't fake it.
- **Live chat widget**  adds friction and pulls focus from the demo call.
- **Cookie banner**  only add if GDPR/AU-privacy requires it for the analytics chosen. Don't add a default banner reflex.
- **Multi-language**  English-AU only for now.

---

## 15. Reference assets in this folder

- `Penny Logo.svg`  the official logo (use this; do not regenerate).
- `Penny Logo.jpg`  raster reference.
- `PennyIntro.tsx`  Framer Motion component, drop in as-is.
- `intro-test.html`  the working CSS-only version of the intro for reference timing.

The logo's copper accent (`#C98160`) is the single source of truth for `--copper` in the design system.
