# Elsewhere Films — Beyond the Final Frame

A landmark digital brand experience for **Elsewhere Films**, an independent cinema strategy, festival pathway, international distribution, and selective co-production company dedicated to South Asian independent cinema.

---

## 🎬 Project Highlights

- **Bespoke 35mm Analog Projection Experience**:
  - Responsive intro banner video with dedicated **16:9 Landscape** (`hero-landscape.mp4`) for desktop/tablet and **9:16 Portrait** (`hero-portrait.mp4`) for mobile devices.
  - Interactive projection playback and audio controls.
- **Physical Filmstrip Ribbon**:
  - Scroll-velocity-driven analog filmstrip featuring anamorphic framing, edge codes (`35MM KODAK 5219`), perforation sprocket tracks, and narrative cards.
- **Four Stages of Engagement**:
  - Parallel, aligned assessment cards covering pre-festival strategy, festival readiness, market circulation, and early selective co-production.
- **Unified Editorial Typography**:
  - 100% unified in **Inter** with Swiss modernist optical tracking, hierarchy, and line metrics.
- **Interactive Engagement Overlay**:
  - Filmmaker intake form with stage selection, screener submissions, and intelligent validation.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS
- **Motion & Scroll**: [GSAP](https://gsap.com/) + ScrollTrigger + [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aiwithsraddha-cmd/elsewhere-films.git
cd elsewhere-films

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Build optimized static bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Repository Structure

```text
├── public/
│   ├── images/         # High-resolution analog cinema and festival stills
│   ├── video/          # 35mm projector background loops (landscape & portrait)
│   ├── logo-dark.png   # Elsewhere Films official dark brandmark
│   └── logo-light.png  # Elsewhere Films official light brandmark
├── src/
│   ├── components/     # Header, Hero, Filmstrip, Vision, Services, Footer, Modals
│   ├── data/           # Structured editorial copy, stages, disciplines, and frames
│   ├── pages/          # Home and Services pages
│   ├── styles/         # Global styles, film grain, sprocket track, and Inter typography
│   └── types/          # TypeScript interface definitions
└── tailwind.config.js  # Theme colors, Cinema Black, Warm Ivory, Signature Red
```

---

## 📄 License

Private repository for Elsewhere Films. All rights reserved.
