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
