# Penny SAAS — Pricing Proposal

**Audience:** Founder / Head of Penny SAAS Business
**Prepared by:** Eli (developer)
**Date:** 18 May 2026
**Version:** 1.0
**Market:** Australia / New Zealand
**Currency:** AUD (ex-GST) unless explicitly noted

---

## Executive Summary

Penny — our AI customer service agent (Retell AI voice + ElevenLabs Conversational AI chat) — is built and proven internally at Harcourts across two production agents. To commercialise it for the AU/NZ B2B2C market, we need a pricing model that:

1. **Recovers PAYG costs predictably** — four metered providers (Retell, ElevenLabs, Twilio, OpenAI) burn money simultaneously on every interaction.
2. **Caps margin risk** — providers don't enforce upstream limits, so we must enforce them at the application layer.
3. **Justifies a real setup fee** — 1 week of dev work + Twilio provisioning per client.
4. **Targets 5–10 anchor clients in Year 1** to generate case studies and validate the model before scaling.

**Recommendation:** Hybrid pricing (base + included usage + overage) across four tiers (Starter / Growth / Scale / Enterprise), with one-time setup fees (Lite $1.5K / Standard $3.5K / Enterprise $8K+). Founder approval needed on four decisions before launch.

The accompanying **XLSX pricing model** is the math foundation — every number in this document is derived from it and recalculates live if you change inputs. The **PPTX deck** is the boardroom version of this document.

---

## 1. Strategic Context

### 1.1 What Penny is today

Penny is an AI agent operating two production workflows at Harcourts:

- **Penny — Reference Check** (`agent_5494ea98b9d04487f8018e83ed`): handles employment / landlord reference verification for rental applicants. 11 MCP-connected tools, structured-JSON capture, integrated with rental application pipeline.
- **Penny — Storage Outbound** (`agent_175501d901ea897834078bad6e`): handles waitlist notification + self-service booking for Harcourts storage units. Real-time date awareness, DocuSign integration, warm-transfer to human staff.

**Stack:**

| Layer | Service | Notes |
|---|---|---|
| Voice infrastructure | Retell AI | BYO Twilio for telephony |
| Voice synthesis | ElevenLabs | Custom voice `custom_voice_1167b7e0f3784942b829fa591d` (Penny brand) |
| Chat widget | ElevenLabs Conversational AI | Website-embedded; per-minute billed |
| LLM | OpenAI GPT-4o / 4o-mini | Routed via Retell |
| Database & auth | Supabase | Postgres tables for KB + call logs; project `umjpswrbowxkmatqgqgr` |
| Integration / MCP | n8n | Cloud at `hup.app.n8n.cloud` — migration to self-host recommended |
| Web dashboard | Next.js + TypeScript | Existing Harcourts Storage App |
| Email | Microsoft Outlook | Via n8n SMTP |

### 1.2 What we're commercialising

We are productising Penny as a B2B2C SAAS — selling to **other businesses** (storage, dental, real estate, automotive, professional services) so they can deploy Penny to handle **their customers'** inbound enquiries, bookings, and outbound notifications.

### 1.3 Year-1 goal

Land **5–10 anchor clients** for case studies + initial revenue. Anchor clients receive a discount (recommended: 50% off month 1) in exchange for testimonial + logo rights.

---

## 2. The Hard Problem — Why Pricing is Non-Trivial

### 2.1 PAYG cost stack

Every Penny interaction simultaneously triggers four metered providers:

```
   ┌────────────────────────────────────────────────────────────┐
   │  Inbound call lands at Twilio AU number                     │
   │     ↓ Twilio inbound voice: AUD $0.01 / min                 │
   │  Retell AI picks up the call                                │
   │     ↓ Retell infra + ElevenLabs TTS + GPT-4o LLM            │
   │     ↓ All-in: ~USD $0.20 / min  =  ~AUD $0.31 / min         │
   │  n8n triggers tools (booking, email, callback)              │
   │     ↓ Execution count against n8n plan                      │
   │  Conversation logs written to Supabase                      │
   │     ↓ DB egress / MAU counters                              │
   └────────────────────────────────────────────────────────────┘
```

