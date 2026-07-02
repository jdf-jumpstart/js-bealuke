---
name: anti-generic-design
description: Apply when producing UI design, mockups, design specs, component systems, or frontend code where visual quality matters. Enforces production-grade discipline and prevents common AI design failures (decorative gradients, glassmorphism, card-everything layouts, typographic sludge, inconsistent systems). ALWAYS trigger for any task that outputs HTML — including emails, newsletters, reports, landing pages, dashboards, data tables, utility pages, and artifacts — regardless of whether "design" is mentioned. If HTML is being written, this skill runs. Trigger also when "design" isn't said explicitly — any task that builds or styles an interface qualifies.
---

# Anti-Generic Design Guardrails

The goal is design that could ship inside a real product — not design that "looks designed." Every visual choice maps to a system rule or a stated reason. If you can't justify a decision, remove it.

This skill is a constraint set. It is compatible with bold, maximalist, or unconventional aesthetics — what it forbids is *unintentional* drift into generic patterns. Intentional rule-breaking with a stated reason is fine. Defaulting to glassmorphism because the model couldn't think of anything else is not.

## Before generating

Resolve these four questions before producing any output. If the brief doesn't answer them, state your assumptions explicitly.

1. **Platform and density** — web app, mobile, dashboard, marketing page; sparse or dense.
2. **Usage context** — high-frequency workflow tool, occasional reference, one-time public read.
3. **Type scale** — pick one and commit (e.g., 12/14/16/20/24/32, or a modular scale). All text must land on it.
4. **Semantic color roles** — primary, secondary, neutral, plus any of error/warning/success/info that the product actually needs. Brand accents are allowed but must be named and reused, not sprinkled.

## Hard rules

**Typography**
- No letter-spacing on body or functional UI text. Tight tracking on display headings only, and only with a stated reason.
- All-caps is acceptable for short labels, metadata, and section eyebrows. Not for headings or running text.
- Maximum two typefaces. Pair a display face with a body face, or use a single well-designed family across the board.
- Casing is consistent within a component type. Pick sentence case or Title Case for buttons, headers, nav — and hold it.
- Every text element sits on the declared type scale. No arbitrary px values.
- **Minimum body font size: 16px on mobile, 15px on desktop.** This is a hard floor. Applies to body copy, list items, nav items, and all form inputs without exception. Below 16px on mobile, iOS Safari auto-zooms text inputs — a functional bug, not a style tradeoff. Never go below this floor regardless of how refined a smaller size looks.
- Numerals carry no decorative leading zeros. Write 1, 2, 3 on steps, stats, and section numbers, not 01 / 02 / 03. Zero-padding for visual flavor is a generic agency-template tell, not a real convention. Keep functional padding only where the format genuinely requires fixed width: clock time (09:05), dates (06/09), version and ID strings, and sorted numeric keys.
- **No italic in titles or headings** unless italic encodes specific semantic meaning: a book title, a foreign-language term, a named product. Italic applied to a heading for stylistic effect — to feel editorial, warm, or dynamic — is a template tell. Default is upright. If a heading is italic, state the reason.
- No split-headline decoration: do not italicize or color-shift the second half of a headline or hook as a default stylistic move (e.g., "Your SEO" in white + "*in motion.*" in gold italic). This pattern is an agency-template tell with no semantic content. Italic and accent color are legitimate when they encode meaning — emphasis, a brand term, a named product — not when they exist solely to make a headline feel "dynamic." If you break a headline across styles, state the reason.
- **Do not use eyebrows unless explicitly requested.** Section eyebrow labels (small all-caps text above a heading) are a default AI design crutch, not a universal UI pattern. Omit them entirely unless the user specifically asks for them or the brief describes a context where they carry real navigational meaning. When eyebrows are used, they must follow the remaining rules below.
- **No decorative leading punctuation or lines before eyebrows or labels.** Do not prefix section eyebrows, category tags, or UI labels with an em dash (—), en dash (–), slash (/), dot (·), a horizontal rule, a thin `<hr>`-style line, or any other character or element used as a visual flourish. This includes the pattern `— EYEBROW TEXT` where a short horizontal stroke precedes the label. Eyebrows stand alone: plain text, all-caps, wide tracking if appropriate. A leading dash, slash, or decorative rule encodes nothing — it is pure decoration and a template tell.

**Color**
- Every color in the output maps to a named semantic role. Brand accent counts as a role.
- Gradients require a reason: progress, status range, depth modeling, or a stated brand expression. Decorative gradients without that justification are forbidden.
- Red and green retain their conventional meanings (error, success). Don't reassign them to priority or category coding.
- Maintain WCAG AA contrast for all text and meaningful UI elements. Concretely: body text requires a minimum 4.5:1 contrast ratio against its background; large text (18px+ regular or 14px+ bold) requires 3:1. **Muted and secondary text — including eyebrow labels, captions, metadata, and timestamps — must also meet 4.5:1.** The model's default behavior of rendering these in low-saturation warm tones against near-white backgrounds frequently fails this threshold. Verify contrast before using any `--color-text-muted` or `--color-text-secondary` value on a light background. When in doubt, darken the text, not the background.

**Spacing and layout**
- Pick a base unit (4 or 8) and use multiples of it for all margins, padding, and gaps. State which.
- Alignment is structural — every element aligns to a grid line, a column edge, or another element's edge.
- Centering is a deliberate choice for specific contexts (empty states, modals, hero moments). It is not a default for content.
- Asymmetry and focal hierarchy are encouraged where the brief supports them.

