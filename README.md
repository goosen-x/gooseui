# GooseUI

A modern, beautiful component library for React and Next.js. Built on top of shadcn/ui with custom components, effects, and theming.

## Features

- **Custom Components** - Button, Card, Input, Typography, Toast, and more
- **Visual Effects** - Border Beam, animated gradients
- **Theme Customizer** - 5 variants of floating theme/color picker
- **Tailwind CSS v4** - Modern styling with CSS variables
- **Dark/Light Mode** - Full theme support with next-themes
- **CLI Installation** - Install components directly via shadcn CLI

## Installation

Install components using the shadcn CLI:

```bash
npx shadcn@latest add https://gooseui.pro/r/button.json
```

Or with other package managers:

```bash
# pnpm
pnpm dlx shadcn@latest add https://gooseui.pro/r/button.json

# yarn
npx shadcn@latest add https://gooseui.pro/r/button.json

# bun
bunx --bun shadcn@latest add https://gooseui.pro/r/button.json
```

## Available Components

### UI Components

| Component | Description |
|-----------|-------------|
| `button` | Button with multiple variants and sizes |
| `card` | Card with header, content, and footer |
| `input` | Input field with validation states |
| `label` | Accessible label for form controls |
| `textarea` | Multiline text input |
| `typography` | Text styling with semantic variants and gradients |
| `theme-customizer` | Floating theme/color picker (5 variants) |
| `animated-timer` | Animated clock with sliding digits |

### Effects

| Effect | Description |
|--------|-------------|
| `border-beam` | Animated beam traveling along container border |

### Toast System

| Component | Description |
|-----------|-------------|
| `sonner` | Base toast provider with theming |
| `custom-toast` | Beautiful toast with progress bar |
| `toast` | Helper functions for notifications |

### Blocks

| Block | Description |
|-------|-------------|
| `example-form` | Contact form with Zod validation |
| `complex-component` | Multi-file component example |

## Documentation

Visit [gooseui.pro/docs](https://gooseui.pro/docs) for full documentation.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build registry
pnpm registry:build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI primitives
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Theming**: next-themes

## License

MIT
