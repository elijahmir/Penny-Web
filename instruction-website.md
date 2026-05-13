# Penny — Landing Page Build Instruction

> **For the implementing AI (Claude Code / Cursor / v0):** This is the complete brief to build the Penny marketing website. Read it end-to-end before writing code. Treat the "Mandatory Rules" section as inviolable.

---

## 1. What is Penny?

Penny is a **virtual phone assistant** — a friendly, professional voice that handles phone-based work for businesses 24/7. She makes calls, takes calls, books appointments, sends follow-up emails and SMS, captures information, and hands off to a human when needed.

Penny is currently in production handling two real workflows for Harcourts Ulverstone & Penguin (storage waitlist bookings and employment reference checks). The site is the **commercialisation step** — taking Penny from one client to many.

### Brand position (this is the headline-level pitch)

> Penny is the teammate that never sleeps. She picks up the calls, makes the callbacks, books the bookings, and sends the follow-ups — so your team can stop being a switchboard and start doing the work that actually grows the business.

### Target audience (in priority order)

1. **Self-storage facility owners** — the primary launch target (Tasmania first, then Australia-wide).
2. **Property managers and real estate agencies** — proven use case.
3. **Trades and service businesses** with phone-heavy workflows (plumbers, electricians, dentists, vets, cleaners).
4. **Any SMB that handles repetitive inbound or outbound calls** — appointment reminders, lead callbacks, reference checks, survey calls, after-hours intake.

The site must **not** read as real-estate-only. Lead with broad utility, use storage and real estate as proof-point case studies.

---

## 2. MANDATORY RULES — do not break these

These rules exist because of how Penny is sold and how it's billed. Breaking any of them creates problems.

1. **Never mention the underlying tech.** No "Retell AI", no "Twilio", no "Supabase", no "n8n", no "GPT", no "OpenAI", no "LLM", no "ChatGPT". The website talks about Penny as a service — not as a stack.
2. **Never describe Penny as "a robot", "a bot", "an AI assistant", "an AI agent", or "ChatGPT for phones".** Penny is a "virtual assistant", "phone teammate", "AI-powered assistant" (only if absolutely necessary), or just "Penny." Lean human, not technical.
3. **No robot imagery, circuit boards, neural nets, glowing particles, headsets, microphones with sound waves, or any visual sci-fi tropes.** Stick to abstract, brand-led graphics.
4. **Never expose the demo call's plumbing.** When a visitor uses the "Try Penny" feature, the UI must say things like "Penny is calling you now…" — never "Initiating Retell call" or anything technical.
5. **Pricing is not public yet.** Use "Get in touch" / "Book a chat" CTAs instead of price cards. A simple "Pricing scales with usage — let's talk" line is fine.
6. **No fabricated testimonials, logos, or customer counts.** If we don't have it, don't put it on the site. Placeholders are acceptable (clearly marked in code comments).

---

## 3. Information architecture

A single long-scroll landing page (one route, `/`) with these sections in order. Each section is its own component file.

| # | Section | Purpose |
|---|---|---|
| 1 | **Intro animation** | Plays once per session. The logo intro from `intro-test.html` adapted as a React component. |
| 2 | **Nav bar** | Logo (top-left), nav links (Features, Use cases, How it works, FAQ), CTA button (top-right: "Try Penny"). |
| 3 | **Hero** | Headline, sub-headline, two CTAs ("Try Penny" → scrolls to demo, "See how it works" → scrolls to features). Optional small lockup or product visual. |
| 4 | **Social proof strip** | One-line trust statement: *"Already handling real calls for Harcourts Ulverstone & Penguin."* Optionally a placeholder logo row (commented as TODO). |
| 5 | **Feature grid** | 6 capability cards. See section 5. |
| 6 | **Use cases** | 4–5 industry/scenario cards with short narratives. See section 6. |
| 7 | **How it works** | 3 simple steps. No jargon. |
| 8 | **Try Penny (demo)** | The interactive demo. See section 7 and the separate `instruction-demo-call.md` for backend details. |
| 9 | **Video** | Single embedded video block. Use a styled placeholder (e.g. dark card with play icon and caption "Video coming soon — client to provide"). The client will replace this. |
| 10 | **Security & trust** | Short reassurance block: encrypted data, audit-logged calls, Australia-based, GDPR-respectful. |
| 11 | **FAQ** | 6–8 questions. Accordion component. Sample questions in section 9. |
| 12 | **Final CTA** | Big "Talk to us about Penny" block with a contact form or Calendly embed placeholder. |
| 13 | **Footer** | Penny logo, copyright, contact email, minimal links (Privacy, Terms — can be placeholder pages). |

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
- **Shadows:** Subtle only — `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)`.
- **Buttons:**
  - Primary: charcoal bg, cream text, copper hover ring.
  - Secondary: transparent bg, charcoal text, 1px charcoal-10% border.
  - Ghost: transparent, charcoal text, underline on hover.