A typical 5-minute voice call costs Penny ~**AUD $1.62** in variable cost (Retell $1.55 + Twilio $0.05 + number share ~$0.02). A typical 5-minute chat session via ElevenLabs ConvAI costs ~**AUD $0.62**.

### 2.2 The unfixable upstream

**Neither Retell nor ElevenLabs offers usage caps from upstream.** If a client's end-customers flood Penny with calls or chats, the providers will keep billing us until our credit card declines. This is the same trap that has burned every early-stage AI agent SAAS: a single chatty customer or a marketing-campaign spike can wipe out a month of margin.

**Implication:** Penny must enforce caps at the application layer. The pricing model relies on Penny's own Supabase counters + Retell webhooks to monitor included-minute consumption per client and alert before runaway costs.

### 2.3 Why per-seat doesn't work

Voice and chat agents have no concept of "seats" — Penny doesn't have human users in the traditional sense. End-customers are the cost driver, not internal seats. The industry is shifting away from per-seat for exactly this reason (ref: SoftwareSeni article, 2024).

---

## 3. Pricing Philosophy — Why Hybrid

Four pricing models are commonly considered for AI agent SAAS:

| Model | Verdict | Reason |
|---|---|---|
| **Per-seat** | ❌ Wrong fit | No "seats" concept. Buyers reject it as misaligned. |
| **Pure usage** | ⚠ Risky | Unpredictable invoices scare SMB buyers. Hard for them to budget. |
| **Outcome-based** | ⚠ Too early | Per-result pricing (e.g. per booking) needs proven ROI baseline. Penny is pre-launch. |
| **Hybrid (base + metered)** | ✓ **Recommended** | Predictable for buyer (they know the base), margin-safe for Penny (overage protects). |

**Hybrid model structure:**
- **Base monthly fee** (predictable for client, covers fixed cost allocation + a chunk of included usage)
- **Included usage** (voice minutes + chat minutes per month — enough for typical operation)
- **Overage rates** (per-minute charges above the cap — priced at 3–4× COGS for margin protection)
- **Annual billing discount** to encourage commitment

This mirrors how Twilio, Vonage, and most modern infrastructure SAAS companies bill — predictable on average, with elastic upside.

---

## 4. Setup Fees (One-Time, Per Client)

### 4.1 Why a setup fee matters

A free setup signals low value AND loses money on day 1. Engineering rate baseline is **AUD $1,500–$2,500 per day**. A 1-week onboarding eats $7.5K–$12.5K in dev cost. Without recovering some of this upfront, we operate at a margin deficit until ~month 3 of every new client.

### 4.2 Three setup packages

| Package | Fee (AUD) | Effort | What's Included |
|---|---|---|---|
| **Lite** | $1,500 | ~3 days dev | Standard KB upload (up to 20 docs), 1 Twilio AU local number, default web widget, 2 standard n8n workflows (booking + inquiry), 2hr training, 1 week post-launch support |
| **Standard** | $3,500 | ~5–7 days dev | Custom KB tuning, 1–2 numbers (local + mobile), branded web widget, up to 5 custom n8n workflows, CRM hand-off, 5hr training, 2 weeks support |
| **Enterprise** | From $8,000 | 10+ days, sales-led | Custom ElevenLabs voice clone, multi-agent flows, full CRM integration, dedicated workflow build, SLA, 4 weeks support |

### 4.3 Discounts

- **Anchor client deal** (first 5–10): 50% off setup fee + 50% off month 1 in exchange for case-study + testimonial rights.
- **Annual prepaid clients**: setup fee discounted 25% (encourages upfront cashflow).

---

## 5. Monthly Subscription Tiers

### 5.1 The ladder

| Tier | Monthly (AUD) | Voice min included | Chat min included | Voice overage | Chat overage |
|---|---|---|---|---|---|
| **Starter** | $499 | 200 | 500 | $1.20 / min | $0.55 / min |
| **Growth** | $1,499 | 800 | 2,000 | $1.00 / min | $0.45 / min |
| **Scale** | $3,999 | 2,500 | 6,000 | $0.85 / min | $0.40 / min |
| **Enterprise** | From $7,500 | Negotiated | Negotiated | Volume-priced | Volume-priced |

