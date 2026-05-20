# Penny — Landing Page Update (20 May 2026)

Hi Brad,

Follow-up from yesterday's push. We've improved the layout, fixed some visual bugs, and added a smart feature for the phone field.

---

## What Changed

### Layout Fixes — Feature Grid ("Built for the way a storage facility actually runs")
The bento-style feature grid had a layout bug where cards would occasionally misalign or leave gaps. We've rebuilt the grid logic so each card now sits in a fixed, predictable position. No more shifting or blank spaces on any screen size.

### Spacing & Breathing Room
The overall page felt too compressed — sections were stacking too tightly. We've increased the vertical spacing between all major sections so the page feels more spacious, premium, and easier to read.

### Smart Country Detection for the Phone Field
When someone opens the "Try Penny" form, the country dial code now auto-selects based on where they're browsing from:
- **On Vercel (production):** Uses IP-based geolocation — extremely accurate
- **Locally / elsewhere:** Falls back to the visitor's device timezone
- **Default:** Australia (Penny's home market)

This means an American visitor sees +1, a UK visitor sees +44, and a Kiwi sees +64 — automatically, no clicking through dropdown lists.

### Intro Animation — Session-Aware
The "Penny" splash intro now only plays once per browser session. If you refresh the page or navigate back, it skips straight to the content — no repeated animation on every load.

### Contact Form — Reliability Improvement
Fixed an internal code quality issue with how the contact form handles submissions. No visible change for users, but it's now more resilient and passes all modern code quality checks.

### Technical Health
- Full production build passing — zero errors
- All code quality checks passing — zero warnings
- Upgraded to the latest framework conventions (proxy routing)

---

## What's Next

Same as before — the two video placeholder sections are ready whenever footage is available:
- *"See Penny in action at a real facility"*
- *"Watch a live demo"*

We just need the video files to drop them in.

---

Let me know if you'd like a walkthrough or have any feedback.

Best,
Elijah
*(built together with Claude)*
