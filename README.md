# ThelaRadar

Find local vendors and understand how recently their availability was confirmed.

ThelaRadar is an India-focused product concept for discovering food stalls, moving carts, visiting utility/service vendors and weekly markets. The original vision includes community contributions, menus, directions, vendor updates and evidence-based AI review summaries.

## Current status

A local interactive webpage prototype is available with fictional data. No real vendor/customer validation, production backend or live tracking is connected. The proposed first pilot covers recurring-location food vendors in one compact neighbourhood in Maharashtra; the city and neighbourhood are undecided.

Steps 1 and 2 are documented; Step 4 desk research is complete. Steps 5–9 have pending locality, fieldwork and decision requirements; Step 10 has a provisional specification. Step 11 has a draft trust policy; Step 12 has a clickable prototype with developer QA, pending real usability sessions. Step 3 remote GitHub setup still needs confirmation. See the [20-step tracker](docs/ROADMAP.md).

## Run the webpage prototype

With Node.js 24 installed, run `npm start` from this folder, then open http://127.0.0.1:5190. No install or API key is needed. Stop with Ctrl+C. Run `npm run check` and `npm test` for the included checks.

The prototype uses fictional vendors; directions and real accounts are not connected. Corrections and review decisions are saved only in this browser. See [prototype behaviour and QA](docs/design/prototype.md).

## Start here

- [Original idea](docs/vision/original-idea.md)
- [App name](docs/vision/brand.md)
- [Product direction and launch scope](docs/vision/product-direction.md)
- [Provisional MVP specification](docs/product/mvp-spec.md)
- [Pilot region and audience](docs/research/pilot-area.md)
- [Competitor research](docs/research/competitors.md)
- [Roadmap and progress](docs/ROADMAP.md)
- [Contribution and Git workflow](CONTRIBUTING.md)
- [GitHub setup checklist](docs/operations/github-workflow.md)

## Product principles

- Distinguish usual schedules from current availability evidence.
- Show source, recency and uncertainty; expire stale confirmations.
- Make vendor updates simple and location sharing voluntary.
- Measure successful visits, repeat use and information-maintenance effort.
- Preserve the full vision while validating each expansion.

## Repository layout

```text
.github/              Issue and pull-request templates
docs/vision/          Original idea, name and product direction
docs/operations/      Project and GitHub workflow
docs/ROADMAP.md       Milestones, evidence and progress
CONTRIBUTING.md       Contribution and manual Git instructions
```

`web/` contains the buildless prototype; `scripts/preview.mjs` is its local preview server. The proposed architecture is documented in Step 13; Supabase integration is deferred while local development continues. Name/domain/trademark availability and a software licence have not been established.

## Try the local demo with people

Follow the [short usability session plan](docs/validation/local-usability.md). See [QA evidence and limitations](docs/validation/local-qa.md) before treating the prototype as launch-ready.
