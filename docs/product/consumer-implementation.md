# Step 14 — Consumer implementation

2026-11-07. In progress; fixture-backed implementation, not a production release.

Implemented: searchable/filterable discovery, browser-local favourites, menus and expiry labels, bookmarkable #vendor/ID profiles, unavailable/withdrawn profile handling, offline notice, freshness refresh on return to tab, disabled directions for fictional locations, remote-photo failure fallback and no-JavaScript explanation.

Navigation supports direct links and browser back/forward. Profile dismissal returns the URL to discovery without creating another history entry. Existing sample dashboard remains non-authenticated and local only.

Remaining: provision the Step 13 backend, implement real data loading/error/retry states and validation, permitted coordinates/directions, factual-report intake, verify photo content/licenses/crops, browser QA and user testing. No real vendor addresses or accounts have been invented. Do not mark Step 14 complete until production data contracts and acceptance checks pass.

Verification: JavaScript syntax and existing availability/filter tests; browser navigation/offline/photo-failure checks still pending.

Consumer loading update: the local server now serves GET /api/demo/vendors with explicit demo provenance and no caching. Discovery shows distinct loading/failure/retry states, enforces a 10-second timeout and rejects unexpected fixture payloads. Direct profile routes wait for loading. No production API or persistence is implied. Static-only hosting will need a replacement data endpoint.
## Browser verification — 7 November 2026

Verified in the local browser: six vendors loaded from the demo endpoint; searching poha returned one result; the poha profile opened at #vendor/poha and reopened after reload; directions remained disabled; Panvel showed the unsupported-area message; resetting restored six listings. No browser console errors were captured during these checks. Retry/offline paths and photographic content/license checks remain pending.

## Backend connection prerequisite

No Supabase connector or local project configuration was available during this check. Before real backend integration, identify an owner-controlled development Supabase project. Supply its project URL and publishable key through an ignored local .env file, not a committed file. Never supply a service-role key to frontend code. Database migrations and permission tests must be prepared and applied before real vendor data is accepted. The demo endpoint is not a production backend.

Database foundation update: draft transactional migration prepared under supabase/migrations with areas, vendors, offerings and selling sessions. Includes integrity constraints, indexes, RLS and revoked client permissions. Not executed or connected; no read policies or vendor writes enabled. See supabase/README.md for setup and required database checks.

Foundation verification update: added rollback-only SQL constraint and effective-role-privilege checks. Not executed: neither a connected development database nor psql/Supabase CLI/Docker on PATH was available. Hosted integration still requires an owner-controlled development project.

## Local-first persistence

Supabase deferred at owner request. Demo status, sold-out flags and original expiry timestamps persist in browser localStorage across reloads and server restarts. UI updates roll back if saving fails. Stored text is not trusted: only validated status/timestamps/stock are restored over known fixtures. Reset replaces saved demo state. Clearing site storage removes changes; other browsers do not share them. No real authentication or database is implied. Browser persistence QA remains pending.

Local vendor tools: each menu item now has an independent sold-out/restore control. Browser QA marked the second vada-pav vendor item sold out, reloaded, confirmed it remained sold out, then restored it. Syntax and both existing behavioural tests passed. This verifies item persistence, not authentication, cross-device sync or production permissions.

## Local corrections and review — 8 November 2026

Vendor profiles save bounded correction notes to browser storage; duplicate pending notes are rejected. Footer Local review demo lists notes and supports reviewed/dismissed/reopen states. Reviews never modify listings. Queue limited to 100 records, with explicit failure feedback and no overwrite on malformed storage. No authentication, network submission or production moderation is implied. Clearing browser storage removes reports. Browser QA pending.

## Separate pages and account previews — 8 November 2026

Added /discover, /saved, /vendors and /review routes using the shared application shell, plus standalone /login and /register screens inspired by the supplied split-layout reference. Authentication forms include email, password visibility, registration password confirmation and a regenerating accessible arithmetic challenge. The challenge is explicitly a demo, not a security boundary. Form submission performs local validation only, clears passwords and never stores/transmits credentials or creates a session. Supabase authentication and server-verified CAPTCHA remain deferred. Vendor/review routes are public local demos, not protected admin pages.

Syntax checks, existing tests and route HTTP checks pass. Visual/mobile and full form browser verification remain pending.

## Separate-page browser checks — 8 November 2026

Desktop and 390px mobile account layouts inspected. Empty registration submission triggers required-email validation; Show switches password input visibility. Register-to-login and account-free discovery navigation work. Vendor and review routes load. Fixed standalone tool panels appearing after the footer and restored the mobile account link; verified panel inside main, login link visible and no horizontal overflow at 390px. Added distinct document titles and auth.js to syntax checks. CAPTCHA completion, successful form submission and report-to-review lifecycle remain unverified. Existing tests and syntax checks pass.
