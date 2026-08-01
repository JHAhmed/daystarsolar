# Contact Form Spam Fix — README

## What changed
Only 2 files were touched — everything else in `src/` is untouched.

1. `src/routes/contact/+page.svelte`
   - Added a hidden honeypot field (`website`). Real visitors never see or fill it in;
     bots that auto-fill every field on the page will trip it.
   - Added the Cloudflare Turnstile CAPTCHA widget above the Submit button.
   - Form submission is blocked client-side until the CAPTCHA is completed.
   - The CAPTCHA token is sent to the API along with the rest of the form data,
     and the widget resets after every submit attempt.

2. `src/routes/api/send-contact-email/+server.js`
   - Added server-side validation (name length, email format, phone length,
     message length). Previously this endpoint had NO server-side validation —
     it only relied on the browser-side check in +page.svelte, which bots could
     (and did) bypass entirely by posting straight to the API.
   - Added a honeypot check: if the hidden `website` field is filled in, the
     request is silently accepted (fake success) and nothing is emailed or
     saved to Supabase.
   - Added Cloudflare Turnstile token verification via Cloudflare's
     `siteverify` endpoint. If verification fails, the submission is rejected
     before anything is sent or stored.
   - Added a basic in-memory rate limiter (5 submissions per IP per 10 minutes).
     Note: this resets on server restart/cold start — it's a best-effort extra
     layer, not a hard guarantee, since serverless functions don't share memory
     across instances.
   - Resend email-send errors are now surfaced/logged instead of being silently
     ignored.

## Root cause of the spam
The garbled name/message spam was coming from bots posting directly to
`/api/send-contact-email`, skipping the real contact form (and its client-side
validation) entirely. The API endpoint had no server-side checks, so it would
accept and forward anything.

## Setup required before the CAPTCHA is active

1. Go to the Cloudflare dashboard → Turnstile:
   https://dash.cloudflare.com/?to=/:account/turnstile
2. Add a site for `daystarsolar.co.in`. Cloudflare will give you:
   - a **Site Key** (public)
   - a **Secret Key** (private)
3. Add these as environment variables in your hosting dashboard (e.g. Vercel):
   ```
   PUBLIC_TURNSTILE_SITE_KEY=<site key>
   TURNSTILE_SECRET_KEY=<secret key>
   ```
4. Redeploy.

## Is it safe to deploy before adding the keys?
Yes. If the env vars aren't set yet, the CAPTCHA widget just won't render, and
the form falls back to the honeypot + server-side validation layer, which
already blocks the spam pattern seen so far. Full protection (including
against more targeted/scripted bots) is active once the keys are added.

## Testing checklist after deploy
- [ ] Submit the contact form once on the live site with real details.
- [ ] Confirm the email still arrives at `products@daystarsolar.co.in` /
      `info@daystarsolar.co.in`.
- [ ] Confirm the row is still inserted into the `contact_form` Supabase table.
- [ ] Once Turnstile keys are added, confirm the widget renders on the form
      and a submission without completing it is rejected.