**Elevation**
- Define no more than three levels: surface, raised, overlay. Each has one consistent treatment.
- One shadow per component, and only when elevation is meaningful. Prefer contrast and spacing over shadow for separation.
- Glassmorphism requires functional justification (e.g., a true layered context like a video background). It is not a stylistic default.

**Components**
- Each component declares its states: default, hover, active, focus, disabled, loading where applicable.
- A pattern that appears twice is the same component. No accidental variants.
- Button hierarchy per context: one primary, one secondary, optional ghost/text. Not three primary buttons competing for attention.
- Cards are for discrete, comparable, scannable items. Don't wrap everything in a card by reflex.
- Badges, pills, and tags carry status or metadata. They are not decoration and they are not a substitute for hierarchy.

## Required real-world states

Any non-trivial design must account for:

- **Empty** — the screen with no data, in a way that's informative rather than blank.
- **Error** — how failure is communicated and recovered from.
- **Loading** — what's visible while data resolves.
- **Dense** — the layout under 10× the expected content.
- **Long content** — labels at 80 characters, names at 40, paragraphs that wrap.
- **Narrow viewport** — how the layout collapses on mobile or in a sidebar context.

If a state isn't shown or addressed in your output, name it as out of scope rather than ignoring it.

## Generic AI patterns to avoid

These are the failure modes that mark output as machine-generated rather than designed. Avoid unless the brief explicitly calls for them.

- Soft shadows on every element, flattening hierarchy
- Decorative left accent bars on cards or list items: a colored `border-left` stripe applied for flavor. A left border is legitimate when it encodes something (alert severity, a blockquote, the active item in a nav list), but a tinted stripe on every card is a template tell, not hierarchy.
- Decorative gradient backgrounds, especially purple-to-pink on white
- Repeated icon-title-body-button cards as the universal layout primitive
- Light-weight all-caps headings with wide tracking ("luxury" styling on functional UI)
- Serif and sans-serif mixed without a clear pairing logic
- Glassmorphism applied as ambient styling rather than for layered content
- Three or more competing button styles in one view
- Identical corner radius on every surface regardless of role
- Lorem ipsum or other placeholder copy in a finished design — use realistic content
- Split-headline italic/color decoration: coloring or italicizing the second half of a heading or hook for visual effect ("Your SEO" plain + "*in motion.*" in accent color italic). The pattern signals nothing — it just performs dynamism. Apply italic or accent color only when it carries meaning.
- Italic headings or titles with no semantic justification — used to feel editorial or warm rather than to encode meaning.
- Eyebrow labels above headings when not requested — a reflexive AI pattern that adds visual noise without hierarchy value.
- Decorative leading punctuation or lines before eyebrows or section labels: `— LABEL`, `– LABEL`, `/ LABEL`, `· LABEL`, or a short horizontal stroke preceding the text. All are template tells with no semantic content.
- Body or UI text below 16px on mobile or 15px on desktop.

## Performance & correctness

These are not taste calls — they are functional bugs that ship silently and hurt users. They apply in every context regardless of aesthetic direction.

- **Never use `height: 100vh` or `h-screen` for full-height sections.** iOS Safari's address bar eats viewport height and collapses the layout. Use `min-height: 100dvh` (`min-h-[100dvh]` in Tailwind) instead. This applies to hero sections, full-bleed panels, and any element intended to fill the screen.
- **Never use `window.addEventListener('scroll', ...)` for reveal or parallax animations.** It fires on every scroll tick, forces continuous layout recalculation, and kills mobile frame rate. Use `IntersectionObserver` instead — it fires once at threshold and does not block the main thread.
- **Animate only `transform` and `opacity`.** Never animate `top`, `left`, `right`, `bottom`, `width`, `height`, `margin`, or `padding`. Animating these properties triggers full document layout recalculation on every frame. `transform` and `opacity` are composited by the GPU and do not cause reflow.
- **Apply `backdrop-filter: blur()` only to `position: fixed` or `position: sticky` elements.** Blur on a scrolling container forces the GPU to repaint on every scroll frame, causing severe frame drops on mobile. Navbars and modal overlays are fine. Content cards and scrolling sections are not.

## Final check

Before delivering output, verify:

- The type scale is declared and obeyed
- Body and input font sizes are at or above 16px on mobile, 15px on desktop
- No heading or title uses italic without a stated semantic reason
- No eyebrows used unless explicitly requested
- No eyebrow or label has a leading decorative character or line (—, –, /, ·, horizontal stroke)
- All text — including muted, secondary, and eyebrow text — meets 4.5:1 contrast against its background
- Color choices are named by role, not by hex value
- Spacing follows the declared base unit
- The same pattern is treated the same way everywhere
- Full-height sections use `min-height: 100dvh`, not `height: 100vh`
- Scroll-triggered animations use `IntersectionObserver`, not scroll event listeners
- All CSS transitions animate only `transform` or `opacity`
- `backdrop-filter: blur()` is only on fixed or sticky elements
- The required states above are addressed or explicitly scoped out
- Every notable visual decision has a reason — system rule, stated brand direction, or explicit override

## Prompting downstream models

When generating a design brief for another model, use the constraint vocabulary from this skill:

> Design a [component/screen] for [platform and density]. Use a [4 or 8]pt spacing scale, semantic color tokens (primary, secondary, neutral, plus [needed status roles]), and a defined type scale at [sizes]. Elevation has three levels: surface, raised, overlay. All components must declare their interactive states. Avoid decorative gradients, ambient glassmorphism, and per-component shadows. Content should reflect realistic density and length.

Avoid prompts like "modern," "clean," "sleek," "minimal," or "aesthetic" with no further specification. They produce the exact generic output this skill exists to prevent. Constraints produce distinctive results.
