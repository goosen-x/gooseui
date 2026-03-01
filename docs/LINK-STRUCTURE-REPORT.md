# Link Structure Report

Generated: 2026-01-10

## Summary

| Category | Count |
|----------|-------|
| Navigation Items | 38 |
| Actual Pages | 49 |
| Valid Links | 34 |
| Coming Soon (no page) | 4 |
| Standalone Pages | 15 |

---

## Navigation Structure

### Getting Started
| Title | Href | Status |
|-------|------|--------|
| Introduction | `/docs` | Active |
| Installation | `/docs/installation` | Active |
| CLI | `/docs/cli` | Active |

### Components (22 items)
| Title | Href | Status | Page Exists |
|-------|------|--------|-------------|
| Adaptive Grid | `/docs/components/adaptive-grid` | New | Yes |
| Animated Timer | `/docs/components/animated-timer` | Active | Yes |
| Badge | `/docs/components/badge` | New | Yes |
| Baseline Status | `/docs/components/baseline-status` | New | Yes |
| Button | `/docs/components/button` | Active | Yes |
| Card | `/docs/components/card` | Active | Yes |
| Carousel | `/docs/components/carousel` | New | Yes |
| Checkbox | `/docs/components/checkbox` | New | Yes |
| Digital Clock | `/docs/components/digital-clock` | New | Yes |
| Input | `/docs/components/input` | Active | Yes |
| Morphing Dialog | `/docs/components/morphing-dialog` | New | Yes |
| Morphing Header | `/docs/components/morphing-header` | Draft | Yes |
| Promo Banner | `/docs/components/promo-banner` | New | Yes |
| Scroll Container | `/docs/components/scroll-container` | Draft | Yes |
| Scroll Progress | `/docs/components/scroll-progress` | Draft | Yes |
| Scroll To Top | `/docs/components/scroll-to-top` | New | Yes |
| Slider | `/docs/components/slider` | Draft | Yes |
| Sliding Number | `/docs/components/sliding-number` | Draft | Yes |
| Smart Form | `/docs/components/smart-form` | Draft | Yes |
| Stacking Cards | `/docs/components/stacking-cards` | Draft | Yes |
| SVG Drawable | `/docs/components/svg-drawable` | Draft | Yes |
| Theme Customizer | `/docs/components/theme-customizer` | New | Yes |
| Toast | `/docs/components/toast` | Active | Yes |
| Typography | `/docs/components/typography` | Active | Yes |
| Radio | `/docs/components/radio` | Coming Soon | No |
| Select | `/docs/components/select` | Coming Soon | No |
| Switch | `/docs/components/switch` | Coming Soon | No |
| Tabs | `/docs/components/tabs` | Coming Soon | No |

### Effects (4 items)
| Title | Href | Status | Page Exists |
|-------|------|--------|-------------|
| Border Beam | `/docs/effects/border-beam` | New | Yes |
| Glitch Text | `/docs/effects/glitch-text` | Draft | Yes |
| Parallax Cards | `/docs/effects/parallax-cards` | Draft | Yes |
| Reveal on Scroll | `/docs/effects/reveal-on-scroll` | Draft | Yes |

### Experimental (1 item)
| Title | Href | Status | Page Exists |
|-------|------|--------|-------------|
| Anchor Tooltip | `/docs/experimental/anchor-tooltip` | Experimental | Yes |

### Blocks (1 item)
| Title | Href | Status | Page Exists |
|-------|------|--------|-------------|
| Blocks Overview | `/docs/blocks` | Draft | Yes |

---

## Standalone Pages (not in docs navigation)

### Marketing
| Page | Path |
|------|------|
| Landing | `/` |
| Pricing | `/pricing` |

### Auth
| Page | Path |
|------|------|
| Login | `/login` |
| Sign Up | `/signup` |

### App
| Page | Path |
|------|------|
| Generate (Constructor) | `/generate` |
| Account | `/account` |
| Dashboard | `/dashboard` |

### Legal
| Page | Path |
|------|------|
| Privacy Policy | `/privacy` |
| Refund Policy | `/refund` |
| Terms of Service | `/terms` |

### Index Pages
| Page | Path |
|------|------|
| Components Index | `/docs/components` |
| Effects Index | `/docs/effects` |
| Experimental Index | `/docs/experimental` |

### Dynamic Routes
| Page | Path |
|------|------|
| Block Category | `/docs/blocks/[category]` |
| Block Detail | `/docs/blocks/[category]/[slug]` |
| Block Preview | `/blocks/preview/[blockId]` |

---

## Status Legend

| Badge | Meaning |
|-------|---------|
| Active | Production-ready component |
| New | Recently added component |
| Draft | Work in progress (dev only) |
| Experimental | Limited browser support |
| Coming Soon | Planned, no page yet |

---

## Recommendations

1. **Coming Soon pages**: Consider creating placeholder pages for Radio, Select, Switch, Tabs
2. **Index pages**: `/docs/components`, `/docs/effects`, `/docs/experimental` exist but not in sidebar nav
3. **Blocks section**: Currently draft, needs more content before production

---

## File Locations

- Navigation config: `lib/config/docs-navigation.ts`
- Pages: `app/(docs)/docs/`
- Sidebar: `components/docs-sidebar.tsx`
