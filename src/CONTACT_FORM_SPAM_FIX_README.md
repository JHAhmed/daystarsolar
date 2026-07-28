# Contact Form Spam Fix

## What changed
Two files were updated to stop bot spam on the contact form:

1. `src/routes/contact/+page.svelte` — added a hidden honeypot field and reCAPTCHA v3 token generation.
2. `src/routes/api/send-contact-email/+server.js` — added:
   - Honeypot check (silently drops bot submissions)
   - Server-side validation (name/email/phone/message format — previously only validated client-side, which any bot posting directly to the API could skip entirely)
   - reCAPTCHA v3 verification against Google before sending the email / saving to Supabase

No new npm packages are required — reCAPTCHA verification uses a plain `fetch` call.

## What you need to do before deploying

1. Go to https://www.google.com/recaptcha/admin/create
2. Register a new site:
   - reCAPTCHA type: **v3**
   - Domain: `daystarsolar.co.in` (and your Vercel preview domain if you want it working there too)
3. You'll get two keys:
   - **Site key** → add as a Vercel environment variable named `PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret key** → add as a Vercel environment variable named `RECAPTCHA_SECRET_KEY`
4. Redeploy after adding the env vars.

## Notes
- If `RECAPTCHA_SECRET_KEY` isn't set yet, the API route skips reCAPTCHA verification (won't break the form) but the honeypot + validation checks still apply.
- The honeypot field is visually hidden off-screen (not `display:none`) since some bots skip fields hidden that way — real users will never see or interact with it.
- reCAPTCHA v3 score threshold is set to `0.5` (Google's suggested default) — can be tuned in `+server.js` if you see false positives/negatives.
- Consider also asking Vercel/Supabase about basic IP-based rate limiting later if spam persists after this — not included here since it needs a bit more infra decision-making, but the reCAPTCHA + honeypot combo should stop the vast majority of it.