### 5.2 Value anchoring

A full-time customer service representative in Australia costs **AUD $60K–$80K per year** in salary, or **$5,000–$6,600 / month**. Penny's Scale tier ($3,999/mo) replaces ~0.7 FTE while operating 24/7 with zero sick days. The Starter tier ($499/mo) replaces ~0.1 FTE — meaningful even for solo operators.

### 5.3 Billing options

- **Monthly:** list price.
- **Annual billed monthly:** −10% (commitment without cashflow burden).
- **Annual prepaid:** −15% (best cashflow for Penny, hardest sell early but worth offering).

### 5.4 Overage markup analysis

Overage rates are deliberately priced at 3–4× COGS to protect margin when clients exceed included minutes:

| Channel | COGS (AUD/min) | Overage (Starter) | Markup |
|---|---|---|---|
| Voice | $0.32 | $1.20 | 3.7× |
| Chat | $0.124 | $0.55 | 4.4× |

This ensures that even at peak usage, overage stays profitable. It also creates a natural incentive for heavy users to upsize to the next tier where overage rates drop.

---

## 6. Unit Economics

### 6.1 Variable cost per minute (verified 2026-05-18)

| Layer | Source | AUD / min |
|---|---|---|
| Retell AI (infra + TTS + LLM) | USD $0.20 × FX 1.55 | $0.310 |
| Twilio AU inbound (weighted 85%) | AUD $0.01 × 85% | $0.009 |
| Twilio AU outbound local (weighted 15%) | AUD $0.0252 × 15% | $0.004 |
| **Voice TOTAL** | — | **~$0.32** |
| ElevenLabs ConvAI (Standard) | USD $0.08 × FX 1.55 | $0.124 |
| **Chat TOTAL** | — | **~$0.12** |

### 6.2 Fixed platform costs (per month)

| Service | Plan | AUD/mo |
|---|---|---|
| Supabase | Pro | $39 |
| n8n | Hostinger KVM 2 (self-host) | $14 |
| ElevenLabs | Pro base plan | $153 |
| Vercel + OpenAI direct | Variable | $60 |
| **TOTAL** | | **~$266** |

Allocated across 10 clients: **~$27 / client / month**.

### 6.3 Margin at full tier utilisation

| Tier | Revenue | Variable COGS | Fixed alloc | Total COGS | Gross profit | Gross margin |
|---|---|---|---|---|---|---|
| Starter | $499 | $126 | $27 | $153 | $346 | **69%** |
| Growth | $1,499 | $506 | $27 | $533 | $966 | **64%** |
| Scale | $3,999 | $1,550 | $27 | $1,577 | $2,422 | **61%** |
| Enterprise | $7,500 | $3,385 | $27 | $3,412 | $4,088 | **55%** |

**Insights:**
- Starter, Growth, and Scale all clear the 60% GM target at full utilisation.
- At typical 70% utilisation, margins are even higher — see scenarios in §6.4.
- Enterprise (55%) drops because base price is conservative — real Enterprise deals price for value (CRM integration, SLA, dedicated voice clone), not COGS.
- The XLSX model lets the founder stress-test any of these numbers by editing the Assumptions tab.

### 6.4 Realistic scenarios (typical utilisation)

| Client profile | Tier | Voice min | Chat min | Revenue | COGS | Margin |
|---|---|---|---|---|---|---|
| Light user (small office) | Starter | 100 | 250 | $499 | $63 | 87% |
| Active SMB (storage, dental) | Growth | 600 | 1,500 | $1,499 | $378 | 75% |
| Mid-market multi-location | Scale | 1,800 | 4,500 | $3,999 | $1,134 | 72% |
| Heavy enterprise | Enterprise | 5,000 | 12,000 | $7,500 | $3,090 | 59% |

