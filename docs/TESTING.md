# Verification · 22 Oct 2026

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

## Verification · 30 Oct 2026

Behavior fixes only. Colors, component markup, and the 100% layout were left as they were.

- `pnpm test`: 6 passing. The three original domain tests still pass. New tests cover confirmation reset, corrupt-draft restore, and Sofia’s insufficient-evidence status.
- `pnpm build`: TypeScript and the production Vite build passed.
- Chromium at 127.0.0.1:5173, 1440×900: overview at 100% text size kept the existing shell. The primary button computed to rgb(7, 77, 198) and the page heading to 20px. Shell zoom was 1. Increasing text size to 110% enlarged the heading; decreasing it returned zoom to 1.
- A saved draft of `{selected: null}` reloaded onto Review group overview instead of a blank page.
- Evidence table: Amelia and Noah stay Needs review for equivalent fractions. Sofia’s equivalent-fractions cell and detail badge say Insufficient evidence, using the existing warning badge. The compare-fractions column is unchanged.
- Flag for review follows the selected student. Noah stayed flagged after Sofia was flagged; Amelia stayed unflagged.
- Selecting the fourth material, saving, and refreshing restored that material, cleared confirmation, and showed 16 minutes after Start review.
- An empty date shows “Enter a start date and an end date.” A due date before the start date still shows “End date must be on or after the start date.”
- Leaving confirmation and starting review again cleared the acknowledgement and disabled Confirm and assign.
- Simulated failure kept the draft and the checked acknowledgement. Retry assigned the review. Success still separates Assigned from Not started.
- Assigned tests selects the Tests tab. Breadcrumb: Groups / Mathematics / Assigned tests.
- Curriculum plan selects that tab. A confirmed plan opens Curriculum plan with the existing Not started badge.

## Remaining verification

Full automated browser regression checked into the repo, narrow viewport visual QA, modal focus trapping, full assistive-technology audit, every invalid schedule combination, complete asset geometry comparison across all design frames, live backend/calendar operations and GitHub Actions result. Domain tests and the 30 Oct Chromium walk are not a substitute for these checks. CI configuration is included; its remote result must be checked separately.
