# Phase 5a: Client/Server Boundary Audit

Read-only audit of every `'use client'` file under `src/app`, `src/sites`,
and `src/ui-shared`. Deliverable for Phase 5b execution.

## Executive Summary

- **135** files carry `'use client'`. Of those, **~32** are `styles.ts` files
  whose only reason to be client-side is that styled-components
  (with `keyframes`, `motion` imports, or client-only consumers) is used inside.
  They are typically harmless leaves but occupy bundle space.
- The **biggest leverage point** is not any individual leaf component but the
  **three page roots** that are themselves `'use client'` with no state at all:
  `HomePage.tsx`, `DownloadsPage.tsx`, `LessonPage.tsx`, `PostPage.tsx`,
  `ExchangePage.tsx`, `IntegrationPage.tsx`, plus the legal pages. Flipping
  these to server shells does not itself change bundle size much, but it lets
  downstream static sections render on the server and lets future refactors
  detach truly static subtrees.
- **Provider scope is too wide**: `Providers.tsx` wraps React Query +
  styled-components + ThemeProvider around every route, including the
  `(iframe)/swaps` route that uses its own `WagmiProvider` inside the page.
  The `mica-whitepaper` route doesn't use `Providers` — good — but the
  `(main)` and `(exchange)` wrappers pull in the full React Query runtime on
  every page even when nothing under them calls a query hook.
- **Top wins** are the pure-presentational "page roots" and three
  animation-wrapper leaves (`Banner`, `Disclaimer`, `PrivacyPolicy`,
  `UserAgreement`, plus `TokenomicsPage` adjacent cleanup). Combined they
  should let 4-5 routes become server components end-to-end, keeping the
  Header/Footer as the client islands.
- **Blocker / note**: `next build` succeeds (see
  `tasks/phase-5-build-output.txt`). However, build output is the Next
  App Router route map only; Turbopack does not print per-route client
  bundle sizes the way Webpack does in Next 15. Per-route byte-level
  comparison will require Phase 5b to add an explicit bundle analyzer
  (e.g. `@next/bundle-analyzer`) or run a production `webpack` build, or
  just compare `.next/static` output totals before and after.

## Inventory: baseline build

See `tasks/phase-5-build-output.txt`. Summary of route types from the build:

Static (`○`) today:
`/`, `/disclaimer`, `/downloads`, `/faq`, `/integration-guide`,
`/mica-whitepaper`, `/privacy_policy`, `/swaps`, `/tokenomics`,
`/user_agreement`, `/veera`, `/_not-found`.

Dynamic (`ƒ`) today:
`/exchange/[name]`, `/lessons`, `/lessons/[slug]`, `/updates`, `/updates/[slug]`.

Note that "static" here means the route is statically generated at build
time, but the page tree still contains `'use client'` boundaries that ship
JS to the browser and hydrate. The audit below targets that hydration
surface, not the build-time prerender flag.

## Categorisation Legend

| Code | Reason |
|------|--------|
| H | React hooks (useState / useEffect / useRef / useMemo / useCallback / custom hooks) |
| B | Browser-only API (`window`, `document`, `localStorage`, `navigator`, WebGL, Clipboard, IntersectionObserver) |
| T | Third-party client-only lib (`motion`/`framer-motion`, `wagmi`, `@reown`, `@tanstack/react-query`, `styled-components` runtime with dynamic props, `react-use`, `react-turnstile`, `@number-flow/react`, `react-markdown` OK server but often bundled with client) |
| E | Event handlers (onClick, onChange, onMouseEnter…) as the only reason |
| N | Next.js client hook (`useSearchParams`, `useRouter`, `usePathname`, `useParams`) |
| S | Zustand store (client-only state) |
| C | Cascading: marked client because of its importers' client-ness or because its `styles.ts` uses `motion` |
| X | Styled-components stylesheet file only (`styles.ts` with `styled` + sometimes `motion` / `keyframes`) |

Difficulty legend: **E** = easy (split off in <30 min), **M** = moderate
(requires splitting the component), **H** = hard (deep refactor or
API-shape change), **D** = don't bother (genuine client island).

## Full Inventory

### App Router pages

