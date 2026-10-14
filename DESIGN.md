# DESIGN SYSTEM & ARCHITECTURE SPECIFICATION
## ELSEWHERE FILMS — Landmark Digital Experience

### 1. Brand Concept & Creative Direction
- **Identity:** ELSEWHERE FILMS
- **Concept:** *BEYOND THE FINAL FRAME*
- **Brand Purpose:** Independent cinema strategy, festival pathway, international distribution, and co-production for South Asian cinema.
- **Narrative Arc:** A film has completed its cut. Its journey through the world has just begun. The digital experience moves from the quiet darkness of the cutting room / projection booth through a tactile, physical 35mm film reel, transitioning into an expansive, warm editorial canvas.

---

### 2. Color Palette & Design Tokens
Sampled directly from the brand identity and cinematographic environments:

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--color-cinema-black` | `#090909` | Deep Void | Hero backdrop, Why We Exist, Closing section |
| `--color-soft-black` | `#151515` | Surface Black | Film frames, cards, subtle container panels |
| `--color-warm-ivory` | `#F4F1EA` | Editorial Canvas | Vision & Mission, What We Do, Journey Stages, Contact Overlay |
| `--color-pure-white` | `#FFFFFF` | Text Contrast | Primary headline typography over dark |
| `--color-signature-red` | `#D20100` | Accent & Pulse | Logo 'W' detail, active progress bars, subtle word emphasis, active states |
| `--color-muted-grey` | `#777777` | Secondary Meta | Subtitles, film reel edge codes, captions |
| `--color-light-grey` | `#9E9F9F` | Logo Films Subtitle | Subdued secondary branding |
| `--color-hairline-light` | `#D8D5CE` | Structural Grid | Subtle dividers over ivory |
| `--color-hairline-dark` | `#222222` | Structural Grid | Subtle dividers over dark |

Ratio: **70% Quiet Editorial Space / 30% Cinematic Immersion**.

---

### 3. Typography Hierarchy
- **Editorial Display:** `Instrument Serif` (or `Newsreader` / `Cormorant Garamond`)
  - Hero Headline: `clamp(48px, 7vw, 110px)`, line-height: `1.05`, letter-spacing: `-0.02em`
  - Statement Headlines: `clamp(36px, 5.2vw, 76px)`, line-height: `1.12`
  - Section Headings: `clamp(30px, 4vw, 56px)`
- **Body & Interface:** `Plus Jakarta Sans` / `Inter`
  - Large Body: `clamp(18px, 1.8vw, 24px)`, line-height: `1.5`
  - Regular Body: `clamp(15px, 1.1vw, 17px)`, line-height: `1.65`
  - Interface Labels: `11px - 13px`, uppercase, tracking: `0.12em - 0.18em`
- **Metadata & Technical Film Edge Code:** `JetBrains Mono` / `IBM Plex Mono`
  - 35mm edge markings: `10px - 11px`, tracking: `0.2em`, uppercase

---

### 4. Layout & Grid System
- Desktop Margins: `5vw - 7vw` consistent alignment.
- Max Content Container: `1440px` (or full width fluid editorial).
- Section Heights:
  - Hero: `100svh`
  - Signature Film Reel: Desktop pinned scroll sequence (~`350vh` total scroll distance driving horizontal progress)
  - Editorial Sections: generous breathing room (`py-28` to `py-40`)
- Responsive Breakpoints:
  - Mobile: `< 768px` (Fluid single column, native horizontal swipe / vertical stacked reel, sticky bottom trigger)
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px` (Pinned GSAP ScrollTrigger filmstrip, sticky vertical edge tab, custom cursor)

---

### 5. Signature Motion System
1. **Hero Entry & Light Flickering:**
   - 0.0s – 0.8s: Soft ambient projection illumination fades in.
   - 0.8s – 1.8s: Brand logo and minimal navigation appear.
   - 1.3s – 2.5s: Masked text reveal of *"Helping your film find its way into the world."*
2. **Scroll-Driven Filmstrip Sequence:**
   - Physical 35mm filmstrip layout with sprocket perforations, frame counter `[01A]`–`[05A]`, Kodak-style edge codes.
   - Vertical wheel/touch drives horizontal track translation with cubic velocity damping.
   - Frame 1: The Final Cut
   - Frame 2: The Premiere
   - Frame 3: Festivals & Markets
   - Frame 4: Distribution
   - Frame 5: Audiences
3. **The Expansion Transition:**
   - Upon completing the 5th frame, frame expands outwards, dissolving dark into Warm Ivory canvas.
   - Text reveal: *"What comes after the cut can be as important as the cut itself."*
4. **Services Accordion & Micro-Interactions:**
   - Hover translates title horizontally by `8-12px`, index turns signature red, thin hairline reveals.
   - Smooth accordion collapse/expand with accessible ARIA attributes.
5. **Reduced Motion Adaptation (`prefers-reduced-motion`):**
   - Disables pin lock; filmstrip renders as an accessible horizontal scroll container or static sequence.
   - Bypasses text mask splits in favor of direct opacity rendering.
