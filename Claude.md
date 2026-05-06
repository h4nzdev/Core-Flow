**Prompt: CoreFlow Solutions — Intelligent Operations Landing Page (Ausdata.AI-Inspired Design)**

**1. Project Identity**
- **Brand Name:** CoreFlow Solutions
- **Tagline:** Reliable Customer Support & Back Office Teams for Growing Businesses
- **Core Message:** We don’t just staff roles. We build and manage dedicated, tech-enabled offshore teams that integrate seamlessly, scale on demand, and operate with predictable, measurable precision.

**2. Global Design System — The “CoreFlow Matrix” Theme**
The entire page must feel like a sophisticated, living technical console. Avoid the colorful, friendly “BPO” look. Instead, aim for precision, command, and intelligence.

- **Core Concept:** “Operations. Standardized.” — A deep, cool, near-black canvas with a single, high-precision accent color. Every element should feel structured and mathematically sound.
- **Color Palette:**
    - **Background Base (`--obsidian`):** `#03050A` (Deep, cool black-blue).
    - **Surface UI (`--obsidian-surface`):** `#0A0D14` (Slightly lifted for navs and cards).
    - **Grid Lines & Fine Rules (`--border-line`):** `rgba(56, 189, 248, 0.12)` (Subtle cyan-blue).
    - **Primary Accent (`--accent`):** `#38BDF8` (A sharp, bright electric sky-blue for key highlights).
    - **Accent Glow (`--accent-glow`):** `rgba(56, 189, 248, 0.4)` (For glowing shadows on buttons and icons).
    - **Text Primary (`--text-primary`):** `#F0F4F8` (Near-white with slight coolness).
    - **Text Secondary/Muted (`--text-muted`):** `#8094A6` (Steel blue-gray).
    - **Soft Highlight (`--accent-soft`):** `rgba(56, 189, 248, 0.04)` (For card hover states).
- **Typography System:**
    - **Headings (Serif/Scientific):** Use a high-contrast, elegant serif font (e.g., Cormorant Garamond) for major section headlines, styled with mixed `font-light italic` and `font-semibold` for a premium, dual-toned look (e.g., "Reliable. Scalable.").
    - **Body & UI (Monospace):** Use a clean monospace or geometric sans-serif (e.g., Space Mono or Inter) for all body text, labels, buttons, and navigation. Use `letter-spacing: 0.1em` to `0.2em` for all uppercase micro-labels.
- **Visual Motifs:**
    - **The Core Matrix Grid:** A persistent, subtle animated SVG grid in the hero background with glowing blue nodes/intersections. This represents the "CoreFlow Network."
    - **Icons:** All icons are from the `lucide` library, styled with a 1.5px-2px stroke width, colored in `--accent` with a subtle CSS `box-shadow` glow on hover.
    - **Dividers & Borders:** A single pixel line using `--border-line` is a key motif, used to separate sections and create a “circuit board” feel.

**3. Page Structure & Content Block-by-Block**

**Block 1: Navigation (`nav`)**
- **Style:** Floating, with a glass-morphism effect (`backdrop-filter: blur(24px)`, `background: rgba(10, 13, 20, 0.8)`, `border: 1px solid var(--border-line)`). It should have a max-width and be centered.
- **Content:**
    - **Left:** Brand Logo (A minimalist “CF” abstract geometric mark) + Operational Status Indicator (An animated glowing green dot with the label `SYSTEM OPERATIONAL`).
    - **Center:** Clean monospace links: `Services`, `How It Works`, `Pricing`. Each has a subtle underline-on-hover effect using `--accent`.
    - **Right:** A primary CTA button: `Open Console` (Filled with `--accent`, with a glow effect), and a secondary outline button: `Contact`.

**Block 2: Hero Section (`section_hero`)**
- **Background:** The full `--obsidian` background with the animated Core Matrix Grid SVG overlaid at low opacity. A large, soft radial gradient of `--accent-soft` sits behind the main content.
- **Content (Left-Aligned):**
    - **Micro-Label:** `COREFLOW SOLUTIONS · INTELLIGENCE LAYER` (Monospace, `--text-muted`, uppercase, tracked out).
    - **H1 Headline (Mixed Serif Styles):**
        - Line 1: `Reliable.` (Large, `font-light italic`, `--text-primary`)
        - Line 2: `Seamless.` (Same size, `font-semibold`, `opacity: 0.382` for a two-tone effect)
    - **Sub-headline:** `Dedicated teams for growing businesses. We build, train, and manage your customer support & back office operations so you can focus on what's next.` (Monospace body, `--text-muted`, max-width 40ch).
    - **Dual CTA Buttons:**
        - `Book a Free Consultation` (Primary style, with an `→` arrow icon that shifts on hover).
        - `See How It Works` (Secondary, outline-only style).
- **Visual (Right Side):** A 3D wireframe sphere or a low-poly rotating geometric core, subtly pulsing, representing the "CoreFlow" engine. This uses Three.js or a simple CSS animation.

