# GooseUI

A shadcn/ui registry of components that ship as little JavaScript as possible. State lives in native HTML (`<details>`, `<dialog>`, `popover`, radio inputs with `:has()`), motion in CSS (scroll-driven animations, View Transitions, `@starting-style`). A component turns into a client component only when there is no way around it, so pages keep their PageSpeed score.

86 components, 12 effects and 12 hooks. Docs in English and Russian at [gooseui.pro](https://gooseui.pro).

## Install

GooseUI is an official shadcn registry, components install with the shadcn CLI:

```bash
npx shadcn@latest add @gooseui/button
pnpm dlx shadcn@latest add @gooseui/button
yarn dlx shadcn@latest add @gooseui/button
bunx --bun shadcn@latest add @gooseui/button
```

The code is copied into your project, there is no package to keep up to date.

## Principles

- **Server first.** About 40% of the registry sends no JavaScript to the browser at all. The rest loads only the script it needs: `measure-js` reports the weight of every item.
- **No runtime dependencies.** Components use only `react` and `cn`. No Radix, no Motion, no icon packages, icons are inline SVG.
- **Baseline.** The main behaviour relies on features that are Baseline widely or newly available. Newer CSS (anchor positioning, `interestfor`, `corner-shape`) is a progressive enhancement with a fallback. Every docs page shows a support table and checks the visitor's browser.
- **Works without JavaScript.** The accordion, tabs, switch, hint, skeletons, marquee and the language switcher keep working with JavaScript disabled.
- **Theme tokens.** Colors come from shadcn CSS variables, dark mode and the theme customizer apply to everything.
- **Accessible.** Keyboard support, focus rings, ARIA states and `prefers-reduced-motion` in every animated item.

## What is inside

| Group | Examples |
|-------|----------|
| Inputs | Button, Input, Floating Label Input, Checkbox, Radio, Switch, Slider, Range Slider, OTP Input, Phone Input, Rating, Dropzone, Signature Pad, Searchbar |
| Overlays | Dialog, Sheet, Dropdown Menu, Tooltip, Hint, Responsive Hint, Morphing Dialog, Image Viewer, Video Dialog |
| Navigation | Tabs, Breadcrumb, Table of Contents, ScrollSpy, Scroll To Top, Language Switcher, Search Panel |
| Feedback | Toast (native, sonner-style stack), Skeleton, Progress Ring, Step Progress, Cookie Consent, Notification Prompt |
| Data | Activity Heatmap, Gantt Chart, Radar Chart, Gauge, Timeline, Rating Breakdown, Booking Calendar, Stat Counter |
| Media | Carousel (scroll-snap), Compare Slider, Video Hover Preview, Video Synced Steps, Hover Scroll Screenshot |
| Layout | Card, Adaptive Grid (container queries), Scroll Container, Fade Scroller, Stacking Cards, Marquee |
| Utilities | Copy Button, Copy Field, Share Buttons, Add to Calendar, Install Command, Relative Time, Theme Toggle, Theme Customizer |

**Effects:** Border Beam, Confetti, Click Sparks, Dither Background, Mesh Gradient, Glitch Text, Highlight Text, Rotating Text, Scroll Word Reveal, Reveal on Scroll, Dashed Line, Theme Transition.

**Hooks:** useCopyToClipboard, useFileDrop, useNow, useNotificationPermission, useScrollSpy, useKeyboardLayout, useDeferredInteraction, useHorizontalWheel, useKeyboardFit, useNearViewport, useScrollThreshold, useSoundEffects.

The full list with live demos is at [gooseui.pro/docs](https://gooseui.pro/docs).

## Development

```bash
pnpm install
pnpm dev               # docs site on localhost:3000
pnpm registry:build    # build public/r/*.json for the shadcn CLI
pnpm typecheck
pnpm lint              # biome
node scripts/measure-js.mjs   # client JS weight of every registry item
```

Registry sources live in `registry/gooseui/{ui,effects,hooks,lib,blocks}`, docs pages in `app/[locale]/(docs)/docs`.

## Stack

Next.js 16, React 19, Tailwind CSS v4, next-intl for the docs, Biome.

## License

MIT
