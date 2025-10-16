# Design Document

## Overview

The MediaOdyssey enhancement design transforms the existing React + Vite application to precisely match the provided UI mockups from WEEK6/END_EXPECTED_UI MOCKUPS while following the established design guidelines. The focus is on implementing the specific visual elements, color schemes, typography, and animations outlined in the design_guidelines.md to create the intended Candy Crush-style futuristic media timeline experience.

The enhancement maintains the current component architecture while upgrading visual fidelity, implementing the exact color palette (deep space navy → teal → purple → golden amber), and adding the specified glowing effects, SVG path animations, and modal designs shown in the mockups.

## Architecture

### Visual Enhancement Strategy

The existing components will be enhanced to match the design guidelines specifications:

**Current Components to Enhance:**
- `LevelNode.tsx` → Implement glowing orbs with cyan borders and golden rings
- `LevelModal.tsx` → Add frosted glass backdrop-blur-md with cyan borders
- `ProgressBar.tsx` → Implement teal-to-golden gradient fill with smooth transitions
- `BadgeCard.tsx` → Add golden glow effects for earned badges
- `ConnectingPath.tsx` → Enhance with golden gradient SVG paths and glow effects

**New Visual Components:**
```
src/components/
├── visual/
│   ├── GradientBackground.tsx      # Primary gradient implementation
│   ├── GlowEffect.tsx              # Reusable glow wrapper component  
│   └── AnimatedSVGPath.tsx         # GSAP drawSVG path component
├── enhanced/ (existing components with visual upgrades)
└── ui/ (existing shadcn components)
```

### Color Palette Implementation

Following the design guidelines, implement the exact color system:

```css
/* Primary Gradient - Deep space navy → Teal → Purple → Golden amber */
.primary-gradient {
  background: linear-gradient(135deg, 
    hsl(230, 35%, 8%) 0%,
    hsl(180, 45%, 25%) 35%,
    hsl(270, 40%, 20%) 70%,
    hsl(45, 80%, 50%) 100%
  );
}

/* Accent Colors */
.cyan-glow { color: hsl(180, 85%, 65%); }
.golden-path { color: hsl(45, 90%, 55%); }
.emerald-complete { color: hsl(150, 70%, 50%); }
.muted-locked { color: hsl(220, 10%, 40%); }
```

### Typography System

Implement the specified font hierarchy:

```css
/* Display Font - Orbitron for headings */
.font-display { font-family: 'Orbitron', monospace; }

/* Primary Font - Inter for UI elements */
.font-primary { font-family: 'Inter', sans-serif; }

/* Type Scale */
.hero-title { font-size: clamp(4rem, 8vw, 6rem); font-weight: 800; }
.era-name { font-size: 2rem; font-weight: 600; }
.level-number { font-size: 1.5rem; font-weight: 700; }
```

## Components and Interfaces

### Enhanced Level Node Implementation

**Current Enhancement:** Upgrade existing `LevelNode.tsx` to match design guidelines exactly.

**Visual Specifications (per design guidelines):**
- **Unlocked State:** w-20 h-20 (mobile) / w-24 h-24 (desktop), glowing cyan border-4, pulsing shadow animation
- **Locked State:** Same dimensions, grayscale filter, opacity-50, lock icon overlay
- **Current Level:** Golden ring indicator (border-yellow-400 border-4), animated pulse
- **Completed:** Emerald glow with checkmark indicator

**Required CSS Classes:**
```css
/* Unlocked node */
.node-unlocked {
  @apply w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-cyan-400;
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
  animation: pulse-glow 2s infinite;
}

/* Current level golden ring */
.node-current {
  @apply border-yellow-400;
  animation: pulse-gold 1.5s infinite;
}

/* Completed emerald glow */
.node-completed {
  @apply border-emerald-400;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}
```

### SVG Path Enhancement

**Current Enhancement:** Upgrade existing path rendering in `LevelMap.tsx` to match design guidelines.

**Visual Specifications (per design guidelines):**
- **Stroke Width:** 3-4px with golden gradient (from gold to cyan at destination)
- **Glow Effect:** filter: drop-shadow with 8px blur in golden hue
- **Animation:** GSAP drawSVG reveals sequentially as levels unlock (1s duration)