- **Cards:** white bg, 1px border `--border`, 12px radius, generous padding (24–32px).
- **Motion:** Framer Motion only. Easing `cubic-bezier(0.16, 1, 0.3, 1)` for most entrances. Stagger 60–80ms between siblings. Respect `prefers-reduced-motion`.

### Visual style references

- **Stripe** — confident typography, generous whitespace.
- **Linear** — restrained color, premium feel, subtle gradients.
- **Mercury** — warm-cool palette balance, calm pace.
- **Vercel** — clean wordmark, no kitsch.

**Avoid:** gradients on text, glowing buttons, glassmorphism, particle effects, animated SVG patterns in backgrounds, stock photos of people in headsets, generic SaaS hero illustrations.

---

## 5. Feature grid — content (6 cards)

Each card: icon (custom 24×24 line icon in copper), title (4–6 words), description (1–2 sentences).

1. **Always answering, always calling**
   24/7 coverage means no missed calls and no after-hours bottleneck. Penny picks up at 2am, books at 6pm, and follows up while you're at lunch.

2. **Books and confirms appointments**
   Penny checks your calendar, offers real times, and locks in the booking on the call. Confirmations go out by email or SMS automatically.

3. **Sends emails and SMS**
   The right message to the right person at the right time — receipts, reminders, paperwork links, follow-up notes. Already drafted, already sent.

4. **Captures the right details, every time**
   Names, addresses, preferences, structured information — all recorded accurately and stored in one place you can search and review.

5. **Hands off to a human when it matters**
   If the call needs a real person, Penny transfers warmly with full context — your team picks up already knowing the situation.

6. **Plugs into the tools you already use**
   Calendars, CRMs, inboxes, documents, payment links — Penny works with what you've got. No replatforming, no migration project.

---

## 6. Use cases — content (4–5 cards)

Each card has a category tag, a scenario title, a one-paragraph story, and a "What Penny does" bullet list.

### Card 1 — Self-storage
- **Tag:** Self-storage
- **Title:** Fill empty units before they cost you a month's rent.
- **Story:** A unit opens up. Instead of someone in the office working down a waitlist, Penny rings every name, presents the unit, and books the first taker — usually before the day is out.
- **What Penny does:** Calls the waitlist · Presents availability · Books on the call · Sends the agreement link · Logs everything

### Card 2 — Property management
- **Tag:** Real estate
- **Title:** Reference checks done overnight, not next week.
- **Story:** A tenancy application comes in. Penny rings the referees, asks the right questions, captures scored answers, and has a clean report on your desk by morning.
- **What Penny does:** Contacts referees · Conducts structured interviews · Captures responses · Produces a report · Flags concerns for review

### Card 3 — Trades & services
- **Tag:** Trades
- **Title:** Never miss a job call again.
- **Story:** You're on a roof. The phone rings. Penny answers, qualifies the job, gives a rough quote, books the site visit, and texts you the details — all while you keep working.
- **What Penny does:** Takes inbound calls · Qualifies the lead · Books site visits · Sends quotes · Notifies you instantly

### Card 4 — Clinics & appointment-based businesses
- **Tag:** Healthcare & wellness
- **Title:** Reminders that actually reduce no-shows.
- **Story:** Day before every appointment, Penny calls to confirm. Patient can confirm, reschedule, or cancel right on the call. Calendar updates itself. Empty slots get refilled from the waitlist.
- **What Penny does:** Confirms bookings · Reschedules on request · Refills cancellations · Sends prep instructions · Reports no-shows

### Card 5 — General admin
- **Tag:** Anywhere
- **Title:** The repetitive call you do twenty times a week.
- **Story:** Every business has one — the same call, made or taken, over and over. Survey follow-ups, payment reminders, delivery confirmations, new-customer welcomes. Hand it to Penny once and it's handled forever.
- **What Penny does:** Whatever script you give her · As many calls as you need · Logged, tracked, reportable

---

## 7. "Try Penny" demo section

This is the **money feature** of the site — visitors give their name and phone number and receive a live demo call from Penny within seconds. Full backend spec is in `instruction-demo-call.md`. The **frontend** is your job here.

### UI requirements

