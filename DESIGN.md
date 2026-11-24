# Design baseline and implementation mapping

[Source file](https://www.figma.com/design/evA3w2TOuO6N1AXL5Oldnv/INFO5900-Internal-Design-Files?node-id=98-6048). Read on 22 Oct 2026 through Figma MCP. Figma itself was not edited.

## Pages

| Page | Node | Treatment |
|---|---|---|
| exploration v1 | 0:1 | Historical exploration, not implementation baseline |
| mid-fidelity v2 | 21:2 | Historical iteration |
| mid-fidelity v3 | 98:6048 | F3 implementation baseline |
| Calendar | 234:4259 | User says unfinished; integration deferred |
| Design System · Foundations & Components | 184:97 | User says design unfinished; snapshot tokens remain revisable |

## Read implementation references

| Frame | Node | Prototype |
|---|---|---|
| Recommendation overview | 169:840 | Overview |
| Recommendation detail | 169:971 | Evidence |
| Assemble material | 169:1692 | Material step |
| Differentiation overview | 169:2554 | Support step |
| Review draft | 169:3174 | Review step |
| Choose action | 169:3503 | Action step |
| Assignment configuration | 169:3689 | Settings step |
| Confirm assignment | 169:4333 | Confirmation |
| Assignment submission outcome | 169:4464 | Success |

High-fidelity design-context code and screenshots were read for these frames before implementation. Generated static JSX was translated to React state and plain CSS. No existing component package or frontend existed in the starting directory. No Code Connect mapping was supplied in the retrieved design context. SVGs are downloaded locally; design screenshots are reference targets, never runtime page images.

## Tokens

DM Sans; text #201f1d; secondary #5d5951; canvas #faf9f7; sidebar #f8f8f6; border #dbd8d2; primary #074dc6; selection #eaf6ff; warning #fff4d9. Teacher navigation 256 px at desktop; workspace padding 32 px. Cards use 12–16 px radii. Mobile is a provisional code adaptation, pending approved design.

## Open decisions and known differences

### Recommended review visual update · 24 Nov 2026

The repository image `Group · 1 · Recommended review.png` supplies the v4 reference for the Class 6A shell and Recommended review entry. Downstream F3 screens use the shared shell and palette and retain their existing frame mappings.

| Screen | v4 source node |
|---|---|
| Suggested groups default | 2009:31037 |
| Class knowledge gaps | 2009:36695 |
| Suggested groups return | 2009:36997 |
| Fractions inline evidence | 2009:32718 |
| Decimals inline evidence | 2009:32831 |
| Percentages inline evidence | 2009:32944 |

The PNG palette supplies the canvas #FBFAF9, sidebar #F8F8F6, border #DBD8D2, primary #074DC6, tab fill #ECF9FF, tab underline #47BAFF and repeated-evidence fill #BBF7D0. The repeated-evidence pill describes the source assessment.

The entry replaces the F3 learning-need/lesson toggle with Suggested groups and Class knowledge gaps. Filters open on demand and retain their state when switching views. The fractions aggregate is eight attempted items across three students in the supplied v4 screen. Downstream source summaries use that count too. The existing synthetic teacher identity is used in the shared shell. The header's Assign test, Edit group and Access Code controls show local information dialogs. The fractions row opens the implemented evidence-to-assignment path.

### Screens and states catalogue · 24 Nov 2026

`02 · Screens & states catalogue.png` is the v4 visual reference for the existing downstream screens. This pass adapts their layout and controls while preserving local F3 data, date validation, and explicit teacher confirmation. The catalogue's 16-minute example, whole-class plan scope, and separate assignment and scheduling material rules differ from current F3 behavior.

| Updated screen | v4 source node |
|---|---|
| Fractions detail and student evidence list | 2009:31150 |
| Assemble material | 2009:31270 |
| Differentiate | 2009:34092, 2009:34144 |
| Review draft | 2009:31380 |
| Choose action | 2009:31842 |
| Confirm assigned test | 2009:31878 |
| Assignment result and Assigned tests list | 2009:34346, 2009:36753 |
| Curriculum plan setup and confirmation | 2009:34660, 2009:34775 |

Catalogue functionality pending an implementation decision:

- **Recommendation detail and evidence (group 2).** An additional student-selection entry point from assembly remains pending.
- **Assembly and resource retrieval (groups 3–4).** Material-specific previews and answer keys, library add and replace flows, review/apply/cancel, and ordering. Current search and selection operate against a small local fixture. The catalogue marks F4 retrieval states unverified.
- **Differentiation and draft review (groups 5–6).** Shared default version, level-based suggestions and neutral version names, saved/unsaved support states, reset to suggestion, and returning to the saved draft from Calendar.
- **Assignment setup and submission (groups 7–8).** Practice-only assignment with teacher-only resources, time fields, submitting and duplicate-safe recovery states remain pending. The existing confirmation and simulated failure workflow supplies successful snapshots to Assigned tests.
- **Curriculum plan and Calendar (groups 10–12).** Whole-class scheduling with eligible materials, timetable conflict review, suggested and manual dates/times, planned-test movement, linked writes, Calendar views, and timed Undo.
- **Alternative and recovery states (group 13).** Stale/disputed evidence, resource partial results and access failures, stale selections and failed apply/support saves, previous-submission checks and recovered records, Calendar access and availability errors, schedule changes, and failed or expired Undo. Empty local search and a simulated submission failure already exist.

- Material selection is 5+4+6 = 15 minutes, while later static review frames describe a different 5+8+3 = 16-minute sequence. This implementation consistently derives minutes from the selected materials. Product/design must approve a single canonical sequence.
- Differentiation frame includes both individual support and level-mapping variants. First slice uses individual support; Threshold/Satisfactory/Basic/Higher version mapping remains unimplemented.
- Dates in reference screens are 19–23 Oct 2026. Prototype defaults to 23–30 Oct to support testing; editable, not live scheduling.
- Recommendation detail uses v4 nodes 2009:31150, 2009:32608, 2009:32663, 2009:32109, 2009:32229, 2009:32349 and 2009:31566. Amelia retains her three sample items. Noah and Sofia show one documented example each, using the checkpoint examples also shown in 2009:31677 and 2009:31697. Unshown individual responses remain unavailable. Decimal detail is view-only because the existing preparation workflow is fractions-specific. The fractions student picker passes changes into preparation only on Create review.
- Assigned tests uses catalogue nodes 2009:36753, 2009:31478, 2009:31658, 2009:31677, 2009:31697, 2009:34610 and 2009:32045. The list uses session-local successful assignment snapshots and labelled sample tests, including one synthetic archive entry. Newly assigned students start with zero progress and no new responses. The explicit catalogue sample view provides per-student progress and evidence for documented recipients. The read-only follow-up draft is scoped to the Assigned tests visit, matching the catalogue's editable-draft boundary.
- Material Preview uses a simple shared sample question, not a real content bank renderer.
- Dialogs and destination views are simplified for workflow tests. Modal focus trapping and full keyboard/screen-reader audit remain outstanding.
- Calendar action is a local simulation; timetable conflict/recalculation, network loading, stale evidence, disputed marking, source-unavailable and permission-state designs need later implementation.
- Additional navigation items show a scope message. This first slice is not a complete portal or a pixel-perfect implementation of every F3 frame.
