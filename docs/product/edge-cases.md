# ThelaRadar — Trust and edge-case acceptance matrix

Prepared: 2026-11-07. Planned checks only; none has been executed against an application. Relates to [MVP requirements](mvp-spec.md) and [trust policy](trust-and-moderation.md).

| ID | Scenario | Expected outcome | Verification approach |
| --- | --- | --- | --- |
| E01 | Usual opening time arrives without a confirmation | Remains unconfirmed | Set schedule with no active session; inspect list/profile |
| E02 | Time reaches confirmation expiry | Current claim ends at boundary, without vendor action | Check immediately before, at and after expiry |
| E03 | Vendor marks one item sold out | Other offerings/stall remain independently represented | Update one item; inspect profile/search |
| E04 | Vendor finishes and later edits menu | No session reopens | End session, edit menu, inspect status |
| E05 | New session starts after yesterday's sell-out | Item availability starts unknown unless freshly confirmed | Start a new session and inspect stock states |
| E06 | Session crosses midnight or today is an exception | Full timestamps and local date rules apply correctly | Test 23:30–00:30 and date-specific nonattendance |
| E07 | Vendor phone dies or update request fails | No invented fresh confirmation or false success | Fail request; retain timestamp; test expiry |
| E08 | Page is offline/hidden during a change | Stale view is historical/unverified; revalidate on return | Disconnect/hide, change session, return |
| E09 | Rival reports a vendor closed repeatedly | No automatic ownership/status override; abuse review | Submit repeated/conflicting reports and inspect privileges |
| E10 | Vendor and credible sighting disagree | Uncertainty shown or affected claim hidden pending review | Exercise moderator conflict workflow |
| E11 | Two vendors share a name | Separate identity until verified merge; no access transfer | Test duplicate review and appeal/reversal |
| E12 | Vendor finishes versus stops sharing | Finish retains permitted usual details; stop sharing hides precise location/directions | Test both controls across list/profile/direct API/favourites |
| E13 | Removed vendor opened from old shared link | Location-free unavailable response, no data leak | Check direct URL/API, search and cached-view refresh |
| E14 | Public coordinates differ from private account address | Only permitted selling location used | Inspect profile, directions and payloads |
| E15 | Visitor or vendor attempts cross-account/admin mutation | Rejected server-side; private data not returned | Direct request attempts, not only button visibility |
| E16 | Coordinates/price/times/text are invalid or malicious | Bounded validation, safe rendering, no partial unauthorised write | Invalid inputs and script-like text submissions |
| E17 | Consumer declines location permission or storage fails | Manual area selection works; favourite failure is explicit | Permission denial and blocked storage |
| E18 | Photo/report contains private data | Restricted review and removal; no automatic public display | Submit sample synthetic private content to moderation flow |
| E19 | Backup restores previously withdrawn vendor | Deletion/unpublishing reapplied before serving traffic | Controlled restore drill using synthetic data |
| E20 | Moderator unavailable during a serious incident | Affected claim/listing paused; no false support promise | Run operator drill against documented coverage hours |

## Execution record — complete in Step 16

For each check record build/version, environment, synthetic fixtures, procedure, expected versus actual result, pass/fail, evidence and linked defect. Use Passed only after observation. Field audits measure real availability separately; automated checks cannot prove vendor attendance.

Any failed location privacy, authorisation or current-status expiry check blocks live release. Record lesser known limitations explicitly and evaluate impact rather than silently waiving requirements.
