# Launch readiness — ThelaRadar

Updated 10 November 2026. This checklist separates a locally working prototype from a service that can accept real vendor or customer data.

## Current state

The local prototype has fictional Nerul sample vendors, discovery filters, saved places, vendor profile/menu/session editors, and browser-local community suggestions and sightings. Changes do not sync between users. Login/register and the arithmetic CAPTCHA only demonstrate form behavior; they create no accounts and provide no abuse protection. The current dashboard is not a secure vendor portal or moderator console. Google research links are leads, not verified live locations. No customer/vendor interviews, pilot, or public beta have happened.

## Do next, in order

1. **Owner: Vashi field visit.** Use [the first-visit checklist](vashi-first-visit.md) to confirm the walkable boundary and speak with up to five vendors and five prospective users. Do not ask for private details in shared notes. Record only anonymized findings and refusals.
2. **Owner + Codex: decide from evidence.** Bring the interview notes back without names or contact details. Decide whether to run the seven-day manual rehearsal, revise the product, or stop. Freeze the larger pilot success and stop criteria before the experiment.
3. **Owner: choose whether to provision Supabase.** The user previously deferred it. When ready, provide project URL and public anon key through the intended local configuration route; never put the service-role key in browser code or Git.
4. **Codex: implement and verify backend.** Add real accounts, shared suggestions, vendor-owned profiles, moderation roles, session expiry, rate limits and privacy/withdrawal controls. Apply and test reviewed migrations and access policies before using real data.
5. **Owner + Codex: Google Maps setup.** Choose Maps Platform APIs and budget limits, create/restrict the key in the owner’s Google Cloud account, then implement directions and map display. Keep keys out of Git and restrict them by API and allowed website.
6. **Codex: complete release QA.** Test consumer and vendor tasks on mobile, account recovery, permissions, report abuse, stale sightings, backups/restore, keyboard and screen-reader flows, and production failure handling. Run usability sessions with consenting participants.
7. **Owner: decide whether to launch a controlled beta.** Proceed only after the pilot evidence supports it, data/privacy terms are ready, real vendors have publication consent, and incident/withdrawal support is staffed. Publish and invite people only after the owner chooses a hosting account and approves the release.

## Already done locally

- Interactive UI and local preview with fictional fixtures.
- Vendor profile, schedule, item name, price, stock, attendance and location-sharing demo controls.
- Browser-local public-place suggestions and unverified sightings, with duplicate and recent-report safeguards.
- Local correction queue and review demo.
- Node syntax checks and 12 automated tests pass as of this date.
- Detailed fieldwork, consent, pilot, and Git workflow documents are already in the repository.

## Owner-only actions

The assistant cannot physically visit Vashi, recruit people, obtain consent, create or verify the owner’s Google Cloud/Supabase/GitHub settings, or report real pilot outcomes. The owner controls manual Git commits/pushes. Do not put participant names, phone numbers, precise private locations, credentials, or API secrets in Git or chat.
