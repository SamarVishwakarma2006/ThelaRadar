# ThelaRadar — Step 12 interactive prototype

Built and checked: 2026-11-07
Status: Local clickable prototype built; real customer/vendor usability sessions pending. No production release or market validation is claimed.

## Run

From the repository root with Node.js 24:

```powershell
npm start
```

Open http://127.0.0.1:5190. No dependency installation or API key is needed. Stop with Ctrl+C. The preview binds to loopback and serves only the explicitly listed web assets, not repository documents or Git metadata.

## Implemented interactions

- Warm cream, green and orange homepage with authored inline SVG cart and dish illustrations.
- Fictional Nerul sample area, six vendor cards and honest unsupported-area states.
- Item/vendor search, categories, confirmation filter and reset.
- Browser-local favourites with explicit storage failure feedback.
- Native-dialog vendor profiles with dated sample menus, expiry context and correction previews.
- Vendor dashboard: serving, item sold-out, finished, stop sharing and reset-fixture actions.
- Responsive layouts, focus styling, dialog dismissal, reduced-motion support and labels.

No real coordinates are stored or exposed. Directions explain that they are disconnected. Correction previews explicitly say nothing was sent or stored. Vendor status changes are in memory only; reload resets them. Fixtures initialise sample confirmations relative to page load; these are never real freshness evidence. Favourites persist only in this browser. No accounts, backend, moderation service, payments, live tracking or analytics collection are connected.

The Nerul illustration does not select the actual pilot locality. Maharashtra-only launch scope and the full original vision remain intact. Food illustrations and business names are fictional, not photos or endorsements of real vendors.

## Source and assets

`web/index.html`, `styles.css`, `app.js` and `data.js` provide the buildless experience. `scripts/preview.mjs` serves the explicit asset allowlist. `web/data.test.js` checks core fixture rules with Node's built-in test runner. No framework or package dependencies were introduced.

Illustrations are authored vector markup in the source. The stylesheet optionally requests DM Sans and Manrope from Google Fonts; system sans-serif fallbacks work if unavailable. There are no external food-image requests. Legal name clearance is still outstanding.

## Verification performed

- `npm run check`: application/data/preview script syntax passed.
- `npm test`: two behavioural tests passed, covering expiry boundaries, finished/hidden state, search/category combinations, saved filtering and stale evidence exclusion.
- Local HTTP: homepage returned 200; private repository paths must return 404 via the preview allowlist.
- Browser: search for poha produced one matching vendor; confirmed filter produced three; snacks plus confirmed produced one.
- Browser: save and saved-only filtering worked; the test favourite was removed afterward.
- Browser: profile/menu and correction preview worked and explicitly confirmed that no report was sent.
- Browser: stopped sharing hid the sample from discovery; serving and sold-out updates changed the sample state/menu.
- Browser: Panvel produced the unsupported-area empty state; reset restored six fictional listings.
- Desktop visual inspection and 390 × 844 mobile viewport inspection performed; measured document width did not exceed viewport width. Temporary viewport override reset afterward.
- Captured browser warning/error log inspection returned no entries during this session.
- A visual issue with overlapping illustration copy was corrected before final desktop inspection.

Screenshot-file export through the browser runtime was denied for the chosen folder; no screenshot artifact is claimed. The preview itself was displayed in the app. Browser observations are developer QA, not customer usability evidence or a complete accessibility audit.

## Remaining work

Test the screens with real target customers and vendors, recording task completion, confusion and changes before calling Step 12 complete. Resolve Step 13 architecture and authentication separately. No production privacy/availability guarantee follows from this prototype. Fieldwork in Steps 5–9 remains outstanding.
