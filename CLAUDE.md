# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build & Development
- `npm run dev` - Start development server with Next.js Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run pages:build` - Build for Cloudflare Pages deployment
- `npm run preview` - Preview Cloudflare Pages build locally
- `npm run deploy` - Deploy to Cloudflare Pages

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check Prettier formatting

### Content Generation
- `npm run prebuild-updates` - Generate updates metadata
- `npm run prebuild-lessons` - Generate lessons metadata
- `npm run prebuild-posts` - Generate posts metadata
- `npm run prebuild-all` - Generate all content metadata

## Project Architecture

This is a Next.js 15 application with TypeScript and styled-components, serving multiple websites under different route groups:

### Route Structure
- `(main)` - Main Tari website (tari.com)
- `(exchange)` - Exchange-related pages
- `(iframe)` - Embedded swap functionality
- `(veera)` - Veera-specific pages

### Key Directories
- `src/sites/` - Multi-site architecture with separate concerns
  - `tari-dot-com/` - Main website components and pages
  - `exchange/` - Exchange-related functionality
  - `Swap/` - Swap interface components
- `src/services/` - API services, data stores, and utilities
- `src/ui-shared/` - Shared components, hooks, and layouts
- `src/generated/` - Auto-generated content metadata (lessons, posts, updates)

### Content Management
The site uses a static content system with markdown files:
- `_lessons/` - Educational content
- `_posts/` - Blog posts
- `_updates/` - Project updates
- Scripts in `scripts/` generate JSON metadata from markdown frontmatter

### Styling & Design System
- Uses styled-components with theme system in `src/theme/`
- Motion/React (Framer Motion) for animations
- Custom fonts: Alliance, Druk, and Poppins
- Responsive design with mobile-first approach

### State Management
- Zustand for global state (`src/stores/`)
- React Query for API data fetching
- Service-specific stores in `src/services/stores/`

### Code Style Guidelines
- TypeScript required
- No code comments (per project guidelines)
- Prettier formatting with 120 character line width, single quotes, 4-space tabs
- Component structure: Each component in own directory with ComponentName.tsx and styles.ts
- Styled-components props prefixed with `$`
- PascalCase for components, camelCase for utilities, kebab-case for assets

### Deployment
- Deployed on Cloudflare Pages
- Uses `@cloudflare/next-on-pages` for Edge Runtime compatibility
- Wrangler configuration in `wrangler.toml`