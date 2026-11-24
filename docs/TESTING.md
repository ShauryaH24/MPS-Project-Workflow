# Verification · 22 Oct 2026

## Assigned tests

- `corepack pnpm test` passed all three domain tests. `corepack pnpm build` passed.
- Playwright in Edge verified search, the archive view, status filtering, and the sample test details. The assignment path still required acknowledgement, kept the draft on simulated failure, and showed one new row after retry. The row showed zero completions.
- Browser checks covered newly assigned and sample progress, before/after evidence, reopening the saved sample follow-up draft during the visit, and the 390 px layout. The existing local Curriculum plan path completed separately and its result left the previous Assigned tests row available. No uncaught page errors were reported.

## Recommendation detail

- `corepack pnpm test` passed all three domain tests. `corepack pnpm build` passed.
- Playwright in Edge verified decimals rationale, the percentage evidence gate, Noah and Sofia’s evidence, and search, cancel, and save in the student picker. Adding Liam carried him through the existing 15-minute fractions draft and recipient settings. Assignment still required explicit acknowledgement and completed through the existing success screen.

## Screens and states catalogue · 24 Nov 2026

- `corepack pnpm test` passed all three domain tests and `corepack pnpm build` passed TypeScript and Vite.
- Playwright with Microsoft Edge at 1280 × 800 verified Amelia's inline responses and Noah's unavailable evidence. It verified preview, empty search retaining the draft, adding a fourth material, editing individual support, and review progression. Browser captures of evidence, assembly, action choice and confirmation were compared with the catalogue.
- The assignment flow blocked an invalid date range and cleared acknowledgement after a date edit. Simulated submission failure preserved the draft, retry created the local Assigned tests result, and the Curriculum plan branch also required acknowledgement before creating its local result.
- At 390 × 844, Curriculum plan confirmation fit the viewport without horizontal document overflow. The browser walkthrough reported no uncaught page errors.

## Recommended review update · 24 Nov 2026

- `corepack pnpm test` passed all 3 domain tests. `corepack pnpm build` passed TypeScript and Vite.
- Playwright with Microsoft Edge at 1280 × 800 displayed three suggested groups. A browser capture was visually compared against the supplied PNG. Each evidence disclosure opened and closed with its expected aggregate count. The six-row Class knowledge gaps list opened and returning to Suggested groups preserved the expanded row.
- Filtering to Insufficient evidence displayed only Percentages. Clearing that filter restored all three groups. The fractions row opened the detailed evidence and preparation journey. The confirmation action was disabled until teacher acknowledgement. Submission created a local result with lifecycle status Not started, and returning from Assigned tests preserved the expanded group.
- At 390 × 844 the review page fit the viewport with the wide table contained in its own scroll region. No uncaught browser errors were reported during the run.

## Completed checks

- `pnpm install` completed with esbuild explicitly allowed.
- `pnpm test`: 3 passing domain tests covering dynamic duration, invalid schedules and confirmation/recipient/material gates.
- `pnpm build`: TypeScript and production Vite build passed.
- Browser at 127.0.0.1:5173: opened recommendation overview, inspected layout against Figma reference, opened evidence, started review, selected the fourth material, saved draft, continued through support/review/action/settings/confirmation.
- Adding the fourth 1-minute item changed the total from 15 to 16 minutes and four activities; review and confirmation displayed the recalculated total.
- Confirm and assign was disabled before the teacher-review checkbox was checked.
- Enabled simulated submission failure, attempted submission, verified retained draft/error, disabled simulated failure, retried successfully.
- Success displayed 3 students, 4 activities, actual chosen dates, completed action Assigned, lifecycle Not started, and an explicit local-only notice. View in Assigned tests displayed the submitted snapshot.
- Local SVG logo/navigation assets visibly loaded. Asset paths are local, not expiring Figma URLs.

![Successful F3 test submission](screenshots/f3-success.png)

## Remaining verification

Full automated browser regression, narrow viewport visual QA, modal focus trapping, full assistive-technology audit, save/restore after refresh, both action branches with all invalid/empty combinations, complete asset geometry comparison across all design frames, live backend/calendar operations and GitHub Actions result. Domain tests are not a substitute for these checks. CI configuration is included; its remote result must be checked separately.