**Implementation:**
```typescript
// Enhanced SVG path with golden gradient and glow
<defs>
  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stopColor="hsl(45, 90%, 55%)" />
    <stop offset="100%" stopColor="hsl(180, 85%, 65%)" />
  </linearGradient>
</defs>

<path
  d={pathData}
  stroke="url(#pathGradient)"
  strokeWidth="4"
  fill="none"
  style={{
    filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
    strokeDasharray: length,
    strokeDashoffset: isUnlocked ? 0 : length
  }}
/>
```

### Arin Avatar Enhancement

**Current Enhancement:** Enhance existing Arin avatar in `LevelMap.tsx` with design guideline specifications.

**Visual Specifications:**
- **Size:** 48px (w-12 h-12) cyan-to-teal gradient orb
- **Icon:** Sparkles icon (existing implementation is correct)
- **Border:** 4px cyan border with glow effect
- **Animation:** Floating animation (±8px vertical) and travel animations

**Enhanced Implementation:**
```css
.arin-avatar {
  @apply w-12 h-12 rounded-full border-4 border-cyan-300;
  background: linear-gradient(135deg, hsl(180, 85%, 65%), hsl(180, 45%, 45%));
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
}

.arin-floating {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

### Modal Enhancement

**Current Enhancement:** Upgrade existing `LevelModal.tsx` to match design guidelines exactly.

**Visual Specifications (per design guidelines):**
- **Container:** Dark backdrop with backdrop-blur-md, rounded-2xl panel with border-cyan-500/30
- **Layout:** Two-column layout on desktop (7/5 split for content/media), single column on mobile
- **Video Player:** 16:9 aspect ratio container, rounded-lg overflow, custom play controls with golden accents
- **Buttons:** Primary (golden gradient), Secondary (cyan outline with blur)

**Required CSS Enhancement:**
```css
.modal-container {
  @apply bg-slate-900/95 border border-cyan-500/30 rounded-2xl;
  backdrop-filter: blur(12px);
}

.modal-video-area {
  @apply aspect-video bg-slate-800 rounded-lg border border-cyan-500/30;
}

.button-primary {
  @apply bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full px-8 py-3;
  transition: transform 0.2s ease;
}

.button-primary:hover {
  transform: scale(1.05);
}
```

### Progress Bar Enhancement

**Current Enhancement:** Upgrade existing `ProgressBar.tsx` to match design guidelines.

**Visual Specifications (per design guidelines):**
- **Style:** Full-width bar, h-3, rounded-full
- **Fill:** Gradient from teal to golden, transition-all duration-500 for smooth progression
- **Container:** Dark background (bg-gray-900/50), backdrop-blur-sm
- **Text:** Shows percentage text (text-xs text-cyan-400)

**Enhanced Implementation:**
```css
.progress-container {
  @apply h-3 bg-gray-900/50 rounded-full border border-cyan-500/30;
  backdrop-filter: blur(4px);
}

.progress-fill {
  @apply h-full rounded-full transition-all duration-500;
  background: linear-gradient(90deg, hsl(180, 45%, 45%), hsl(45, 90%, 55%));
}

.progress-text {
  @apply text-xs text-cyan-400 text-center mt-2 font-mono;
}
```

## Data Models

### Badge Card Enhancement

**Current Enhancement:** Upgrade existing `BadgeCard.tsx` to match design guidelines.

**Visual Specifications (per design guidelines):**
- **Container:** Aspect-square cards, rounded-xl, border with golden glow for earned badges
- **Earned State:** Full color with glow effect (shadow-lg shadow-yellow-500/50)
- **Locked State:** Grayscale with opacity-30, subtle border-gray-600
- **Content:** Centered badge icon (w-16 h-16), badge name below (text-sm font-semibold)

**Enhanced Implementation:**
```css
.badge-earned {
  @apply aspect-square rounded-xl border-2 border-yellow-400 p-6;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1));
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.5);
}