| File | Reason(s) | Can split into server shell + client island? | Difficulty | Notes |
|------|-----------|----------------------------------------------|------------|-------|
| src/app/(iframe)/swaps/page.tsx | T (Wagmi) | No — entire swap flow is client | D | Must stay client for wallet connection |

### Site-level page roots (highest leverage)

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| src/sites/tari-dot-com/pages/HomePage/HomePage.tsx | C | **Yes** — no hooks, just imports section children | E | Remove `'use client'`. Children stay client. Server renders the shell. |
| src/sites/tari-dot-com/pages/Downloads/DownloadsPage.tsx | C | **Yes** — no state | E | Remove `'use client'`. Two child sections stay client. |
| src/sites/tari-dot-com/pages/LessonsPage/LessonPage.tsx | C | **Yes** — passes props through; `LessonContent` is already server | E | Remove `'use client'`; only `styles.ts` keeps it |
| src/sites/tari-dot-com/pages/UpdatesPage/PostPage.tsx | C | **Yes** — same as LessonPage | E | Remove `'use client'` |
| src/sites/tari-dot-com/pages/LegalPages/Disclaimer.tsx | C | **Yes** — static HTML | E | Trivially server |
| src/sites/tari-dot-com/pages/LegalPages/PrivacyPolicy.tsx | C | **Yes** — static HTML (626 lines) | E | Trivially server |
| src/sites/tari-dot-com/pages/LegalPages/UserAgreement.tsx | C | **Yes** — static HTML | E | Trivially server |
| src/sites/tari-dot-com/pages/IntegrationPage/IntegrationPage.tsx | C (imports `Sidebar`, `Tabs`) | Partial — page itself has no state; sidebar/tabs are client | M | Remove `'use client'`; leave Sidebar/Tabs as client children |
| src/sites/tari-dot-com/pages/IntegrationPage/components/Card.tsx | B (`window.open`) + E | Yes — replace `window.open` with an `<a target="_blank">` | E | Trivial fix |
| src/sites/exchange/pages/ExchangePage/ExchangePage.tsx | H, S (`useExchangeData`, `useUIStore`, `useEffect`) | Partial — can become a server shell that calls `fetchExchangeData` directly (see Phase 6) and passes data to a child client island | H | Tied to Phase 6 exchange SSR work. Out of scope for 5b. |

### HomePage sections and their components

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| HomePage/sections/IntroSection/IntroSection.tsx | C (imports `TextPill`, `DownloadButton`, `VideoPlayer`, `BlockExplorerMini`, `TitleAnimation`) | Partial — no state itself; all children require client | M | Remove `'use client'` once children stay client. Low urgency. |
| HomePage/sections/IntroSection/components/TextPill/TextPill.tsx | H, T (motion) | No | D | Genuine client (letter animation) |
| HomePage/sections/IntroSection/components/DownloadButton/DownloadButton.tsx | H, B (`createPortal`, IntersectionObserver), T (motion), N (`useSearchParams`), S | No | D | Genuine client |
| HomePage/sections/VideoSection/VideoSection.tsx | T (`motion` through `VideoPlayer` styled component) | Partial — the JSX is static HTML + a `motion.div` wrapper. `TitleAnimation` is client. | M | Could stay client; little win |
| HomePage/sections/EcosystemSection/EcosystemSection.tsx | H, T (motion, react-use) | No | D | Mouse parallax |
| HomePage/sections/EcosystemSection/components/TextBubble/TextBubble.tsx | T (motion) + parent-driven mouseX/mouseY props | No | D | Driven by parent parallax |
| HomePage/sections/EcosystemSection/components/TikTokBubble/TikTokBubble.tsx | T (motion) | No | D | Same |
| HomePage/sections/EcosystemSection/components/Community/Community.tsx | T (motion `initial`/`whileInView`) | Partial — could swap for CSS / a smaller `InView` wrapper | M | |
| HomePage/sections/EcosystemSection/components/Community/Track.tsx | T (motion infinite marquee) | Partial — CSS `@keyframes` would remove `motion/react` entirely | M | Replace `motion.div` with styled `@keyframes` marquee. Drops ~motion entry cost for Community. |
| HomePage/sections/TariSection/TariSection.tsx | C (imports `TitleAnimation`, `ImageSpinner`) | **Yes** — TariSection itself has no hooks | E | Remove `'use client'`; children stay client. |
| HomePage/sections/TariSection/components/ImageSpinner/ImageSpinner.tsx | H, T (`useInView` from motion) | No | D | |
| HomePage/sections/FAQSection/FAQSection.tsx | H (useState), T (AnimatePresence) | Partial — list itself is static; only "See all" toggle needs state | M | Could lift toggle to a small `<FAQShowMoreToggle>` and render list items server-side, but lower win than page roots |
| HomePage/sections/FAQSection/components/FAQEntry/FAQEntry.tsx | H, T (AnimatePresence) | No | D | Disclosure widget |
| HomePage/sections/UniverseSection/UniverseSection.tsx | H, B (window scroll), T (motion springs) | No | D | Scroll-synced animation (not imported by HomePage today but exported) |

