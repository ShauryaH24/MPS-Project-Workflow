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

- Material selection is 5+4+6 = 15 minutes, while later static review frames describe a different 5+8+3 = 16-minute sequence. This implementation consistently derives minutes from the selected materials. Product/design must approve a single canonical sequence.
- Differentiation frame includes both individual support and level-mapping variants. First slice uses individual support; Threshold/Satisfactory/Basic/Higher version mapping remains unimplemented.
- Dates in reference screens are 19–23 Oct 2026. Prototype defaults to 23–30 Oct to support testing; editable, not live scheduling.
- Detailed evidence is available only for Amelia. Noah/Sofia item responses are explicitly unavailable; aggregate evidence is not expanded into invented student data.
- Material Preview uses a simple shared sample question, not a real content bank renderer.
- Dialogs and destination views are simplified for workflow tests. Modal focus trapping and full keyboard/screen-reader audit remain outstanding.
- Calendar action is a local simulation; timetable conflict/recalculation, network loading, stale evidence, disputed marking, source-unavailable and permission-state designs need later implementation.
- Additional navigation items show a scope message. This first slice is not a complete portal or a pixel-perfect implementation of every F3 frame.
