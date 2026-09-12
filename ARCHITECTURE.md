# Saraaf Trade Toolkit — Architecture Rules

## 1. Toolkit-level changes
These apply to the whole toolkit:
- Homepage / 50-card tool wall
- Tool numbering and active/Coming Soon status
- Shared brand colours and typography
- Shared Print / Save PDF, Share Quote and Feedback controls
- Shared navigation: Saraaf logo -> saraafglobal.com; All Tools -> toolkit homepage
- Shared tool registry and hide/unhide rules

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

## 4. Numbering rule
Visible active tools are always numbered first, sequentially. A newly activated tool takes the next active position; it does not inherit an old placeholder number.

Inactive tools are clickable and go to the standard Coming Soon page.

## 5. Code-size rule
There is no guaranteed universal line limit for a response. For this project we will use a conservative engineering limit of **350 lines per source file when practical**. If a tool would exceed that, split it into logical files before implementation. Do not knowingly create a 600+ line file.

## 6. Interaction rule
Interactive controls are encouraged where they improve negotiation, comparison or understanding. Sliders are a good example: users can change a commercial assumption and immediately see the economic effect.