### Shared UI under tari-dot-com/ui (present on every tari-dot-com page)

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| ui/Header/Header.tsx | H, T (`useScroll` from motion) | No | D | Scroll-driven theme swap |
| ui/Header/Navigation/Navigation.tsx | H, S, T (AnimatePresence) | No | D | Hover state, super-menu toggle |
| ui/Header/MobileHeader/MobileHeader.tsx | H, B (`document.body.style.overflow`), S | No | D | |
| ui/Header/MobileHeader/MobileNavigation/MobileNavigation.tsx | H, T (AnimatePresence) | No | D | |
| ui/Header/MobileMenuButton/MobileMenuButton.tsx | S, T (motion variants) | No | D | |
| ui/Header/SuperMenu/SuperMenu.tsx | H, B (mousedown listener), S, T (AnimatePresence/motion) | No | D | |
| ui/Header/ActiveMiners/ActiveMiners.tsx | H, T (`@number-flow/react` via `dynamic`), uses `useMinerStats` (React Query) | No | D | |
| ui/Header/MinersCTA/MinersCTA.tsx | E, S, custom hook `useDownloadUniverse` | Partial — could be split so the surrounding layout is server and only the click handler hydrates | M | Low-value split; stays client effectively. |
| ui/TariLogo/TariLogo.tsx | H, B (context menu via `document.createElement('a')`) | Partial — the context-menu downloader is the only reason. Split the link into a server component, keep right-click menu as a portal-mounted island. | M | Modest win (Logo present on every page) |
| ui/Footer/Footer.tsx | C | **Yes** — it only imports `SocialLinks` (client) and `Link`; no state in Footer itself | E | Remove `'use client'`. Only `SocialLinks` and the styled-components `styles.ts` need the directive. |
| ui/Footer/components/SocialLinks/SocialLinks.tsx | S (useMainStore for closing mobile menu) | Partial — if footer is rendered outside the mobile-menu context, split into `SocialLinksServer` (plain `<a>` tags) and leave the mobile-menu copy calling the store | M | |
| ui/GradientBackground/GradientBackground.tsx | H, B (WebGL on canvas), T | No | D | WebGL shader; genuine client |
| ui/Banner/Banner.tsx | C (no state, no effects) | **Yes** — pure presentational | E | Drop `'use client'` |
| ui/Banner/PromoBanner.tsx | S (zustand store) + E (onClick) | Partial — the label/layout is server-renderable; the store-driven `openModal` click handler is the island | M | |

### BlockExplorerMini subtree (only used in IntroSection)

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| ui/BlockExplorerMini/BlockExplorerMini.tsx | H, T (useBlocks → React Query) | No | D | Genuine live data |
| ui/BlockExplorerMini/BlockEntry/BlockEntry.tsx | C | **Yes** — pure dispatch to two children | E | Tiny win |
| ui/BlockExplorerMini/BlockEntry/BlockSolved/BlockSolved.tsx | H | No | D | |
| ui/BlockExplorerMini/BlockEntry/BlockSolved/BlockProgress/BlockProgress.tsx | H, T (motion) | No | D | |
| ui/BlockExplorerMini/BlockEntry/BlockSolving/BlockSolving.tsx | T (AnimatePresence) | Partial | M | |
| ui/BlockExplorerMini/BlockEntry/BlockSolving/BlockTimer/BlockTimer.tsx | H | No | D | |
| ui/BlockExplorerMini/BlockScrollList/BlockScrollList.tsx | H, B (window resize), T (motion drag) | No | D | |

