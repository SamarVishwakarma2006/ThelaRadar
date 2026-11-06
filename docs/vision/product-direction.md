# ThelaRadar — Product direction

Recorded: 2026-11-06
Status: Step 2 of 20 complete — proposed direction documented, pending field validation.

## Product promise

Help people find the nearby vendor or item they want and understand how recently its availability was confirmed.

ThelaRadar turns local knowledge into actionable information: what is sold, where to find it, usual timings, current confirmation and how to reach the selling location.

The long-term vision includes food stalls, moving carts, visiting utility/service vendors, weekly markets, community discovery and evidence-based AI review summaries. See [the original idea](original-idea.md) and [the selected app name](brand.md). Launch sequencing does not remove these ambitions.

## Initial audience and value

| Audience | Job to accomplish | Proposed value |
| --- | --- | --- |
| Students, PG residents and recently relocated workers | Find affordable food within walking distance | Relevant options, dated menus/prices, landmarks and availability evidence |
| Existing residents | Know whether favourite vendors are serving today | Favourites and recent status information |
| Vendors at recurring selling locations | Attract suitable customers without excessive administration | Shareable profiles and brief status/menu updates |
| Administrators | Keep information useful and resolve mistakes | Correction handling, ownership checks and basic moderation |

These segments and benefits are hypotheses. The pilot area will be chosen in Step 5. Interviews and observed behaviour may change the direction.

## Launch scope

Launch region confirmed on 2026-11-07: Maharashtra only. Delhi and other states are deferred until the model is proven and expansion is explicitly decided. See [pilot region and audience](../research/pilot-area.md).

Begin with one compact neighbourhood in Maharashtra and food stalls or carts that usually sell at recurring locations. Run a manual service experiment before building the custom product. The proposed first software version is a mobile-friendly website accessible through a shared link; the technology choice remains open.

Include:

- Browse and search by item or category, with available price information and practical proximity.
- Vendor profiles with a recognisable name, photo where available, landmark and selling location.
- Dated menus and prices, with unknown information shown explicitly.
- Usual schedules displayed separately from today's confirmed activity.
- Vendor updates for serving, sold out, finished and not attending today.
- Source, timestamp and expiry for availability evidence.
- Directions through Google Maps links to the selling location.
- Favourites that let people return to known vendors.
- A simple correction/report path and administration for inaccurate or duplicate listings.
- Lightweight product measurement of visits, repeat use, failed trips and maintenance effort.

Exact requirements, acceptance criteria and authentication choices belong to the later MVP specification and architecture steps. Customer account creation should not block initial browsing.

## Core journeys

### Customer

1. Choose an area or voluntarily share location; manual area selection must remain possible.
2. Search or browse relevant vendors and items.
3. Inspect menu/prices, landmark, usual hours and recent status evidence.
4. Open directions, save a favourite or report inaccurate information.
5. Optionally report whether the visit succeeded, without mandatory continuous location tracking.

### Vendor

1. Create or claim a profile through a proportionate ownership-check process.
2. Set the usual selling location, schedule and offerings.
3. Confirm selling activity for a time-bounded session.
4. Mark sold-out items, changes or the end of the session with minimal effort.
5. Correct profile information and control business-location visibility.

### Administrator

1. Review submitted listings and possible duplicates.
2. Investigate corrections or conflicting evidence.
3. Address abuse and give affected vendors a response/appeal path.
4. Track data quality and the work required to maintain it.

## Trust and availability principles

| Display state | Interpretation |
| --- | --- |
| Vendor confirmed | The vendor recently reported serving at this location; show time |
| Recently spotted | A customer reported a sighting; this does not prove current stock |
| Usual schedule | Expected attendance only, not confirmation |
| Announced stop | A future plan, not proof of arrival |
| Unconfirmed / unknown | No sufficiently recent evidence |
| Sold out / finished | Stock or the selling session has ended |

Evidence expires. Expiry durations will be defined and tested by vendor type; stale data must never silently remain live. Identity checks, physical presence, stock and food safety are separate claims. Paid promotion must not alter freshness or review evidence.

Show uncertainty instead of inventing precision. Record report provenance; conflicting reports should not automatically replace vendor information under a simplistic latest-update rule. Community sightings must not bypass a vendor's location-sharing controls.

## Reviews and recommendations

Begin with factual feedback and specific dated experiences rather than an unexplained score. Future reviews should distinguish item, price, portion, taste preference, wait and visit date. Provide moderation and vendor responses.

AI summaries are a later feature, conditional on enough independent, recent evidence. Show source reviews, sample size, dates and disagreements. Do not turn appearance or casual opinions into hygiene, allergen or safety certification.

## Full vision and expansion conditions

| Capability | Proposed sequence | Condition for adding it |
| --- | --- | --- |
| Recurring-location food vendors | First pilot | Evidence of local demand and workable updates |
| Broader community contributions | After controlled listing/correction workflows | Contributions improve coverage with manageable moderation |
| Weekly markets | Subsequent release | Reliable schedules, exceptions and local contributors |
| Moving-vendor stops and opt-in alerts | Before continuous live tracking | Vendors announce stops and customers act on notices |
| Selected active-session live tracking | Later experiment | Consent, freshness and battery/connectivity behaviour are dependable |
| Visiting utility/service vendors and everyday goods | Category-specific pilots | A distinct need and sustainable update process |
| AI review overviews | After sufficient review evidence | Summaries can represent evidence and uncertainty faithfully |
| Adjacent neighbourhoods and wider expansion | After local validation | Reliability, retention and economics survive reduced founder involvement |

Do not promise arrival estimates from GPS alone. A nearby moving vendor may not stop. Delivery, payments, nationwide coverage and complex personalisation are outside the initial launch scope and require separate decisions.

## Operating and business hypotheses

- Start with free basic discovery and participation during validation.
- Test one paid offering after demonstrating value; possible later options include vendor tools, clearly labelled sponsorship or market-organiser tools.
- No revenue model, price, budget or valuation is established.
- Direction clicks are interest signals, not proven sales.
- Track onboarding and recurring maintenance cost, including founder time, support and moderation.
- Expansion is conditional on evidence; a service that requires daily chasing may need a different operating model.

## Validation measures

The pilot should measure successful attributable visits, return use across weeks, incorrect availability and wasted trips, vendor updates without personal reminders, maintenance minutes per active vendor, and later actual payment/renewal behaviour.

Set numerical success and stop criteria before the experiment in Step 7. Registrations, listing counts and downloads alone do not establish demand. No customer interviews, traction or willingness to pay are claimed by this document.

## Decisions still open

Pilot locality, initial food subcategory, recruitment, interview findings, thresholds, status-expiry durations, communication channels, detailed MVP requirements, stack, hosting, costs, name clearance and monetisation all require later work.

## Step 2 completion checklist

- [x] State the customer problem and product promise.
- [x] Define proposed initial audiences and vendor benefits.
- [x] Define launch scope and core journeys.
- [x] Establish trust, privacy and evidence principles.
- [x] Preserve moving vendors, markets, utilities and AI in the long-term vision.
- [x] Make expansion conditional on evidence and identify open decisions.

Next: Step 3 — establish the repository documentation, issue templates and tracking workflow. Git was started early at the founder's request; commits and pushes remain manual.
