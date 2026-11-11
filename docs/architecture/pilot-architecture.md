# Step 13 — Pilot architecture and costs

Prepared 2026-11-07. Proposed implementation baseline; no infrastructure provisioned or subscriptions purchased. Field validation and user testing remain pending.

## Decision

Keep the existing HTML/CSS/JavaScript frontend. Use Cloudflare Pages for static hosting and Supabase for Postgres, authentication and permitted photo storage. Add server functions only for privileged operations and anonymous report intake. Avoid a frontend framework migration, live tracking, realtime subscriptions and embedded maps for the pilot. Use external Google Maps directions links to consented selling coordinates.

The present Node preview server remains development-only. Step 14 builds the consumer experience against explicit data contracts; production credentials and deployment follow separately.

## Data and access

- areas: supported locality and publication flag.
- vendors: public name, landmark, approved selling coordinates, publication state; private owner/contact/consent in separate restricted records.
- offerings: vendor ID, item, category, nullable INR price, sold-out state and updated timestamp.
- schedules/exceptions: usual hours and dated deviations, interpreted in Asia/Kolkata.
- sessions: vendor ID, confirmed_at, ends_at, expires_at, ended_at and sharing state. Store UTC timestamps; server controls confirmation and expiry.
- ownership_claims, reports and audit_events: restricted records, actor/time/reason and review outcome.

Foreign keys preserve vendor identity; prices cannot be negative; expiry cannot exceed declared end or configured freshness ceiling. Start with the provisional two-hour ceiling, visibly marked pending field validation. Never infer serving from a schedule.

Public reads expose approved, non-withdrawn fields only. Enable row-level security before exposing any table. Authenticated vendor updates require an approved ownership relationship; admin roles are assigned through privileged server operations, never client-editable metadata. Service credentials never enter frontend files or Git. Public API keys confer no authority without tested policies. Anonymous reports use bounded server validation, rate limiting and moderation; direct anonymous table inserts are denied.

Use Supabase email sign-in for initial recruited vendors and MFA for administrators; validate email usability in interviews before freezing this choice. Phone/SMS sign-in is deferred until demand and delivery costs are established. Consumers browse without accounts; favourites remain browser-local.

## Freshness, privacy and failure

Read availability from authoritative server timestamps. At expiry the UI downgrades to unconfirmed; refetch on resume and show offline/stale context on failure. Stop sharing removes public selling coordinates and current sessions immediately; do not cache private or withdrawn coordinates. Saved vendors resolve current visibility on each load. Mutations confirm success only after server acknowledgement. Restricted audit events record ownership/moderation changes atomically.

Do not collect continuous consumer or vendor location. Honour Step 11 retention/removal policy; backups have documented expiry and restored deletions must be reapplied before serving traffic.

## Cost scenarios (USD, planning estimates)

| Scenario | Monthly platform allowance | Assumptions |
| --- | --- | --- |
| Local prototype | $0 | Existing computer; no hosted service |
| Development sandbox | $0 within free allowances | Synthetic data; no production recovery promise |
| Small controlled beta | $25 base; budget $35–50 | One Supabase Pro project, static hosting within free allowances; contingency for email/storage/traffic |

Supabase Pro starts at $25/month; extra projects, usage, tax and add-ons can increase this. Cloudflare Workers Paid starts at $5/month if functions require that plan; not included as a mandatory purchase. Domain renewal, SMS, field recruitment, moderation labour and support are excluded. No INR conversion or user-count-to-cost guarantee is implied. Check actual quotas before launch, set alerts at 50/80/100% of the budget and review usage weekly. Alerts are not a hard spending cap.

Official sources checked 2026-11-07: [Supabase pricing](https://supabase.com/pricing), [Cloudflare pricing](https://developers.cloudflare.com/workers/platform/pricing/), [Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

## Backup and ownership

Samar owns the provider accounts and repository. Store secrets in provider environment settings; document access and recovery contacts privately. SQL migrations and deployment instructions live in Git; private records do not.

Pro provides seven days of daily database backups. Free-tier development requires manual exports. Database backups do not replace a separate object-storage backup plan: export permitted photo objects and manifest to encrypted owner-controlled storage. Before beta, implement daily independent database/object exports, 30-day rolling retention, a restore rehearsal into an isolated project and deletion reapplication. Targets: at most 24 hours of data loss, recovery within one working day; these are targets until measured. Source: [Supabase backups](https://supabase.com/docs/guides/platform/backups).

## Acceptance gates and next work

Step 14: retain hero, verify all stock images/crops and license sources, introduce vendor data loading with separate loading/error/empty states, profile routes and permissioned directions. Current remote photo loading/crops remain unverified and must not be treated as completed QA.

Step 15: ownership, vendor writes and moderation. Prove cross-vendor denial, admin denial, expired sessions, stopped sharing and failed writes. No real vendor data until policy tests pass.

Step 16: restore rehearsal, accessibility, slow-network/mobile checks and budget alarms. Proposed budgets: initial compressed page/assets under 1 MB, hero images under 150 KB each, LCP under 2.5 seconds on a defined mid-range mobile/4G test profile. Record measurements rather than claiming they already pass.

Deployment, auth usability, pilot locality, provider-region choice and retention review remain launch gates. Architecture preparation does not establish demand or complete Steps 5–12 fieldwork.