### Modals

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| ui/Modals/ASICPromoModal/ASICPromoModal.tsx | H, S, B (Clipboard), T (AnimatePresence) | No | D | |
| ui/Modals/DownloadModal/DownloadModal.tsx | H, S, N (`useSearchParams`), B (navigator.userAgent), T (react-query, captcha) | No | D | |

### Downloads page subtree

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| Downloads/sections/BaseNodeSection/BaseNodeSection.tsx | S | Partial — only the zustand subscription forces client | M | |
| Downloads/sections/BaseNodeSection/components/DownloadOptions.tsx | H, S, T (react-query) | No | D | |
| Downloads/sections/UniverseSection/components/QRPopup.tsx | H, T (framer-motion) | No | D | Hover popup |

### Exchange page subtree

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| exchange/ExchangePage/sections/HeroSection/HeroHeader/WhatIsTariButton.tsx | E + `document.getElementById().scrollIntoView` | Partial — server-render the button; attach click handler inline | E | Tiny, isolated |
| exchange/ExchangePage/sections/HeroSection/HeroContent/components/MetaInfo/MetaInfoBackground.tsx | None real — just an SVG | **Yes** | E | Drop `'use client'` |
| exchange/ExchangePage/sections/HeroSection/HeroContent/components/SeasonTimer/SeasonTimerBackground.tsx | None real — SVG only | **Yes** | E | Drop `'use client'` |
| exchange/ExchangePage/sections/HeroSection/HeroContent/components/SeasonTimer/SeasonTimer.tsx | H | No | D | |
| exchange/ExchangePage/sections/HeroSection/HeroContent/components/SeasonTimerInButton/SeasonTimerInButton.tsx | H | No | D | |

### Swap (iframe)

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| sites/Swap/Swap.tsx | H, T (wagmi, reown, ethers) | No | D | |

### Shared components

| File | Reason(s) | Can split? | Difficulty | Notes |
|------|-----------|------------|------------|-------|
| ui-shared/components/Sidebar/Sidebar.tsx | H, B (IntersectionObserver, `window.scrollTo`) | No | D | Scroll-spy |
| ui-shared/components/Tabs/Tabs.tsx | H, T (framer-motion AnimatePresence) | No | D | |
| ui-shared/components/CopyBox/CopyBox.tsx | H, B (Clipboard) | No | D | |
| ui-shared/components/CodeContent/CodeContent.tsx | C (only imports CopyBox) | Partial — render `<code>` server-side; mount only CopyBox as client | E | Small win; used across Integration guide |

### Shared hooks (files with `'use client'` that are hooks, not components)

| File | Reason(s) | Notes |
|------|-----------|-------|
| ui-shared/hooks/useHlsScript.ts | H, B (script injection) | Phase 7 flags this for `await import('hls.js')` replacement |
| ui-shared/hooks/swap/useIframeMessage.ts | H, B (postMessage) | Genuine client |

### Providers (global)

| File | Reason(s) | Notes |
|------|-----------|-------|
| ui-shared/layouts/Providers/Providers.tsx | T (wraps children in Styled-Components + ReactQuery + Theme) | Applied in Layout and LayoutExchange |
| ui-shared/layouts/Providers/ReactQueryProvider.tsx | T (React Query) | Module-level singleton |
| ui-shared/layouts/Providers/StyledComponentsProvider.tsx | H (useServerInsertedHTML) | Required wrapper for SSR of styled-components |
| ui-shared/layouts/Providers/WagmiProvider.tsx | T (wagmi + reown) | Currently used only inside `src/app/(iframe)/swaps/page.tsx` |
| ui-shared/layouts/Layout/Layout.tsx | Server (no `'use client'`) | Good |
| ui-shared/layouts/Layout/LayoutExchange.tsx | Server | Good |
| ui-shared/layouts/Layout/styles.ts | X | Can stay |
| ui-shared/layouts/Layout/GlobalStyles/GobalStyles.ts | X (`createGlobalStyle`) | Must remain client |

