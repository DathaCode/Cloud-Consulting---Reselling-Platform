---
name: contact-form
description: How the VIN Cloud multi-step project request form works (Formspree, validation, drafts, URL prefill, honeypot, success flow) and how to test it without sending real submissions. Use when changing src/components/contact, the Contact section, or any "Discuss / Talk to us" call-to-action.
---

# Project request form

Files: `components/contact/RequestForm.jsx` (logic + steps), `components/contact/requestOptions.js` (options, endpoint, empty state),
`components/sections/Contact.jsx` (layout: WhatsApp/phone/email/location channels + form).

## Flow
1. **Your needs** — service cards (multi, ≥1 required) from `SERVICES` + Data Migration + Managed Cloud & Support; optional platforms.
2. **Project** — stage (required radio cards), optional timeline, details textarea (≥ 20 chars, max 2000, live counter).
3. **Contact** — name*, email*, company, phone/WhatsApp (required only if preferred method is WhatsApp/Phone), preferred method, consent*.
4. **Review** — every answer with Edit buttons → Send.
Success screen: reference `VIN-YYMMDD-XXXX`, next-steps timeline, "Follow up on WhatsApp" (prefilled with the reference), "Send another".
Error: answers kept, offers WhatsApp/email fallback.

**There is deliberately no budget/pricing question** (owner rule — pricing comes after requirement analysis).

## Behaviour details
- Draft autosave to `localStorage['vin-request-draft']`, wrapped in try/catch (private mode safe); "restored" banner with Start over; cleared on success.
- Prefill: `/?service=<SERVICES id>&platform=<PLATFORMS id>#contact` — read via `useLocation().search`. Use `Button href="/?service=cloud#contact"` (router Link → no reload).
- Honeypot `_gotcha` input off-screen; if filled the submit is silently dropped.
- Validation per step (`validateStep`), errors rendered with `role="alert"`, first invalid field focused.

## Formspree
- Endpoint: `VITE_FORMSPREE_ENDPOINT` or default `https://formspree.io/f/mppqanpv` (public by design — form IDs aren't secrets).
- POST JSON with `Accept: application/json`. Payload: `_subject` ("New project request <ref> — <services> (<name>)"), `reference, name, email`
  (Formspree uses it as reply-to), `company, phone, preferred_contact, services, platforms, stage, timeline, message, page`.
- Dashboard settings (owner): notifications to `info@vinsolutions.lk`; keep Formspree reCAPTCHA **off** (AJAX submits); optional "Restrict to Domain" = `cloud.vinsolutions.lk` (paid plans; blocks localhost tests).
- Free plan has a monthly submission cap — check the dashboard if submissions stop.

## Testing (never send real submissions without asking)
Use `ui-verification/scripts/form-flow.mjs`: it intercepts `formspree.io` with Puppeteer request interception, answers the
CORS preflight + POST with 200 and prints the JSON payload, and screenshots each step. Note: the mock must return
`Access-Control-Allow-Origin/Headers/Methods` or the browser blocks the request.
