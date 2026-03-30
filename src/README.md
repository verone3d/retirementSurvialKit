# Source Architecture

Documentation for the `src/` directory of the Retirement Survival Kit.

---

## File Overview

```
src/
├── App.jsx     # Main application (~2,368 lines) — entire app in one file
└── main.jsx    # React entry point (10 lines)
```

---

## main.jsx

The minimal React 18 entry point. Mounts the `App` component into the `#root` div defined in `index.html`.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- `React.StrictMode` enabled — surfaces deprecated APIs and double-invokes effects in development
- No routing library — navigation is handled via React state inside `App.jsx`
- No global CSS import — all styles come from Tailwind CSS classes and the `index.html` CDN link

---

## App.jsx Structure

The entire application lives in a single component file. Components are defined in this order:

```
1. Imports (lucide-react icons, React hooks)
2. CHAPTERS constant (metadata array)
3. Shared UI Components
4. Chapter Components (Ch1 through Ch12)
5. Navigation Components (Sidebar, CompletionScreen)
6. Main App Component (default export)
```

---

## CHAPTERS Constant

```js
const CHAPTERS = [
  { id: 1,  title: 'Welcome to Day One',        icon: Sunrise,   steps: 3 },
  { id: 2,  title: 'GitHub — Store Everything', icon: GitBranch, steps: 5 },
  { id: 3,  title: 'Your Raspberry Pi 400',     icon: Cpu,       steps: 6 },
  { id: 4,  title: 'The Tiny Display',          icon: Monitor,   steps: 4 },
  { id: 5,  title: 'Move Every Day',            icon: Dumbbell,  steps: 5 },
  { id: 6,  title: 'Breathe',                   icon: Wind,      steps: 4 },
  { id: 7,  title: 'Sleep Well',                icon: Moon,      steps: 5 },
  { id: 8,  title: 'Eat Well',                  icon: Utensils,  steps: 5 },
  { id: 9,  title: 'Make Things',               icon: Printer,   steps: 5 },
  { id: 10, title: 'Words to Live By',          icon: Star,      steps: 1 },
  { id: 11, title: 'Give Back',                 icon: Heart,     steps: 4 },
  { id: 12, title: 'Never Stop Learning',       icon: BookOpen,  steps: 1 },
]
```

This array drives the sidebar, progress tracking, and chapter rendering. Adding a chapter requires adding an entry here and defining a corresponding chapter component.

---

## Shared UI Components

### `CodeBlock`

Terminal-style code display with macOS-style traffic light dots and copy-to-clipboard functionality.

**Props:**
- `code` (string) — the code/command text to display
- `lang` (string, optional) — label shown in the terminal header bar (defaults to `"terminal"`)

**Behavior:**
- Uses `navigator.clipboard.writeText()` for copy
- Shows "Copied!" with a checkmark for 2 seconds after copying
- Styled with `bg-gray-950`, `text-green-300`, `font-mono`
- Horizontally scrollable for long lines

**Usage:**
```jsx
<CodeBlock code="sudo apt update && sudo apt upgrade -y" lang="bash" />
```

---

### `Callout`

Alert/callout box with four semantic variants.

**Props:**
- `type` (string) — `"info"` | `"warning"` | `"success"` | `"tip"` (defaults to `"info"`)
- `title` (string, optional) — bold heading inside the callout
- `children` — callout body content

**Variants:**

| Type | Colors | Icon |
|------|--------|------|
| `info` | Blue | `Info` |
| `warning` | Yellow | `AlertCircle` |
| `success` | Amber | `CheckCircle2` |
| `tip` | Purple | `Lightbulb` |

**Usage:**
```jsx
<Callout type="tip" title="Pro Tip">
  Write prompts in claude.ai first to save API tokens.
</Callout>
```

---

### `StepNumber`

Numbered step indicator circle used to mark sequential steps within a chapter.

**Props:**
- `n` (number) — the step number to display

**Usage:**
```jsx
<StepNumber n={1} />
```

---

### `SectionTitle`

Section heading within a chapter, with optional icon support.

**Props:**
- `children` — heading text
- `icon` (component, optional) — lucide-react icon component

---

### `ResourceLink`

External link card for pointing readers to outside resources.

**Props:**
- `href` (string) — external URL
- `title` (string) — link title
- `description` (string) — one-line description

Renders with an `ExternalLink` icon and opens in a new tab with `rel="noopener noreferrer"`.

---

### `QuoteCard`

Styled quote display with attribution. Used in Chapter 10.

