# ThelaRadar — 20-step roadmap

Updated: 2026-11-09. This is the canonical progress tracker. Completion means evidence exists, not simply that a feature was discussed. Record changes to scope and reasons rather than silently rewriting the original vision.

| Step | Milestone | Status | Evidence / exit condition |
| --- | --- | --- | --- |
| 1 | Preserve the original idea | Complete | [Original vision](vision/original-idea.md) and [name](vision/brand.md) |
| 2 | Define the improved product | Complete | [Product direction](vision/product-direction.md), proposed scope and open assumptions |
| 3 | Establish the GitHub workspace | In progress | Repository files prepared; finish [GitHub setup checklist](operations/github-workflow.md) |
| 4 | Research competitors and alternatives | Complete (desk research) | [Competitor research](research/competitors.md); local coverage and switching hypotheses require field validation |
| 5 | Choose pilot area and audience | In progress | [Vashi station area approved](research/pilot-area.md); exact walking boundary and recruitment access pending |
| 6 | Interview customers and vendors | Prepared; fieldwork pending | [Interview guide](research/interview-guide.md) and [note template](research/interview-notes-template.md); choose locality and conduct interviews |
| 7 | Define success and stop criteria | Draft prepared; freeze pending | [Pilot plan](validation/pilot-plan.md); choose locality, review interviews and freeze criteria before outcomes |
| 8 | Run a manual service experiment | Workflow prepared; pilot not run | [Manual workflow](validation/manual-pilot.md) and [record templates](validation/pilot-record-templates.md); Steps 5–7 fieldwork/freeze pending |
| 9 | Make the first investment decision | Review prepared; evidence pending | [Decision record](decisions/001-pilot-verdict.md); current assessment: insufficient evidence, no build verdict |
| 10 | Specify the first product | Provisional specification prepared | [MVP specification](product/mvp-spec.md); field evidence and implementation acceptance pending |
| 11 | Design trust, privacy and moderation | Draft policy prepared | [Trust policy](product/trust-and-moderation.md) and [20 edge-case checks](product/edge-cases.md); operator review, implementation and verification pending |
| 12 | Prototype and test the experience | Interactive prototype built; user testing pending | [Prototype and QA](design/prototype.md); consumer/vendor screens checked locally with fictional data |
| 13 | Choose architecture and estimate costs | Baseline prepared; provisioning and recovery checks pending | [Architecture decision and budget](architecture/pilot-architecture.md); stack, access boundaries, backup targets and Step 14 handoff |
| 14 | Build the consumer experience | In progress; fixture-backed | [Consumer implementation](product/consumer-implementation.md); real backend, directions and browser QA pending |
| 15 | Build vendor and administration tools | Local vendor controls in progress | Stock controls and local correction/review lifecycle checked; real ownership and admin permissions deferred |
| 16 | Verify the complete product | Local QA in progress | [Browser evidence and remaining checks](validation/local-qa.md); production verification deferred |
| 17 | Launch a controlled beta | Not launched; local usability plan prepared | [Local session plan](validation/local-usability.md); real backend and field validation remain prerequisites |
| 18 | Test revenue and repeatability | Not started | Actual payment evidence, service costs and adjacent-area experiment |
| 19 | Add the broader original features | Not started | Separate validated releases for community, markets, moving stops/tracking and utilities |
| 20 | Complete the product and prepare expansion | Not started | Sustainable operations, repeat users, credible economics; AI summaries only with adequate evidence |

## Completion rules

Each milestone should have linked issues, deliverables, verification and a short outcome report. Documentation status does not establish user demand. Later implementation depends on validation decisions; do not force progress past a stop/pivot outcome.

Step 19 covers multiple releases. Each capability needs its own scope, evidence and acceptance checks. Step 20 does not require an AI feature when source reviews are inadequate.

Commits and pushes are performed manually by the owner. Report local changes separately from committed/pushed changes.

## Review-driven next action — 9 November 2026

The owner supplied a persona review describing an older documentation-only snapshot. Treat its ratings as opinions, not user research. [Review response and seven-day field rehearsal](validation/review-to-fieldwork.md) converts its relevant maintenance-economics concern into a bounded experiment. Vashi station area is approved; walking boundary and owner-led recruitment are pending; no pilot has run. Existing four-week criteria are unchanged.

## Current next action — 10 November 2026

The menu editor is built and locally checked. More mock-data features will not answer the main open question: whether local vendors will keep availability current. The next evidence-producing step is the owner's Vashi station walk described in [the first-visit checklist](validation/vashi-first-visit.md). Confirm the walking boundary, approach vendors only when convenient, record refusals and objections anonymously, and do not publish any real listing without separately recorded consent. No interview or pilot is claimed yet. After the visit, bring back anonymized findings and decide whether the seven-day rehearsal is practical. Backend, user testing, real vendor identity and publication safeguards remain before any public beta.
