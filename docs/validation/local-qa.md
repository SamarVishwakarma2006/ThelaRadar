# Local QA evidence — 8 November 2026

Scope: browser-local demo, not production acceptance or customer validation.

## Report lifecycle: passed

- Opened the poha sample profile from its direct URL.
- Saved a Menu or price correction with explicitly labelled QA sample text.
- Repeated the exact pending report; duplicate was rejected without creating another entry.
- Opened /review; the report appeared under the correct vendor and category.
- Marked reviewed and reloaded; reviewed state persisted.
- Reopened, dismissed and reloaded; dismissed state persisted.
- Browser warning/error log returned no entries during this workflow.

One labelled QA report remains dismissed in the test browser. No real vendor information was changed, and no report was transmitted outside browser storage.

## Remaining checks

- Storage blocked/full/corrupted: report creation and decisions must fail honestly without losing existing records.
- Offline and request timeout/retry behaviour; expired evidence on resumed tabs.
- Multi-tab changes: current local snapshots may overwrite each other; resolve before claiming reliable concurrent editing.
- Login/register successful validation and mismatch handling; demo CAPTCHA is not production security.
- Hero image content, licences, crop and network-failure checks.
- Keyboard focus, screen reader labels and narrow mobile layouts for the full reporting journey.
- Supabase authentication, permission isolation, migrations, server CAPTCHA, backup/restore and real-world pilot remain deferred.

Step 16 has begun with local checks only. No beta/public-launch readiness is claimed.

## Stale-tab handling — 9 November 2026

Vendor saves now compare the stored snapshot before writing and reject stale updates with reload guidance. Storage events refresh idle vendor/profile and review views. This reduces stale overwrite risk but localStorage offers no atomic compare-and-swap: simultaneous writes remain a limitation. Use one editing tab until backend transactions are available. Browser two-tab verification is pending; syntax and existing tests are run separately.

## Two-tab browser verification — 9 November 2026

Preview was stopped; restarted it and verified HTTP 200. Opened two vendor tabs. Changed the second menu item in tab A; tab B immediately showed sold out. Reloaded tab B; sold-out state persisted. Restored availability in tab B; tab A reflected the restoration. Original item availability was restored. This verifies storage-event synchronisation and reload persistence, not simultaneous-write atomicity or stale-write rejection. Request-failure/retry checks remain pending.

## Failed request and retry — 9 November 2026

Added opt-in THELARADAR_FAIL_ONCE=1 to the local preview server: only its first GET /api/demo/vendors returns 503; later requests work normally. Default startup is unchanged. Browser showed the load error and Retry button, no cards and no misleading empty-results state. Clicking Retry recovered five visible vendors (one previously withdrawn sample remained hidden), removed the error and preserved saved state. Reload also succeeded. The one-shot failure is consumed; preview now serves normally. Syntax checks passed. Timeout and blocked-storage checks remain separate outstanding cases.

To reproduce: stop the preview, set THELARADAR_FAIL_ONCE=1 for the server process, start it, then open /discover and click Retry. Do not set this flag for routine use.

## Slow request and storage faults — 9 November 2026

Added opt-in THELARADAR_DELAY_ONCE=1 (first demo GET waits 12 seconds). Browser showed loading, then the error state, and Retry recovered five visible listings while retaining the withdrawn sample. Initial visibility wait timed out before the error was observed; no precise wall-clock timeout guarantee is claimed for background tabs. One-shot delay is consumed and subsequent requests serve normally.

Added three Node fault-injection tests against the shipped persistDemo function: denied storage reads, failed writes and stale snapshots return false without advancing the snapshot or overwriting newer data. All five tests and syntax checks pass. These are storage-function tests, not browser-wide quota tests or simultaneous-write guarantees.
