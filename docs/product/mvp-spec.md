# ThelaRadar — Provisional MVP specification

Prepared: 2026-11-07
Version: 0.1 — draft
Roadmap: Step 10 specification prepared; field validation and build decision pending.

## Outcome and boundary

Help someone find a relevant nearby food vendor and understand how recently its availability was confirmed before deciding to visit.

First software scope: a mobile-friendly website for recurring-location food vendors in one selected Maharashtra neighbourhood. Manual area selection must work without location permission. No statewide coverage claim. The exact locality, interviews, frozen pilot criteria and Step 9 investment review remain open. This document specifies proposed behaviour; it does not claim implementation or market validation.

References: [product direction](../vision/product-direction.md), [pilot area](../research/pilot-area.md), [pilot criteria](../validation/pilot-plan.md), [investment review](../decisions/001-pilot-verdict.md).

## Users and journeys

- Consumer: choose supported area, search for an item/category/vendor, inspect offerings and evidence, open directions, optionally save a favourite or report an error.
- Vendor: establish ownership, edit permitted business information, start a selling session, mark item/stall availability, finish or withdraw sharing.
- Administrator: review ownership and listings, investigate duplicates/corrections, resolve conflicts and removal requests, inspect update history.

Browsing is public. Ownership-changing actions require authentication and authorisation. The mechanism is deferred to Step 13; a public vendor ID or phone number alone must not grant edit access.

## Launch requirements and acceptance criteria

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| C01 | Area selection | Supported pilot area is clearly named; manual selection works when location is denied/unavailable; unsupported areas show an honest no-coverage state, not unrelated results |
| C02 | Discovery and search | Search matches vendor names, known item names and categories in the selected area; results distinguish unknown status; no results offers clear/reset filters; empty/loading/error states are distinct |
| C03 | Vendor profile | Stable profile shows public name, selling landmark, permitted photo if available, dated menu/prices, usual hours and current evidence separately; missing values remain unknown |
| C04 | Price information | Prices use INR and an update date; item price is not presented as the entire menu's minimum unless supported; an unavailable/unknown price cannot satisfy an exact price filter |
| C05 | Availability evidence | Results and profiles agree on source, confirmation time and expiry; usual hours never create a confirmed-serving badge; expired sessions become unconfirmed without requiring a vendor action |
| C06 | Practical directions | Navigation opens the permitted selling coordinates/landmark, not a private home or account address; missing location disables directions with an explanation; distance is labelled approximate when straight-line, with no invented walking ETA |
| C07 | Favourites | Save/remove persists in the same browser where storage is allowed; blocked storage yields an honest failure; removing clears the saved entry; no cross-device sync promise; removed vendor does not retain a usable live-location link |
| C08 | Corrections and feedback | Anyone browsing can submit bounded factual reports without gaining edit access; show receipt or failure; reports are not automatically treated as verified facts; optional visit feedback distinguishes purchase success, item failure and unknown |
| V01 | Profile creation/claim | New entries and ownership claims require review before publishing/transfer; duplicates are checked; a claimant cannot edit another vendor while pending |
| V02 | Business edits | Authorised vendor can edit their own profile/menu/schedule; validation rejects invalid prices/coordinates/times; historical confirmation time is not refreshed by an unrelated edit |
| V03 | Selling session | Authorised vendor starts a session at the permitted selling location and declares an end; time comes from authoritative application logic; expiry is earlier of session end and configured freshness limit |
| V04 | Stock and session end | Item sold-out differs from stall finished; ending a session removes confirmed serving immediately; reopening requires a fresh explicit confirmation; failed submissions never display success |
| V05 | Exceptions and sharing | Vendor can mark today as not attending and stop active sharing; usual hours remain expectations; ordinary user reports cannot republish withdrawn location; confirm the safe public fallback in Step 11 |
| A01 | Admin review | Authorised admin can approve/reject claims, handle reports and hide disputed listings; record actor, time and reason; appeal path exists; admin functions are inaccessible to consumers/vendors |
| A02 | History and conflicts | Keep restricted change history for investigation; conflicting evidence is flagged rather than blindly using latest submission; merges preserve the correct identity and do not transfer ownership accidentally |
| O01 | Measurement | Count search/profile/direction/favourite/report events separately where appropriate; distinguish voluntary reported visits from clicks; no continuous consumer tracking; collect only necessary data |

