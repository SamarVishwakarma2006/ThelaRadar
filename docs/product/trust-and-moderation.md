# ThelaRadar — Trust, privacy and moderation design

Prepared: 2026-11-07
Status: Step 11 draft product policy; not implemented or verified. Operational feasibility and retention settings require review before accepting real participants. This is not a claim of legal compliance.

Related: [MVP specification](mvp-spec.md), [edge-case checks](edge-cases.md), [manual pilot](../validation/manual-pilot.md).

## Availability policy

Proposed first-pilot setting: a vendor confirmation lasts no longer than 120 minutes and never beyond its declared session end. This value remains provisional until the pilot plan is frozen. Only a fresh explicit confirmation renews it; editing a menu or profile does not.

Use authoritative application time, store full dated timestamps and display India time. At the exact expiry boundary, a session is unconfirmed. Date exceptions apply to the relevant local calendar date. Usual schedules never become current confirmations automatically. An absent update is not proof of closure.

Keep three separate facts: usual schedule, current serving evidence and item availability. Sell-out of one item must not close the stall. A stall-level sell-out or finish ends the serving claim. Stock resets to unknown at a new session unless the vendor confirms it; do not carry yesterday's item availability forward as current evidence.

Keep current selling location separate from account address and device position. The initial product does not follow a phone automatically. A new selling location requires explicit confirmation, validation and permission to publish.

On a visible connected screen, refresh status at least once per minute; reload on page focus/return. Use expiry timestamps to downgrade an expiring claim without waiting for a refresh. If refresh fails, display 'Last checked at [time]; current status unverified', remove current-serving presentation and retain historical evidence only. Hidden/offline pages must revalidate on return before presenting a current claim. The precise delivery/cache mechanism belongs to Step 13; verify these behaviours before launch.

## Identity and permissions

| Actor | Permitted | Never permitted by default |
| --- | --- | --- |
| Visitor | Browse public cards; save local favourites; submit bounded corrections | Edit vendor details, access private records or approve ownership |
| Authenticated vendor | Update their approved profile and selling sessions; request removal | Edit another vendor, grant themselves admin access or approve their own ownership transfer |
| Moderator/admin | Review claims/reports, hide disputed data, resolve appeals and record reasons | Publish private contact/consent records or silently rewrite history |

Validate permissions on every protected operation. Ownership claims stay pending until independently reviewed. Check practical business-control evidence and existing-owner conflicts; a phone number or matching name alone is insufficient. Do not collect government ID documents by default. The review process must have a named operator before launch.

Do not merge profiles solely because names match. Confirm identity/location with affected operators. A merger does not automatically transfer ownership. Preserve an audit record and a correction path if the merge is wrong.

## Reports, disputes and appeals

1. Accept a category, relevant vendor and bounded explanation; photos are optional and permissioned. Do not require reporters to post public personal details.
2. Validate and throttle submissions; repeated reports are not independent evidence. Configure limits in Step 13 and test in Step 16.
3. Record received time and show a receipt or honest failure. A report does not grant edit rights or automatically mark a vendor closed.
4. For credible conflicts about serving/location, flag uncertainty while investigating. For exposed private information, hide the affected material pending review.
5. Moderator reviews the source, dates and available evidence; records the action and reason; gives affected vendors a response/appeal route.
6. Close with corrected, unchanged with reason, duplicate, abusive or insufficient evidence. Repeated abuse may restrict submitting privileges without punishing good-faith mistakes automatically.

The founder is the provisional operator only after explicitly accepting the role and publishing staffed review hours/contact. No 24/7 moderation or response-time promise is made. If urgent removal/correction cannot be handled during a pilot window, pause the affected current-location claim or listing rather than leaving a misleading assurance.

Public star reviews and AI summaries are outside the initial scope. Reports of food safety concerns are not medical findings; do not publish allegations as verified facts or imply that profile checks certify hygiene.

## Location visibility and withdrawal

Distinguish 'Finish selling' from 'Stop location sharing'. Finish ends the current serving session but retains the separately permitted usual business location and schedule. Stop sharing hides coordinates, precise landmark and directions, ends sessions and prevents public sightings from restoring them. Show a neutral unavailable card, without a location, until the operator chooses to republish.

A removal request hides the whole listing from search and resolves saved/shared profile URLs to a location-free unavailable state. Apply public visibility checks server-side, including direct IDs and APIs. Favourites may retain a non-sensitive reference but cannot expose withdrawn coordinates. Minimise public caching and invalidate changed records; record residual exposure where third-party caches or screenshots cannot be recalled. Never promise erasure from someone else's saved copy.

Verify control proportionately before destructive account deletion. A credible urgent privacy report can justify temporary hiding while identity is checked. Account deletion, public unpublishing and ending a session are separate actions and must be labelled distinctly.

## Data boundaries and provisional retention

Manual area selection is always available. Optional consumer location is used for the current search; do not retain exact coordinates in analytics or log navigation URLs containing them. Explain that opening external directions sends the chosen destination to that provider. No off-duty vendor tracking or public route history.

| Data | Access and proposed lifecycle |
| --- | --- |
| Public business details | Publish only agreed fields while listing participation remains active; hide promptly on withdrawal |
| Contact/consent records | Restricted operational storage outside Git; document necessary purpose and deletion date before collection |
| Individual pilot follow-up notes | Restricted; remove or genuinely anonymise within 30 days after final pilot review |
| Reports and audit events | Restricted; proposed maximum 90 days after closure unless a documented unresolved dispute requires a narrow extension |
| Local favourites | Browser-local vendor reference only; user can remove; no cross-device sync claim |
| Backups | Proposed rolling maximum 30 days; restored data must reapply deletions/unpublishing before service resumes |

These are product defaults to review, not statutory retention periods. A named operator must own deletion, extensions and restore checks before launch. Restrict access, keep credentials out of Git and avoid unnecessary identifiers in request/error logs. Aggregate outcomes only after reviewing re-identification risks; anonymised is not equivalent to merely removing names.

## Release blockers and open items

No live launch until ownership review, moderation contact/hours, visibility controls, deletion/backup lifecycle, access enforcement and expiry/offline behaviour are implemented and checked. Resolve provider-specific retention/logging in Step 13. Validate operator workload and the expiry setting through fieldwork. Record any future live-tracking or review/AI design as a separate scope decision.
