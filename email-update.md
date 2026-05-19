# Penny - Platform Update & Pricing Reference

Hi Brad,

Hope you're well. Wanted to loop you in on where Penny is at and share some materials Elijah and I (Claude) put together that should be useful as you work through the pricing and positioning decisions.

---

## What's Live

The Penny demo landing page is live at:
**[https://penny.brooklynbradley.com](https://penny.brooklynbradley.com)**

It now showcases both sides of the Penny platform - **voice** and **chat** - in a single place. Here's what's on the page today:

### Phone Demo (Voice AI - powered by Retell AI)
Visitors can pick a scenario, enter their name and number, and Penny calls them back within seconds. Five real scenarios are live:
1. **Waitlist Callback** - a unit has opened up and Penny rings the next person in line
2. **Enquiry Callback** - someone called while you were out; Penny returns the call to qualify and book a tour
3. **Tour Booking** - a prospect wants to see the facility and Penny arranges the visit
4. **Move-in Welcome** - a new tenant just signed and Penny delivers their gate codes and access details
5. **Overdue Payment** - a payment is a few days late; Penny makes a warm courtesy call with payment options

### Chat Demo (Chat AI - powered by ElevenLabs Conversational AI)
Visitors can chat directly with Penny on the page - no sign-up, no download. Penny can answer pricing and availability questions, guide visitors around the page, highlight specific features, and capture lead information automatically. This demonstrates exactly what the embedded chat widget would look like on a client's storage facility website.

---

## Three Documents Attached

Elijah and I built three companion documents to support your pricing and commercialisation decisions. All three work together:

### 1. `penny_pricing_proposal.md` - Full Written Rationale
The long-form document. Covers why hybrid pricing is the right model, the full cost stack per interaction (Retell, ElevenLabs, Twilio, OpenAI), four subscription tiers with margin analysis, setup fee packages, Year 1 revenue projections, and a risk register. Written so you can read it top-to-bottom or jump to the section you need.

### 2. `Penny-Pricing-Model-2026-05-18.xlsx` - Interactive Math Model
The numbers behind every figure in the proposal. You can open the Assumptions tab and change any input (e.g. exchange rate, usage volume, number of clients) and watch all tiers recalculate live. Includes scenario modelling for light, typical, and heavy usage clients.

### 3. `Penny-Pricing-Deck-2026-05-18.pptx` - Boardroom Slide Deck
A 14-slide version of the proposal for presenting to partners, investors, or the wider team. Same structure as the written doc - less text, more visual.

> **Note on the markdown file:** The `.md` file is also useful if you're working with Claude (AI) directly. Claude can read and reason over it, which means you can paste it into a conversation and ask questions like *"what should we charge a dental clinic with 300 calls per month?"* or *"stress-test the Growth tier margins"* - and get grounded answers from the actual numbers.

---

## What the Pricing Is Based On

Both Penny agents running in production today use the same underlying platform stack:

| What Penny does | Platform |
|---|---|
| **Voice calls** (inbound + outbound) | Retell AI + Twilio |
| **Chat widget** (on-website) | ElevenLabs Conversational AI |
| **AI brain** | OpenAI GPT-4o / 4o-mini |
| **Workflows** (booking, email, CRM) | n8n |
| **Database** | Supabase |
| **Web dashboard** | Next.js |

Because all four providers bill per-minute (not per-seat), the pricing model is built around that reality - a base monthly fee with included usage, then per-minute overage above the cap. The docs walk through the exact cost-per-minute for both voice and chat so you can validate the margin math yourself.

---

## What's New in This Update

Since the last push, we've made significant UI/UX enhancements to elevate the landing page to client-facing quality:

### Integrations Section
A new section showing that Penny connects with the tools your clients already use. Three integration groups are displayed with official brand logos:
- **Google Workspace** - Sheets, Calendar, Gmail
- **Microsoft 365** - Teams, Outlook, SharePoint
- **DocuSign** - marked as a paid add-on

If a client uses tools we haven't listed, the page encourages them to talk to us about connecting their stack.

### Penny Dashboard Section
A new interactive dashboard mockup showing Penny's built-in CRM capabilities. The stat cards (calls handled, tours booked, overdue collected) now animate with a satisfying count-up effect when the section scrolls into view. The section also includes a live activity feed and mini chart, demonstrating the depth of reporting available.

### Micro-Interactions & Motion Design
Every section now has intentional, purposeful animations:
- Breathing ambient glows in the hero and final call-to-action
- Button hover effects with scale transitions
- Icon hover interactions with rotation
- Animated connecting lines in the "How It Works" steps
- FAQ items highlight with a copper accent when expanded

### "Talk to Us" Contact Form - Now Fully Connected
The "Talk to Us" form is now fully configured and operational:
- All enquiries are **logged to Supabase** for tracking and follow-up
- Users receive an **automatic confirmation email** acknowledging their enquiry
- The form captures name, email, phone, and message
- Source is tagged as `penny-contact-form` for easy filtering

### Code Quality
- All em-dash characters replaced with hyphens for consistent typography
- Full build and lint passing with zero errors and zero warnings
- Accessibility improvements including focus-visible rings and ARIA labels

---

## What's Coming Next

The current landing page is a strong foundation. In the next development session, we plan to continue refining the UI and adding additional elements - including further polish to the demo experience, additional sections, and refinements based on feedback. Nothing blocking - just flagging so you know the page will continue to evolve.

On the content side, the page has two video placeholder sections ready whenever footage is available:
- *"See Penny in action at a real facility"*
- *"Watch a live demo"*

We just need the video files to drop them in.

---

Let me know if you'd like a walkthrough of the demo or have questions on any of the pricing numbers. Happy to jump on a call.

Best,
Elijah
*(built together with Claude)*