**Block 3: The Problem — "Operational Friction"**
- **Background:** A clean section with `--obsidian-surface`.
- **Layout:** Split into a header and a 3-column grid.
- **Section Separator:** A single-pixel line of `--border-line` before and after the section header to frame it.
- **Header:**
    - **Label:** `THE CHALLENGE`
    - **H2 (Serif, Two-Tone):** `Why Growth Feels Heavy.` / `(System Overload Detected)`
- **Three Problem Cards:**
    - **Card 1:** Icon (A radar/signal icon with an `X`), Title: `Missed Signals`, Desc: `Every unanswered inquiry is lost revenue. Fragmented tools and inboxes create blind spots that hurt your brand.`
    - **Card 2:** Icon (A person with gravity/stress lines), Title: `Overloaded Core`, Desc: `Founders and key operators are buried in administrative noise instead of high-value strategy. Growth grinds to a halt.`
    - **Card 3:** Icon (A broken, zigzag graph line), Title: `Unstable Output`, Desc: `Inconsistent quality and unpredictable availability frustrate customers and prevent you from scaling confidently.`

**Block 4: The Solution — "The CoreFlow Engine"**
- **Background:** `--obsidian` (darker, creating a contrast rhythm).
- **Layout:** A sleek 2-column layout. Left is a code-block-like visual, Right is the explanation.
- **Left Visual (The "Code Block"):**
    - A stylized window with browser "traffic light" dots.
    - Inside, monospace "code" in `--accent` and `--text-primary` colors that reads like a configuration file:
        `import { CoreFlow } from '@coreflow/ops';`
        `const support = CoreFlow.deploy.team({`
        `  roles: ['support', 'admin'],`
        `  scale: 'auto+',`
        `  trainedOn: 'your-knowledge-base'`
        `});`
        `// → Team live in 14 days. 24/7 coverage.`
- **Right Content:**
    - **Label:** `THE SOLUTION`
    - **H2 (Serif, Two-Tone):** `Plug Into Your` / `Dedicated Operations Layer.`
    - **Three Solution Points (Icon + Bold+Desc):**
        - `01. Dedicated Offshore Team`: A team that works exclusively for you, integrated into your culture and tools. Not a shared resource.
        - `02. Trained + Fully Managed`: We handle all recruitment, QA, and day-to-day oversight. You get a turnkey operations arm.
        - `03. Scalable On Command`: Start with what you need. Scale your team up or down as your business demands shift, without the HR nightmare.

**Block 5: The Offer — "Pricing / Starter Package"**
- **Background:** `--obsidian-surface`, bringing back the lighter card aesthetic.
- **Layout:** A prominent, centered "pricing card" that feels like a premium service plan. Use a subtle box-shadow of `--accent-glow` on the card to make it pop.
- **Content:**
    - **Micro-Label (top of card):** `GET STARTED`
    - **H3 (Serif):** `The CoreFlow Starter`
    - **Description:** `For businesses ready to offload customer support & basic back-office tasks. A fully trained unit, operational in under 3 weeks.`
    - **Pricing Display:**
        - `$1,990` (Very large, `--text-primary`)
        - `/mo per dedicated team member` (Monospace, `--text-muted`)
    - **Key Features List:** (Monospace, with subtle checkmark icons)
        - `1 Full-Time Dedicated Agent`
        - `Customer Support & Admin Desk`
        - `Full Training + QA Management`
        - `Bi-Weekly Performance Flash Reports`
        - `14-Day Integration & Onboarding`
    - **Primary CTA:** `Book a Free Consultation` (Full-width button, `--accent` background with glow).

**Block 6: Final CTA — "Ready to Transfer the Operational Load?"**
- **Background:** `--obsidian` with a massive, soft radial gradient of `--accent-soft` spread across the center.
- **Content:** Centered, minimal, and direct.
    - **H2 (Serif):** `Ready for Zero-Friction Operations?`
    - **Body Text:** `Tell us about your biggest operational bottlenecks. We'll design a CoreFlow team blueprint, tailored to your business, at no obligation.`
    - **CTA:** `Book a Free Consultation` (Very large, prominent button).

**4. Technical & Interaction Specifications**
- **Canvas/Mouse Effect:** Implement a subtle, non-intrusive canvas-drawn particle network or a glowing cursor aura that reacts to mouse movement, with a `mix-blend-mode: screen`.
- **Scroll Animations:** All major sections and cards must use scroll-triggered reveals. Elements should fade up and translate slightly on entry.
- **Navigation Reveal:** The floating nav bar should be hidden initially and animate down after the hero section is scrolled past, appearing with a `backdrop-filter` blur transition.
- **Performance:** The 3D hero element should be optimized and non-blocking. Use `content-visibility: auto` for below-the-fold sections to ensure a perfect performance score.

**5. The Unwavering Conversion Goal**
Every visual element, from the "code block" to the glowing CTA buttons, must subliminally reinforce the funnel towards the **"Book a Free Consultation"** action. The design must sell the promise of precision, reliability, and seamless scaling that a simple contact form or generic provider cannot offer.