**Props:**
- `quote` (string) — the quote text
- `author` (string) — attribution name

---

## Chapter Components

Each chapter is a named function component (e.g., `Chapter1`, `Chapter2`, etc.) that returns JSX. They accept no props — all content is hardcoded.

Chapters use a consistent internal structure:

```jsx
function ChapterN() {
  return (
    <div className="...">
      {/* Chapter intro */}
      {/* StepNumber + step content blocks */}
      {/* Callout boxes for tips/warnings */}
      {/* CodeBlock for terminal commands */}
      {/* ResourceLink for external resources */}
    </div>
  )
}
```

**Exception — Chapter 10 (Words to Live By):**
Uses local state (`useState`) to manage the quote randomizer and "view all" toggle. This is the only chapter component with internal state.

---

## Navigation Components

### `Sidebar`

Renders the chapter list with progress indicators.

**Receives from App:**
- `current` — active chapter ID
- `completed` — `Set` of completed chapter IDs
- `onSelect(id)` — callback when a chapter is clicked
- `isOpen` — controls mobile overlay visibility
- `onClose` — callback to close mobile overlay

**Desktop behavior:** Fixed left sidebar, always visible, 64px wide.
**Mobile behavior:** Absolutely positioned overlay, toggled by hamburger button, closes on chapter selection.

---

### `CompletionScreen`

Shown when all 12 chapters are marked complete. Displays a checklist summary of every chapter title with a trophy icon and encouragement message.

**Receives from App:**
- `onRestart` — callback to reset completion state and return to Chapter 1

---

## Main App Component

The default export. Manages all application state and layout.

### State

```js
const [current, setCurrent]         = useState(1)         // Active chapter ID (1–12)
const [completed, setCompleted]      = useState(new Set()) // Set of completed chapter IDs
const [showCompletion, setShowCompletion] = useState(false) // Completion screen visibility
const [sidebarOpen, setSidebarOpen]  = useState(false)     // Mobile sidebar toggle
```

### Key Callbacks

- `handleSelect(id)` — navigates to chapter, marks previous as complete, closes mobile sidebar
- `handleNext()` — advance to next chapter, mark current as complete
- `handlePrev()` — go back one chapter
- `handleFinish()` — mark Chapter 12 complete and show completion screen
- `handleRestart()` — reset all state to initial values

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Fixed top bar (chapter title + progress dots)   │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Chapter content (scrollable)        │
│ (fixed)  │                                      │
│          │  [Prev] [Next/Finish] buttons        │
└──────────┴──────────────────────────────────────┘
```

**Desktop (lg+):** Sidebar is always visible, content area has left margin to accommodate it.
**Mobile:** Sidebar is hidden behind a hamburger button (Menu icon) in the top bar. Tapping opens an overlay sidebar.

### Chapter Rendering

A lookup object maps chapter IDs to their component functions:

```js
const chapterMap = {
  1: Chapter1,
  2: Chapter2,
  // ...
  12: Chapter12,
}
const ChapterComponent = chapterMap[current]
```

---

## Styling Conventions

All styling uses Tailwind CSS utility classes. Key patterns:

| Pattern | Purpose |
|---------|---------|
| `bg-gray-950` | Page background (near-black) |
| `bg-gray-900` | Card/panel backgrounds |
| `text-amber-400` | Primary accent color |
| `border-gray-700` | Standard border color |
| `font-mono` | JetBrains Mono font (code and UI elements) |
| `text-gray-300` / `text-gray-400` | Body text hierarchy |

Dark amber is the consistent brand color throughout — amber highlights, amber progress indicators, amber hover states.

---

## Adding a New Chapter

1. Add an entry to the `CHAPTERS` array with `id`, `title`, `icon`, and `steps`
2. Create a new function component `ChapterN()`
3. Add the mapping in `chapterMap` inside the main `App` component
4. Update the `handleNext`/`handleFinish` logic if the chapter count changes

---

## Icons

All icons are from `lucide-react`. The full import list at the top of `App.jsx`:

```js
import {
  CheckCircle2, ChevronRight, ChevronLeft, Copy, Check,
  Sunrise, Cpu, Monitor, Dumbbell, Wind, Moon, Utensils,
  Printer, Star, BookOpen, Heart, Trophy, AlertCircle,
  Info, Lightbulb, Sparkles, Menu, X,
  ExternalLink as LinkOut, Quote, GitBranch, RefreshCw, Users,
} from 'lucide-react'
```
