# Saraaf Trade Toolkit — Architecture Rules

## 1. Toolkit-level changes
These apply to the whole toolkit:
- Homepage / 50-card tool wall
- Tool numbering and active/Coming Soon status
- Shared brand colours and typography
- Shared Print / Save PDF, Share Quote and Feedback controls
- Shared navigation: Saraaf logo -> saraafglobal.com; All Tools -> toolkit homepage
- Shared tool registry and owner-only visibility controls
- Shared usage-data structure, including commodity-suite tagging

## 2. Tool-level changes
These apply only to one calculator:
- Inputs and calculations
- Tool-specific interactive controls such as sliders
- Tool-specific results, warnings and visualizations
- Tool-specific industry terminology

## 3. URL rule
Every launched calculator gets its own page. Current Phase 1 pattern is:
`/toolkit/<tool-slug>/`

The structure can later move under a commodity family without changing the calculator's calculation engine, for example:
`/toolkit/antimony/orevaluationengine/`

When a shared calculator is accessed through a commodity suite, the usage logger records the suite separately (for example `cotton`, `antimony`, `marble`, `zinc`). A direct toolkit access is tagged `global`.

## 4. Numbering rule
Visible active tools are always numbered first, sequentially. A newly activated tool takes the next active position; it does not inherit an old placeholder number.

Inactive tools are clickable and go to the standard Coming Soon page.

## 5. Owner-only visibility rule
Tool visibility is controlled only in `assets/js/tool-registry.js` using the final boolean on each tool record:
- `true` = show on the homepage
- `false` = hide from the homepage

This is deliberately **not** exposed to normal users. Hiding a tool does not delete its code. To restore it, the owner changes the same value from `false` back to `true`.

## 6. Code-size rule
There is no guaranteed universal line limit for a response. For this project we will use a conservative engineering limit of **350 lines per source file when practical**. If a tool would exceed that, split it into logical files before implementation. Do not knowingly create a 600+ line file.

## 7. Interaction rule
Interactive controls are encouraged where they improve negotiation, comparison or understanding. Sliders are a good example: users can change a commercial assumption and immediately see the economic effect.

## 8. Print rule
Normal Print / Save PDF remains the branded colour version. A separate B&W PDF control produces a white-background, black-text version with black controls/sliders. The tool logo/header is excluded from both printed versions.

## 9. Quote-combination rule (future)
Each calculator remains independently printable by default. A future quote builder may allow the user to opt into combining selected calculator results into one transparent quotation. The default remains one calculator per PDF.
