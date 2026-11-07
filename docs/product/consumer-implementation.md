# Step 14 — Consumer implementation

2026-11-07. In progress; fixture-backed implementation, not a production release.

Implemented: searchable/filterable discovery, browser-local favourites, menus and expiry labels, bookmarkable #vendor/ID profiles, unavailable/withdrawn profile handling, offline notice, freshness refresh on return to tab, disabled directions for fictional locations, remote-photo failure fallback and no-JavaScript explanation.

Navigation supports direct links and browser back/forward. Profile dismissal returns the URL to discovery without creating another history entry. Existing sample dashboard remains non-authenticated and local only.

Remaining: provision the Step 13 backend, implement real data loading/error/retry states and validation, permitted coordinates/directions, factual-report intake, verify photo content/licenses/crops, browser QA and user testing. No real vendor addresses or accounts have been invented. Do not mark Step 14 complete until production data contracts and acceptance checks pass.

Verification: JavaScript syntax and existing availability/filter tests; browser navigation/offline/photo-failure checks still pending.