### styles.ts leaves (X category, no top-level React component)

The following files carry `'use client'` only because they define styled-
components and are imported by client components. They are low-priority,
but they **can** drop the directive in two scenarios:

1. Their parent was converted to a server component *and* no other
   client component imports them (unlikely — most of these are imported
   by multiple siblings).
2. A shared type or constant exported from the same file is needed by
   a server component — in which case the fix is to split the
   non-styled export into its own file.

Not listed individually below; grep for `'use client'` in any `styles.ts`
file. Total: ~32 style files, consistent pattern. Leave as-is for 5b.

## Top 10 Refactor Wins (ranked by bundle leverage × difficulty)

1. **`HomePage.tsx` → server shell.** Flip to server component. Zero
   logic lives there. All five section children are already client.
   Upside: enables future incremental migration of any section that
   becomes server-compatible.
2. **`LessonPage.tsx`, `PostPage.tsx` → server.** Both are pure
   prop-passthroughs. Their `LessonContent` / `PostContent` children
   are already server components with zero hooks. This is the purest
   win in the codebase: removing the directive moves the entire
   `/lessons/[slug]` and `/updates/[slug]` page to server-rendered and
   shrinks hydration surface to the single `ArticleDate` leaf.
3. **`LegalPages` (`Disclaimer.tsx`, `PrivacyPolicy.tsx`,
   `UserAgreement.tsx`) → server.** Pure HTML pages with zero client
   needs. This is the single largest "pure HTML shipped as JS" win —
   `PrivacyPolicy.tsx` is 626 lines of legal text currently shipped as
   a hydrated client component.
4. **`TariSection.tsx`, `Banner.tsx`, `BlockEntry.tsx`,
   `MetaInfoBackground.tsx`, `SeasonTimerBackground.tsx` → server.**
   Leaf components with no hooks, no state, no events — flipping each
   is a one-line change.
5. **`Footer.tsx` → server shell with `SocialLinks` as client island.**
   Footer renders on every page. All children except `SocialLinks` are
   plain `<Link>` and styled text. Split `SocialLinks` into a
   server-friendly `<SocialLinksServer>` (for the footer) and a
   client `<SocialLinks>` (for the mobile menu, where the store
   subscription is actually useful).
6. **`DownloadsPage.tsx` → server shell.** Tiny file, no logic. Two
   child sections (`UniverseSection`, `BaseNodeSection`) stay client.
7. **`IntegrationPage.tsx` → server shell.** Large file (325 lines)
   with zero state. All client-only behaviour lives in `<Sidebar>` and
   `<Tabs>` children. Converting the page body to server drops a
   big chunk of JSX-as-JS from `/integration-guide`.
8. **`IntegrationPage/components/Card.tsx` → server.** Current reason
   for `'use client'` is `window.open(link, '_blank')`; replace with
   `<a target="_blank" rel="noopener noreferrer">`. Loses zero
   functionality.
9. **`CodeContent.tsx` → server shell; keep only `CopyBox` as client.**
   Integration guide renders many `<CodeBlock>`s. Today every code
   block hydrates purely to wrap a static `<pre>` around a tiny
   CopyBox button. Server-render the `<pre>`, hydrate only the
   clipboard button.
10. **`Community/Track.tsx` (marquee) → styled-components `@keyframes`
    CSS animation.** The component only uses `motion.div`'s `animate`
    prop for a constant-speed infinite loop, which CSS does natively.
    Drops a `motion/react` import from the home page and allows
    `Community.tsx` itself to be reconsidered.

## Providers Scope Recommendations

Observed structure:

```
app/layout.tsx                       ← RootLayout, no Providers
  (main)/layout.tsx                  → <Layout> → Providers (SC + RQ + Theme)
  (exchange)/exchange/[name]/layout  → <LayoutExchange> → Providers
  (iframe)/swaps/layout.tsx          → Providers(+) → Swap(+WagmiProvider)
  (veera)/veera/layout.tsx           → <LayoutExchange> → Providers
  mica-whitepaper/layout.tsx         → no Providers (server-pure). Correct.
```

Recommendations:

