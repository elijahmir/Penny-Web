# 🚀 Penny Storage Demo — Progress Update

Hi Team,

Here's a summary of the latest progress on the Penny Demo Landing Page. We've hit several major milestones since the last update.

---

## 🌐 Live Site

The landing page is now live and accessible at:
**[https://penny.brooklynbradley.com](https://penny.brooklynbradley.com)**

---

## ✅ Completed

### 🎯 All 5 Demo Scenarios — Live & Fully Configured

All five outbound demo scenarios are now **completed, enabled, and ready for testing**. Each scenario has its own dedicated Retell AI outbound voice agent configured behind the scenes:

1. **Waitlist Callback** — A unit just opened up and Penny rings the next person on the waitlist
2. **Enquiry Callback** — Someone called while you were busy and Penny returns the call to qualify and book a tour
3. **Tour Booking** — A prospect wants to see the facility and Penny arranges the visit
4. **Move-in Welcome** — A new tenant just signed up and Penny welcomes them with gate codes and access info
5. **Overdue Payment** — A payment is a few days late and Penny gives a warm courtesy call with payment options

Each scenario includes a professional recording disclaimer at the start of the call, informing the user that the call is a demo and is being recorded for quality and training purposes.

---

### 🛡️ Demo Security — Strict Anti-Abuse Protections

We've implemented multiple layers of security to ensure the demo cannot be abused or exploited:

| Protection | What it does |
|---|---|
| **Cloudflare Turnstile CAPTCHA** | Every demo request requires passing an invisible bot check before any call can be placed. This blocks automated scripts, bots, and spam. |
| **Phone rate limit (1 per day)** | Each phone number can only receive one demo call within a 24-hour window. This is enforced at the database level and cannot be bypassed. |
| **IP rate limit (5 per hour)** | No single network address can trigger more than 5 demo requests per hour, preventing rapid-fire abuse from one location. |
| **Global daily cap (50 calls/day)** | There is a hard limit on total demo calls per day across all users. This protects us from unexpected surges and keeps costs predictable. |
| **International phone validation** | Phone numbers are validated against each country's official numbering rules. Only mobile and landline numbers are accepted — premium, toll, and VOIP numbers are blocked. |
| **Server-side input validation** | All submitted data (name, email, phone, scenario) is validated again on the server before anything is processed. Even if someone bypasses the form, the backend will reject bad data. |
| **Secrets fully protected** | All API keys, database credentials, and security tokens are stored in environment variables and excluded from the code repository. |

---

### 🎨 Visual & UI Updates

- **International phone support** — Users can now select their country from a searchable dropdown with flags and dial codes (70+ countries supported). We are no longer limited to Australian numbers only.
- **Email collection** — The demo form now collects user email addresses alongside name and phone.
- **Demo Terms & Conditions** — A professional, collapsible terms section is built into the form. Users must accept before they can proceed. Terms include recording disclosure, data handling, retention policy, and user rights.
- **Marketing consent** — An optional checkbox allows users to opt in to hearing from the Penny team. This is separated from the mandatory terms to stay compliant with privacy regulations.
- **"Talk to us" section** — The former "Get in Touch" section has been renamed and broadened to accept general enquiries, custom setup requests, data/privacy requests, and any other questions.
- **Various UI polish** — Updated hero section, refined animations, layout improvements across the page.

---

## ⏳ Waiting On

### 🎬 Video Content
The landing page has two video placeholder sections ready to go:
1. *"See Penny in action at a real facility"* — A walkthrough of Penny handling a storage enquiry
2. *"Watch a live demo"* — A real-time recording of Penny handling a waitlist call

**These are ready to receive the final video files as soon as they're available.** We just need the media to drop them in.

---

## 📋 Decision Needed

### 📧 "Talk to us" — Notification Email

The "Talk to us" contact form is fully functional. When a visitor submits an enquiry, the data is captured and sent to our automation system (n8n webhook) for processing.

**We need a decision from the team: which email address should receive these notifications?**

Options to consider:
- A shared team inbox (e.g. `team@...` or `hello@...`)
- Brooklyn's direct email
- A dedicated Penny inbox (e.g. `penny@brooklynbradley.com`)

Once confirmed, we'll connect the notification and the contact form will be fully end-to-end operational.

---

Let me know if you have any questions, want a walkthrough of the demo, or need any adjustments!

Best,
Elijah