.badge-locked {
  @apply aspect-square rounded-xl border-2 border-gray-600 p-6 opacity-30 grayscale;
  background: rgba(31, 41, 55, 0.3);
}

.badge-icon {
  @apply w-16 h-16 text-5xl md:text-6xl mb-4;
}
```

### Animation Specifications

**Level Unlock Animation (per design guidelines):**
1. GSAP timeline: Path draws from previous node (1s duration)
2. Next node fades in (0.5s) with scale transform from 0.8 to 1
3. Glow effect pulses three times
4. Optional subtle golden sparkles completion effect

**Modal Transitions (per design guidelines):**
- Entry: Framer Motion scale from 0.9 to 1, opacity 0 to 1, duration 300ms, easing ease-out
- Exit: Scale to 0.95, opacity to 0, duration 200ms
- Backdrop: Fade in/out with backdrop-blur effect

**Hover Effects (per design guidelines):**
- Nodes: Scale 1.1 transform, glow intensity increases, transition-all duration-200
- Buttons: Slight lift (translateY -2px), shadow expansion
- Cards: Subtle scale 1.02, border glow intensifies

## Responsive Design Implementation

### Breakpoint Specifications (per design guidelines)

**Mobile (< 768px):**
- Single-column layouts, vertical node progression
- Reduced spacing (p-4 instead of p-8)
- Smaller typography scale
- Linear vertical path with nodes stacked
- Simplified connecting lines

**Tablet (768-1024px):**
- Two-column badge grid
- Condensed node map with tighter spacing

**Desktop (> 1024px):**
- Full multi-path node network
- Three-column badge grid
- Expanded modal layouts
- Organic branching paths with nodes positioned across full width

### Layout System Implementation

**Spacing Primitives (per design guidelines):**
- Primary Units: Tailwind spacing of 2, 4, 8, 12, 16, 20, 24
- Node Spacing: 16-20 units between level nodes vertically, 24-32 units horizontally
- Modal Padding: p-8 for desktop, p-6 for mobile
- Section Spacing: py-16 for major sections, py-8 for subsections

## Accessibility Implementation

### Focus States (per design guidelines)
- All interactive nodes have clear focus states (ring-2 ring-cyan-400)
- Keyboard navigation supported for all modal interactions
- Screen reader labels for progress percentages and achievement counts

### Color Accessibility (per design guidelines)
- Color combinations maintain WCAG AA contrast ratios (text on dark backgrounds)
- Locked states communicated through icons and text, not color alone

### Motion Accessibility
- Respect `prefers-reduced-motion` media query
- Provide CSS-only fallbacks for GSAP animations
- Ensure core functionality works without animations

```css
@media (prefers-reduced-motion: reduce) {
  .node-unlocked {
    animation: none;
  }
  
  .progress-fill {
    transition: none;
  }
  
  /* Disable all GSAP animations */
  .gsap-animation {
    animation: none !important;
    transition: none !important;
  }
}
```

## Implementation Priority

### Primary Visual Enhancements (Match UI Mockups)
1. **Color Palette Implementation** - Apply exact gradient and accent colors from design guidelines
2. **Typography System** - Implement Orbitron display font and Inter primary font with proper scales
3. **Level Node Enhancement** - Upgrade to glowing orbs with cyan borders and golden rings
4. **SVG Path Enhancement** - Add golden gradient paths with glow effects and GSAP draw animations
5. **Modal Enhancement** - Implement frosted glass backdrop-blur design with cyan borders

### Secondary Enhancements
1. **Progress Bar Enhancement** - Teal-to-golden gradient fill with smooth transitions
2. **Badge Card Enhancement** - Golden glow effects for earned badges, grayscale for locked
3. **Arin Avatar Enhancement** - Floating animation and travel effects
4. **Responsive Design** - Mobile vertical layout, desktop branching paths
5. **Accessibility** - Focus states, reduced motion support, WCAG compliance

### Animation Specifications
- **Level Unlock:** 1s path draw + 0.5s node fade-in + 3x glow pulse
- **Modal Transitions:** 300ms scale + opacity animations
- **Hover Effects:** 200ms scale + glow intensity changes
- **Page Transitions:** 400ms fade crossfade between routes