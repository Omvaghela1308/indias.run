# Anti Gravity Prompt — DSF-NET V2.1 "Mission Control" Targeted Polish

You are editing an EXISTING working Streamlit app called "DSF-NET V2.1 / Satellite IR → Optical Translate" ("Mission Control" light theme — white/off-white panels, soft blue-grey background, blue accents, Space Grotesk/Inter/JetBrains Mono typography).

## STRICT RULES — READ FIRST
- Do NOT rewrite, restructure, or remove any existing working feature, section, function, or content.
- Do NOT change the model/inference logic, CLAHE pipeline, spectral fusion, object detection, thermal risk, or land cover classification code in any way.
- Do NOT change the overall light theme, color palette, fonts, or page structure/order.
- ONLY touch the specific CSS/component-level styling and small UI additions listed below. Every other line of code stays exactly as-is.
- After each change, do a self-check: confirm no existing button, slider, upload widget, or data pipeline call was modified or deleted.

## SCOPE OF CHANGES (do only these, one at a time)

1. **Card hover depth / micro-interaction**
   - Add a subtle elevation-on-hover + slight tilt/scale (e.g. `transform: translateY(-4px) scale(1.01)` with a soft box-shadow transition, ~200ms ease) to all existing card containers (upload card, parameter card, comparison card, detection card, thermal card, land-cover card, download card).
   - Do not change card content, only the hover/transition CSS.

2. **Legend legibility (Thermal Risk + Land Cover sections)**
   - Increase legend swatch size and label font-size slightly (keep existing color values, just improve contrast/spacing: add a thin border/shadow around each swatch, increase text weight to medium).
   - Do not change the actual risk/land-cover color mapping logic, only the legend's visual presentation.

3. **Processing/translate loading state**
   - While translation/inference is running, replace the default spinner with a branded "Mission Control" style progress indicator — a horizontal scan-line or radar-sweep animation using the existing blue accent color, inside the existing processing container.
   - Keep the actual `st.spinner`/progress logic and function calls untouched — only change what's visually rendered during that state.

4. **Consistent spacing rhythm**
   - Normalize vertical spacing between major sections to a consistent 24–32px rhythm (currently inconsistent). Adjust only margin/padding values in CSS, not layout structure or component order.

5. **Object detection bounding box contrast**
   - Increase bounding box stroke width slightly and add a subtle dark outline/shadow behind box labels so they stay readable against both light and busy image backgrounds. Do not change detection logic, class labels, or confidence values — only the box/label rendering style.

6. **Download section CTA polish**
   - Add a small file-format/size hint under each download button (using existing metadata already available, no new backend calls) and a brief success checkmark/toast animation on click. Do not change what files are generated or downloaded.

7. **Empty/error states**
   - For "no file uploaded yet" and "processing failed" states, add a styled placeholder card matching the Mission Control theme (icon + short message) instead of default Streamlit blank/error output. Do not change the underlying error-handling logic, only what's displayed to the user.

## OUTPUT EXPECTATION
Apply changes incrementally, section by section, and after each one confirm existing functionality (uploads, sliders, detection, thermal, land cover, downloads) still works exactly as before — only the visual/interaction layer should change.
