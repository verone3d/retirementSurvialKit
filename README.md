# Retirement Survival Kit

A personal gift for a retiring colleague — an interactive 12-chapter web guide covering technology skills, maker projects, and life/wellness habits for a meaningful, engaged retirement.

**Live site:** [verone3d.github.io/retirementSurvialKit](https://verone3d.github.io/retirementSurvialKit)

---

## Philosophy

> *"Get up and learn one thing every day."*
> — Ralph E. Mong Sr. (1899–?)

This kit is built on four core beliefs:

1. Mistakes and failures are how we learn
2. Your body is the most important machine you own
3. No one will look out for you — take responsibility
4. Never stop learning and moving

Applied consistently over 50+ years, daily learning compounds into a remarkable life.

---

## What's Inside

| # | Chapter | Topic |
|---|---------|-------|
| 1 | Welcome to Day One | Philosophy, kit overview, core mindset |
| 2 | GitHub — Store Everything | Version control, git basics, saving prompts |
| 3 | Your Raspberry Pi 400 | Setup, terminal, Claude Code on Pi, SD backup |
| 4 | The Tiny Display | ESP32 CYD IoT projects, Arduino IDE |
| 5 | Move Every Day | Resistance bands, progressive training |
| 6 | Breathe | Box breathing, 4-7-8, nervous system tools |
| 7 | Sleep Well | Circadian rhythm, wake time, environment |
| 8 | Eat Well | Protein, real food, meal timing |
| 9 | Make Things | 3D printing with Bambu A1 Mini |
| 10 | Words to Live By | Curated quotes, interactive randomizer |
| 11 | Give Back | Amateur radio, See3D project, community |
| 12 | Never Stop Learning | Curated books, courses, and resources |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3.1 |
| Build tool | Vite 5.4.10 |
| Styling | Tailwind CSS (CDN) |
| Font | JetBrains Mono (Google Fonts) |
| Icons | lucide-react 0.462.0 |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Local Development

```bash
# Clone the repository
git clone https://github.com/verone3d/retirementSurvialKit.git
cd retirementSurvialKit

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. The base path is set to `/retirementSurvialKit/` for GitHub Pages subdirectory hosting.

### Preview Production Build

```bash
npm run preview
```

---

## Deployment

Deployment is fully automated via GitHub Actions. Any push to the `main` branch triggers the pipeline:

1. Checkout code
2. Setup Node.js 20 with npm caching
3. `npm ci` — clean install
4. `npm run build` — Vite production build
5. Upload `dist/` as GitHub Pages artifact
6. Deploy to GitHub Pages

See [`.github/workflows/README.md`](.github/workflows/README.md) for full CI/CD documentation.

---

## Project Structure

```
retirementSurvialKit/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Actions CI/CD pipeline
│       └── README.md           # CI/CD documentation
├── src/
│   ├── App.jsx                 # Main application (all 12 chapters)
│   ├── main.jsx                # React entry point
│   └── README.md               # Source architecture documentation
├── index.html                  # HTML entry point, Tailwind CDN, fonts
├── vite.config.js              # Vite configuration with GitHub Pages base
├── package.json                # Dependencies and scripts
├── CHAPTERS.md                 # Detailed chapter content guide
└── README.md                   # This file
```

---

## Interactive Features

- **Chapter progress tracking** — sidebar marks chapters complete as you work through them
- **Progress dots** — top bar shows completion count across all 12 chapters
- **Completion screen** — full checklist summary appears when all chapters are done
- **Code blocks** — terminal-styled with one-click copy to clipboard
- **Quote randomizer** — Chapter 10 cycles through curated wisdom
- **Responsive layout** — fixed sidebar on desktop, hamburger nav on mobile

---

## Companion Hardware

The kit is designed around physical items:

- **Raspberry Pi 400** — all-in-one keyboard computer for learning Linux and running Claude Code
- **ESP32 Cheap Yellow Display (CYD)** — WiFi microcontroller with touchscreen for IoT projects
- **Bambu A1 Mini** — 3D printer available to borrow for making physical objects
- **Resistance bands** — for the daily movement practice in Chapter 5

---

## Related Projects

- [See3D](https://see3d.org) — mentioned in Chapter 11, born from a personal health challenge in July 2020
- [ARRL](https://www.arrl.org) — Amateur radio resources referenced in Chapter 11

---

## License

Private project — personal gift. Not intended for redistribution.