C07 proposes browser-local favourites to keep the first version small. Notifications, account-synced favourites and sophisticated personalised ranking are deferred. Sorting should be explained, deterministic for equal inputs and avoid presenting paid placement as quality; exact default order is decided during design.

## Availability behaviour

- No active, unexpired evidence: unconfirmed, with usual schedule shown separately.
- Valid vendor-confirmed session: show serving claim, source/time and expiry. This does not guarantee stock or safety.
- Item sold out: label that item; do not end other offerings automatically.
- Stall sold out/finished: end current serving claim.
- Session expiry: unconfirmed, not inferred closed.
- Not attending today: show the dated exception; do not carry it into later days automatically.
- Conflicting customer report: retain provenance for review; do not silently override the vendor or ignore credible uncertainty.

The manual pilot proposes a two-hour freshness ceiling. This is not frozen or validated; Step 11 and the pilot must settle the rule before release. The implementation must support a clearly defined policy and treat its boundary consistently. Sessions crossing midnight use full dates and India time, not time-of-day comparisons alone. Shared/cached views must not keep expired evidence labelled current.

Broad community sightings, announced stops and live moving-vendor maps are future releases. The first version accepts correction reports with moderation rather than promising unrestricted public edits.

## Information model — conceptual, not a database choice

- Vendor: stable identity, publication/ownership state, public business details and permissioned selling location.
- Offering: vendor, item/category, price if known, availability and update date.
- Schedule and exception: usual sessions plus date-specific changes.
- Selling session: vendor, selling location, source, confirmed/start/end/expiry timestamps and state.
- Ownership claim/report: submitter permissions, evidence, moderation state and outcome.
- Restricted audit event: actor, action, timestamp and reason.
- Favourite: local browser reference to a vendor, without private identity.

Separate public fields from private account, consent and administrative records. Data retention, removal semantics and abuse controls are specified in Step 11. Phone location alone must not automatically move a selling location.

## Quality and release checks

- Verify mobile layouts, readable controls, labelled inputs, keyboard access and non-colour status cues.
- Handle slow/offline requests with honest errors and retry paths; do not present cached availability as fresh.
- Treat user-entered text as untrusted; validate inputs and enforce permissions on the server, not only by hiding buttons.
- Test cross-vendor edit attempts, unauthorised admin access, expired-session rendering, price unknowns, duplicate reports, sold-out handling, withdrawal and failed updates.
- Confirm removal and correction flows with operators; document backup/recovery before live data is accepted.
- Set device/network and performance budgets in Step 13; no unmeasured performance claims.
- Record test evidence and unresolved release blockers in Step 16. Templates and acceptance criteria are not passing test results.

## Explicitly deferred

Moving-cart continuous tracking and ETA, weekly-market workflows, utility/service categories, public star reviews and AI summaries, chat, delivery, ordering/payments, paid ranking, cross-device favourites, automatic arrival notifications and expansion beyond the pilot. All remain possible later work under the original vision, not launch commitments.

## Open decisions and readiness

- [ ] Locality, participants, language needs and real interview findings established.
- [ ] Pilot results reviewed and next investment chosen, or explicit bounded prototype decision recorded.
- [ ] Availability expiry, sharing/removal, retention and moderation rules resolved in Step 11.
- [ ] Screens tested in Step 12; stack, authentication, hosting and cost limits chosen in Step 13.
- [ ] Requirements revised with field evidence and accepted for implementation.

Next: Step 11 — resolve trust, privacy and moderation behaviour against concrete edge cases. This draft can guide that work while fieldwork remains pending.