At realistic (not at-cap) utilisation, gross margins are **70%+ across Starter through Scale**. These are sales-friendly numbers — Penny generates real margin without squeezing buyers.

---

## 7. Year-1 Projection

Conservative ramp model: 1 client month 1, +1 client per month, plateau at 8, ending at 10. Client mix: **50% Starter, 35% Growth, 15% Scale**. Anchor deal: 50% off month 1 for first 5 clients.

| Metric | M1 | M3 | M6 | M9 | M12 | Year Total |
|---|---|---|---|---|---|---|
| Active clients | 1 | 3 | 6 | 8 | 10 | — |
| MRR | $687 | $3,435 | $7,557 | $10,305 | $13,053 | $92,058 |
| Setup fees | $1,588 | $3,175 | $3,175 | $0 | $3,175 | $31,750 |
| **Total revenue** | **$2,275** | **$6,610** | **$10,732** | **$10,305** | **$16,228** | **$123,808** |
| Variable COGS (70% util) | $259 | $777 | $1,553 | $2,071 | $2,589 | $18,259 |
| Fixed costs | $266 | $266 | $266 | $266 | $266 | $3,192 |
| **Gross profit** | **$1,750** | **$5,567** | **$8,913** | **$7,968** | **$13,373** | **$102,357** |
| Gross margin % | 77% | 84% | 83% | 77% | 82% | **83%** |

**Caveats:**
- Excludes overage revenue (likely +10–20% on top).
- Excludes headcount cost (founder + dev + support salaries). This is *gross* profit, not net.
- Assumes self-host n8n. Staying on n8n Cloud Pro adds ~AUD $70/mo to fixed costs.
- Setup fees assume weighted mix: 50% Lite ($1,500), 35% Standard ($3,500), 15% Enterprise ($8,000) = **$3,175 weighted average**.

---

## 8. Founder Decisions Needed

Four calls only the founder should make. Each has a recommendation with reasoning.

### 8.1 Trial / Pilot Model

**Recommendation: Paid pilot (50% off month 1) + case-study trade for first 5 anchor clients.**

- Avoids free-trial cost exposure — PAYG providers will keep billing even during "free" trials.
- Filters serious buyers — anyone willing to pay 50% off is much more likely to convert than someone signing up for free.
- Anchors get a meaningful rate in exchange for testimonial + logo rights.

**Alternative considered:** Free 14-day trial with 100 voice min cap. Rejected as HIGH RISK without the app-layer enforcement built first.

### 8.2 n8n Hosting

**Recommendation: Migrate to self-host on Hostinger KVM 2 (USD $8.99/mo) before client #3.**

- Current n8n Cloud Pro is €50/mo with a 10K execution cap. One Growth-tier client easily uses 1,000+ executions per month (call logging, callbacks, email dispatch, CRM sync). At 5+ clients, we will hit the cap.
- Self-host on Hostinger KVM 2 = unlimited executions for ~80% less cost (AUD $14/mo vs $83/mo).
- Trade-off: ~1 day of devops setup + ongoing patching responsibility. The dev team can do this.
- AWS is overkill for current scale and would cost more.

### 8.3 Phone Number Model

**Recommendation: Per-client dedicated Twilio AU local number ($3/mo each, bundled into setup fee + monthly base).**

- Better branding for end-customers (they see a local AU number, not a generic).
- Cost is small ($3/mo) — bundled into Starter+ tiers at no visible extra charge.
- Existing client business numbers are supported via call forwarding only — no porting (porting is a 4–6 week process with carrier sign-offs).

### 8.4 Custom Voice Add-On

**Recommendation: Charge AUD $500–$1,500 one-time per cloned voice as published Enterprise SKU.**

- ElevenLabs voice cloning is a Pro-tier feature with real platform cost.
- Clients who want their own branded voice signal Enterprise budget — price it accordingly.
- Listed as a published add-on (not sales-only) to make the option discoverable.

---

## 9. Risk Register

Six known PAYG / scaling risks the founder should be aware of. All have mitigations baked into the model.