- **React Query does not belong in the global `Providers`.** Today it
  lives in every main/exchange/iframe route. Only `useBlocks`,
  `useMinerStats`, `useExchangeData`, `useDownloads`,
  `useSubscribeNewsletter` consume it. None of these are needed on
  `/disclaimer`, `/privacy_policy`, `/user_agreement`, `/tokenomics`,
  `/mica-whitepaper`, `/veera`, or `/integration-guide`.
  - Move `ReactQueryProvider` into a dedicated
    `LayoutWithQuery` or put it next to the consumers that actually
    need it (Header/BlockExplorerMini/DownloadModal).
  - Keep the `queryClient` as a module-level singleton so it still
    dedupes across mount/unmount.
- **Styled-components + Theme are needed everywhere we use styled-
  components**, which today is "every route with any of our components
  in it". This cannot shrink until we migrate some pages off
  styled-components (explicitly out of scope per the master plan's
  scope section). Keep StyledComponentsProvider + ThemeProvider
  global.
- **`WagmiProvider` is correctly scoped** to `src/app/(iframe)/swaps`
  only. Do not widen it. If the future Exchange password flow needs
  wallet auth, wrap only that subtree, not the global `Providers`.
- **`(iframe)/swaps/layout.tsx` already uses `Providers` + the page
  adds `WagmiProviderWrapper` on top.** This is correct, but means
  React Query is being loaded for a pure-iframe swap UI that doesn't
  need it today. Once React Query is detached from `Providers`, the
  swap iframe will stop paying that cost.

## Cascading Analysis (the "roots")

The files that make other files necessarily client today:

| Root | Cascading impact |
|------|------------------|
| `HomePage.tsx` itself being `'use client'` | Cosmetic only — all children already `'use client'` |
| `TariSection.tsx`, `LessonPage.tsx`, `PostPage.tsx`, `Disclaimer.tsx`, `PrivacyPolicy.tsx`, `UserAgreement.tsx`, `DownloadsPage.tsx`, `IntegrationPage.tsx`, `Banner.tsx`, `Footer.tsx` | These are the cheap-to-flip roots. None of them *need* client; they are `'use client'` only because they import styled-components and the author defaulted to client. |
| `Providers.tsx` (pulling in React Query) | Makes every `.tsx` under `(main)` and `(exchange)` unable to use server-only APIs for data fetching without an explicit boundary. Detaching React Query is the biggest structural win. |
| `styles.ts` files with `'use client'` | Harmless leaves, ignorable |

## Recommendations for Phase 5b (execution order)

1. **Easy wins first** — flip the single-line directives on leaf and
   page-root files listed in the "Top 10" above. One PR per logical
   group:
   - PR A: legal pages + `Banner.tsx` + `SeasonTimerBackground.tsx` +
     `MetaInfoBackground.tsx` (pure SVG/HTML leaves).
   - PR B: page roots (`HomePage`, `DownloadsPage`, `LessonPage`,
     `PostPage`, `IntegrationPage`, `TariSection`, `BlockEntry`).
   - PR C: `Footer.tsx` server shell + `SocialLinks` split.
   - PR D: `IntegrationPage/Card.tsx` `window.open` removal +
     `CodeContent.tsx` split.
   - PR E: `Community/Track.tsx` CSS marquee replacement.
2. **Provider scope reduction** — move `ReactQueryProvider` out of the
   global `Providers.tsx`. Verify every consumer still has a
   QueryClient in its parent tree. Measure bundle impact.
3. **Bundle measurement** — install `@next/bundle-analyzer` (or run
   `webpack` mode once to get per-route size numbers) before and after
   to capture measurable deltas. Current Turbopack build output does
   not report per-route client JS size.
4. **Defer** — anything tied to Phase 6 (ExchangePage SSR) or Phase 7
   (fetch hygiene, `useHlsScript` replacement). The `useHlsScript` →
   `await import('hls.js')` swap is listed in Phase 7 and should not
   be done here.

## Build Output

See `tasks/phase-5-build-output.txt`. Build succeeded on `worker` branch
with Next 16.2.4 + Turbopack. Route map captured; no per-route client JS
byte sizes are printed by Turbopack in this Next.js version.