- **Heading:** "Hear Penny in 30 seconds."
- **Subheading:** "Pick a scenario, drop your name and number, and Penny will give you a call right now."
- **Form fields:**
  1. **Scenario** — dropdown/select (radio group on desktop is nicer). Options:
     - "🏢 Storage waitlist — a unit just opened up"
     - "🏠 Property inquiry callback — following up on a listing"
     - "📅 Appointment reminder — confirming tomorrow's booking"
     - "✅ Reference check — referee interview"
     - "🛠 Service callback — quoting a job"
  2. **Your name** — text input, 2–60 chars.
  3. **Phone number** — phone input with international formatting (default to Australia +61).
  4. **CAPTCHA** — Cloudflare Turnstile widget (free, invisible-friendly).
- **Submit button:** "Call me now" — disabled until form valid + CAPTCHA passed.
- **Submission states:**
  - Idle → Submitting (button spinner) → "Penny is calling you now ☎" (success state, ~10s, with animated indicator) → "Call ended — how was it?" (with feedback thumbs up/down).
  - Error states: "We've hit our daily demo limit — try again tomorrow", "Looks like this number was used recently — try in 5 minutes", "Couldn't reach that number — check it and try again".
- **Helper microcopy under form:**
  *"One demo per number per day · Calls last under 3 minutes · Penny may ask a quick question or two about your business — only saved if you say yes."*

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

Plain English, no jargon. Each step is one short paragraph plus an icon.

1. **Tell us what you want Penny to do.**
   We sit down and map out the calls she'll handle — what to say, what to ask, what to send afterwards, when to bring in a human.

2. **We set Penny up with your tools.**
   Calendar, contacts, inbox, whatever you're using. Penny learns the script and the systems — usually inside a week.

3. **She gets to work.**
   Penny starts taking and making calls. You get a dashboard of every conversation. You tweak as you go.

---

## 9. FAQ — content

Accordion component, all closed by default. 8 questions:

1. **Is Penny a real person?**
   No. Penny is an AI-powered virtual assistant — but she talks naturally, listens carefully, and handles real conversations. We tell callers upfront if they ask.

2. **What if a caller needs to speak to a human?**
   Penny transfers the call to your team straight away, with full context. No "press 1 for service" — just a smooth hand-off.

3. **How quickly can we get started?**
   Most setups are live within 5–10 business days, depending on how many calls you want Penny to handle.

4. **What does it cost?**
   Pricing scales with usage. We'll quote based on call volume and the workflows you want Penny to run. Get in touch for numbers.

5. **Is my data secure?**
   Yes. Every call is encrypted in transit and at rest, calls are logged in your private dashboard, and we comply with Australian privacy law.

6. **What languages does Penny speak?**
   Penny currently speaks Australian English by default. We can configure other voices and accents on request.

7. **Will Penny replace my team?**
   No — Penny replaces the repetitive parts so your team can focus on the work that actually needs a human.

8. **Can I hear Penny before I commit?**
   Yes — use the "Try Penny" form above and she'll call you right now.

---

## 10. Tech stack

Use this stack — don't substitute:

- **Framework:** Next.js 14+ (App Router), TypeScript strict mode.
- **Styling:** Tailwind CSS v4 with the design tokens from section 4.
- **UI primitives:** shadcn/ui (manually install only the components used — Button, Input, Select, Accordion, Dialog).
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

Names use the abstraction `DEMO_CALL_PROVIDER_API_KEY` deliberately — the implementing AI must not put the word `RETELL` anywhere in code that could ship to the browser. Server-side env keys may be named however is most maintainable.

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
- Respect `prefers-reduced-motion` — replace the intro with a static logo for those users.
- Hero LCP image (if any) preloaded. Inter font loaded via `next/font`.
- No layout shift on page load.

---

## 12. SEO

- `<title>`: *Penny — Your virtual phone assistant, on duty 24/7*
- `<meta description>`: *Penny answers calls, makes callbacks, books appointments, and sends follow-ups for your business. Hear her in action in 30 seconds.*
- OG image: branded card with the logo, tagline, and copper accent. Generate at `/public/og-image.png` (1200×630).
- Structured data: `SoftwareApplication` + `Organization` JSON-LD in the root layout.
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

These are intentional — don't add them without asking:

- **Pricing page** — not yet.
- **Blog** — not yet.
- **Customer logo wall** — only one real customer; don't fake it.
- **Live chat widget** — adds friction and pulls focus from the demo call.
- **Cookie banner** — only add if GDPR/AU-privacy requires it for the analytics chosen. Don't add a default banner reflex.
- **Multi-language** — English-AU only for now.

---

## 15. Reference assets in this folder

- `Penny Logo.svg` — the official logo (use this; do not regenerate).
- `Penny Logo.jpg` — raster reference.
- `PennyIntro.tsx` — Framer Motion component, drop in as-is.
- `intro-test.html` — the working CSS-only version of the intro for reference timing.

The logo's copper accent (`#C98160`) is the single source of truth for `--copper` in the design system.