| Risk | Severity | Description | Mitigation |
|---|---|---|---|
| **Concurrency cliff** | High | Retell includes 20 concurrent calls. Above that = USD $8 per slot/month. At 10 active clients with peak-hour overlap, this WILL hit. | Alert at 15 concurrent. Surcharge Enterprise tier if >20 concurrent needed. |
| **ElevenLabs base plan floor** | Medium | USD $99/mo Pro plan is required to unlock the Agents add-on. Spread thin across <5 clients = ~$30+ AUD/client fixed drag. | Bundled into Starter tier pricing OR absorbed as marketing cost during ramp. |
| **n8n execution limits** | High | 10K executions/mo on Cloud Pro. Each Penny call + chat triggers multiple workflows. One Growth client easily uses 1K+ executions. | MIGRATE to self-host on Hostinger before client #3 (recommendation 8.2). |
| **Peak-hour PAYG explosion** | High | Marketing campaign tripling volume in 48 hours = uncapped voice/chat cost burn. Providers won't enforce limits. | App-layer soft-cap: Supabase counter + Retell webhook. Alert client at 90% of included minutes. Queue overage pre-approval if needed. |
| **Custom ElevenLabs voice upgrade** | Low | Per-client branded voice clone is a Pro/Enterprise ElevenLabs feature with real cost. | Charge AUD $500–$1,500 one-time as Enterprise add-on (recommendation 8.4). |
| **Outbound mobile call cost (3× local)** | Medium | Twilio AU outbound to mobile = $0.075/min vs local $0.0252. Outbound campaigns burn margin fast. | Separate "Outbound Campaign" SKU with higher per-minute overage rate. Don't bundle into standard tiers. |

---

## 10. Implementation Plan

| Phase | Owner | Action |
|---|---|---|
| **Week 1** | Founder | Approve pricing + trial model. Set up Stripe products (4 plan SKUs + 3 setup fee SKUs + add-on SKUs). |
| **Week 2** | Dev | Migrate n8n to Hostinger self-host. Build app-layer soft-cap (Supabase counter + Retell webhook at 90% of included minutes, alert + queue overage). |
| **Week 3** | Dev + Sales | Build client onboarding playbook: KB intake form, Twilio provisioning checklist, n8n workflow template library, standard contract template. |
| **Week 4** | Founder + Sales | Outreach to 8–10 prospects (real estate, storage, dental, automotive service). Pitch the case-study trade. |
| **Month 2** | Dev + Sales | Onboard first 2 anchor clients. Document every gotcha — what worked, what broke, what to charge extra for next time. |
| **Month 3** | Founder | Adjust tier ladder based on actual usage data. Capture testimonials. Publish first case study. |
| **Month 4–6** | Marketing + Dev | Launch self-serve sign-up for Starter tier on website. Sales-assisted for Growth+. Push annual contract motion. |
| **Month 6+** | Founder | Review pricing quarterly. Add adjacent SKUs: Outbound Campaign, Voice Clone, Custom Integration packs. |

---

## 11. Open Questions (Non-Blocking)

1. **GST handling.** All prices in this document are ex-GST. Add 10% GST line on AU client invoices. **Founder/accountant to confirm GST registration status.**
2. **NZ pricing.** Use AUD for both AU and NZ at launch; revisit if NZ buyers push back on FX. **Founder to confirm at first NZ deal.**
3. **Contract length minimums.** Recommend 3-month minimum on monthly plans (cancel anytime after) to recover setup investment.
4. **Cancellation / refund policy.** Recommend: 30-day notice on monthly, no refund on setup fee, prorated refund on annual prepaid if cancelled within 60 days.
5. **Multi-region deployment.** Currently AU-only. Adding EU or US needs separate Twilio account + ElevenLabs region selection — defer to Year 2.

---

## 12. Verification Checklist

Before sending this to clients, validate:

- [ ] **Math check.** Open the XLSX model — run three scenarios: Low (50 calls + 30 chats on Starter), Avg (300 calls + 200 chats on Growth), Heavy (1,200 calls + 800 chats on Scale). Confirm margins ≥70% / ≥55% / ≥45% respectively.
- [ ] **Cost-floor check.** Sum fixed platform costs (Supabase + n8n + ElevenLabs + Vercel). Confirm Starter tier (Aud $499) more than covers 1/10th of fixed costs.
- [ ] **Overage break-even check.** Verify each overage rate ≥ 150% of variable cost. At 150%+ markup, overage stays profitable even during peak misuse.
- [ ] **Founder walkthrough.** Present the deck → confirm decisions on (trial model, n8n hosting, number provisioning, voice clone pricing) → update Sheet + Doc.
- [ ] **Pilot smoke test.** Once approved: run a real client through the pricing model end-to-end with their estimated volume. Confirm quote feels right against the alternative cost of a human CSR.

---

## 13. Companion Deliverables

This document is one of three:

1. **`Penny-Pricing-Model-2026-05-18.xlsx`** — Interactive math model. Founder can edit Assumptions tab and watch all tiers recalculate. Includes 9 sheets: Cover, Assumptions, COGS Calculator, Tier Economics, Scenarios, Setup Fees, Fixed Costs, Year-1 Projection, Risk Register.
2. **`Penny-Pricing-Deck-2026-05-18.pptx`** — 14-slide founder deck. Boardroom-ready summary.
3. **`penny_pricing_proposal.md`** (this document) — Long-form written rationale.

All three files are in `.tmp/`. Recommended next step: upload all three to a shared Google Drive folder for founder review.

---

## Appendix A — Raw Cost References (Verified 2026-05-18)

### Retell AI
- Voice all-in: USD $0.07–$0.31/min (depending on voice + LLM choice)
- Infra layer: $0.055/min
- TTS layer: $0.015/min (Retell native) or $0.040/min (ElevenLabs)
- LLM layer: $0.003–$0.080/min (model-dependent)
- Concurrency: 20 included, $8/month per additional slot
- Knowledge Bases: free up to 10, then $8/KB/month
- Source: https://retellai.com/pricing

### ElevenLabs Conversational AI
- Standard agent: USD $0.08/min (GPT-3.5-turbo)
- Turbo agent: USD $0.10/min (GPT-4o-mini)
- Premium agent: USD $0.12/min (GPT-4o)
- Pro base plan required: USD $99/month
- BYOLLM discount: not published — contact sales
- Source: https://elevenlabs.io/pricing

### Twilio Australia
- Local phone number: AUD $3.00/month
- Mobile number: AUD $8.25/month
- Toll-free: AUD $20.00/month
- Inbound voice (local/mobile): AUD $0.0100/min
- Outbound voice (local): AUD $0.0252/min
- Outbound voice (mobile): AUD $0.0750/min
- Source: https://www.twilio.com/en-us/voice/pricing/au

### OpenAI
- GPT-4o: USD $2.50/M input, $10.00/M output
- GPT-4o-mini: USD $0.15/M input, $0.60/M output
- text-embedding-3-small: USD $0.02/M tokens
- Cached input: 50% discount
- Source: https://openai.com/api/pricing/

### Supabase
- Free: $0 (500MB DB, 50K MAU, 1GB storage)
- Pro: USD $25/month (8GB DB, 100K MAU, 100GB storage, 250GB egress)
- Team: USD $599/month
- Overage: $0.125/GB DB, $0.09/GB egress, $0.00325/MAU
- Source: https://supabase.com/pricing

### n8n Cloud
- Starter: €20/month (2.5K executions, 5 concurrent)
- Pro: €50/month (10K executions, 20 concurrent)
- Business: €667/month (40K executions)
- Source: https://n8n.io/pricing

### n8n Self-Host (recommended)
- Hostinger KVM 2: USD $8.99/month (2 vCPU, 8GB RAM, 100GB SSD) — meets n8n minimum specs
- AWS EC2 t3.medium alternative: USD $30.37/month (more expensive, marginal benefit)
- Source: https://www.hostinger.com/vps-hosting

---

*End of document. Questions: ask Eli or refer to the XLSX model.*
