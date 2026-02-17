# Find Peace — UX Restructure Plan

## Guiding Principles
- Meet people where they are — don't tell them their words are "wrong"
- Start with the body, not vocabulary
- Funnel, don't flood — show less first, expand on demand
- Slow the pace — encourage feeling into, not clicking through
- Progressive disclosure — depth is there when they want it

---

## Phase 1: Funnel Checklist (categories collapsed by default)

**Currently:** Checklist shows all categories expanded — a wall of 50+ pills.
**After:** Categories start collapsed, showing only headings. Tap to expand. A small count badge shows how many items are already selected within a collapsed category.

### Changes:
- **Checklist.jsx** — Initialize `collapsedCategories` so all categories start collapsed (compute from `data` keys). Add selected-count badge next to collapsed headers. Add a smooth CSS expand/collapse transition.
- **Checklist.css** — Style for `.selected-count` badge and expand transition.

---

## Phase 2: Merge faux feelings into the main flow

**Currently:** Faux feelings are a separate category "Faux Feelings" on the Feelings page. If selected, a separate wizard step (FauxFeelingsUnpackCard) appears.
**After:** Faux feelings appear as a subcategory "Words for pain..." at the bottom of each relevant feeling category (e.g. "abandoned" goes under Sad). When tapped, an inline unpack card gently expands below — no separate step, no "you chose wrong" language.

### Changes:
- **New: `src/utils/fauxLookup.js`** — Centralized lookup: builds Maps from faux feeling/need names to their data. Exports `fauxFeelingsMap`, `isFauxFeeling()`, `getFauxFeeling()`. Also maps each faux feeling to its "home" feeling category based on its first suggestedFeeling.
- **New: `FauxUnpackInline.jsx` + `.css`** — Compact inline unpack card. Shows the `thought` reframe in gentle language, suggested real feelings/needs as tappable pills. No "faux" label — just "That word carries a lot of pain. Let's find what's underneath..."
- **Checklist.jsx** — New optional props: `fauxData` (the faux items to merge in) and `fauxLookup` (the Map). When provided, appends a "Words for pain..." subcategory to relevant categories. When a faux pill is clicked, renders `<FauxUnpackInline>` below the pill-grid. Needs `setFeelings`/`setNeeds` passed through for the tappable suggestion pills.
- **Feelings.jsx** — Build merged data that includes faux feelings distributed into categories. Pass faux-related props to Checklist. Remove the separate "Can't find the word?" button and FauxFeelingsTable SlideDrawer.
- **WizardContext.jsx** — Remove the FauxFeelingsUnpackCard step from `allSteps`. Remove its import and the `fauxFeelingNames` Set (logic moves to fauxLookup.js).

---

## Phase 3: Faux Needs data + merge into Needs page

**Currently:** No faux needs concept.
**After:** ~19 faux needs (Approval, Validation, Control, Fairness, etc.) appear as subcategories within the relevant need categories. Same inline unpack pattern as faux feelings.

### Changes:
- **New: `FauxNeedsData.js`** — 19 faux needs with `item`, `problem`, `thought`, `suggestedNeeds`. Categorized as "Control & Certainty", "Compliance & Loyalty", "Justice & Punishment", "Helping & Fixing", "External Validation".
- **Extend `fauxLookup.js`** — Add `fauxNeedsMap`, `isFauxNeed()`, `getFauxNeed()`. Map each faux need to its "home" need category based on its first suggestedNeed.
- **Needs.jsx** — Build merged data that includes faux needs distributed into categories. Pass faux-related props to Checklist. Reuse FauxUnpackInline (it already handles needs-only unpack since suggestedFeelings is optional).

---

## Phase 4: Enhance BodyCheckIn as a bridge into feelings

**Currently:** BodyCheckIn is a static, optional card with bullet points.
**After:** An interactive body-area scan with specific prompts (chest, stomach, throat, shoulders, jaw, hands). Each area has an optional text input. Bridges naturally into feelings with "Now let's find words for what you're noticing..."

### Changes:
- **BodyCheckIn.jsx** — Rewrite with body-area prompts as a gentle interactive sequence. Optional text inputs per body area. Transition text at the bottom bridging into feelings.
- **BodyCheckIn.css** (new) — Styling for body-area prompts.
- **WizardContext.jsx** — Add `bodyScan` state (object keyed by body area). Include in save/load/reset. Make BodyCheckIn non-optional (remove `optional: true`).
- **Review.jsx** — Add body scan responses to the review display.

---

## Phase 5: Breathing/pause interstitials

**Currently:** Steps jump immediately from one to the next.
**After:** Gentle transition text appears between major steps (forward navigation only). User taps "Continue" or waits briefly.

### Changes:
- **New: `PauseInterstitial.jsx` + `.css`** — Centered, gentle component with message and Continue button. Fade-in animation. Breathing-pace feel.
- **NvcWizard.jsx** — Add pause state tracking. On forward step change, check if the new step has a `pause` config. If so, show PauseInterstitial before the step content. Skip pauses when navigating backwards.
- **WizardContext.jsx** — Add `pause` property to relevant steps in `allSteps`:
  - Before BodyCheckIn: "Let's slow down for a moment..."
  - Before Needs: "Now that you've named what you're feeling, let's look at what those feelings are pointing to..."
  - Before NeedExploration: "Take a breath. You've done important work naming your needs..."
  - Before Strategies: "Now let's think about what might actually help..."

---

## Phase 6: Cleanup

- Remove `FauxFeelingsUnpackCard.jsx` + `.css` (logic now in FauxUnpackInline)
- Remove `FauxFeelingsTable.jsx` and `FauxFeelingsTableCategorized.jsx` (no longer needed)
- Update help content on Feelings, Needs, BodyCheckIn, Introduction
- Ensure saved sessions are backwards-compatible with new bodyScan field

---

## Implementation Order

```
Phase 1 ──→ Phase 2 ──→ Phase 3
                              ↓
Phase 4 (independent) ───→ Phase 6
                              ↑
Phase 5 (independent) ────┘
```

Phases 1, 4, and 5 are independent. Phase 2 depends on Phase 1 conceptually. Phase 3 depends on Phase 2's components. Phase 6 is final cleanup after everything else.

## New Files Created
- `src/utils/fauxLookup.js`
- `src/components/FauxUnpackInline.jsx` + `.css`
- `src/components/FauxNeedsData.js`
- `src/components/PauseInterstitial.jsx` + `.css`
- `src/components/BodyCheckIn.css`

## Files Modified
- `Checklist.jsx` + `.css` (funnel + inline faux support)
- `Feelings.jsx` (merge faux feelings, remove separate drawer)
- `Needs.jsx` (merge faux needs)
- `WizardContext.jsx` (remove faux step, add pauses, add bodyScan state)
- `NvcWizard.jsx` (pause interstitial rendering)
- `BodyCheckIn.jsx` (interactive rewrite)
- `Review.jsx` (body scan in review)

## Files Removed
- `FauxFeelingsUnpackCard.jsx` + `.css`
- `FauxFeelingsTable.jsx`
- `FauxFeelingsTableCategorized.jsx`
