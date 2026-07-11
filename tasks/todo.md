# Cloudflare Pages to Workers migration

- [x] Inspect the existing Next.js, Cloudflare Pages, build, and CI configuration.
- [x] Verify current OpenNext Cloudflare and Cloudflare Workers guidance and package compatibility.
- [x] Replace `@cloudflare/next-on-pages` with a compatible current `@opennextjs/cloudflare` and Wrangler toolchain.
- [x] Convert the Pages Wrangler configuration to a Workers Static Assets configuration.
- [x] Configure OpenNext for this static/SSG-oriented site without provisioning remote cache resources.
- [x] Update local development, build, preview, and deploy scripts for Workers; remove the obsolete Pages branch build script.
- [x] Remove Edge Runtime declarations that OpenNext does not support.
- [x] Add static asset cache headers and ignore generated/local-only Worker artifacts.
- [x] Update deployment documentation with Workers Builds commands and environment requirements.
- [x] Verify formatting, type generation, lint/type checks, the OpenNext build, Wrangler dry-run/startup checks, and representative local routes.

## Review

- Installed `@opennextjs/cloudflare` 1.20.1 and Wrangler 4.110.0; upgraded Next.js within its existing major line to 15.5.20 to satisfy the adapter's peer range.
- Replaced the Pages output with `.open-next/worker.js` plus Workers Static Assets, Cloudflare Images, a self-service binding, current compatibility flags, and Workers observability.
- Used the read-only Static Assets incremental cache because the application has no ISR or on-demand revalidation calls; no R2, D1, Queue, or Durable Object resources were provisioned.
- Removed Pages-specific environment/build files and documented Workers Builds commands, build/runtime variables, Cloudflare Images, domain cutover, and rollback.
- Fixed API response boundary typing and eliminated render-time query-string hooks that prevented static prerendering after the required Next.js upgrade.
- Verification passed: clean `npm ci`, generated binding type check, scoped Prettier check, TypeScript, lint (one existing image warning), OpenNext build, Wrangler dry-run, and startup analysis.
- Dry-run upload: 13,377.54 KiB raw / 2,940.90 KiB gzip, with 476 static assets.
- Local Worker smoke tests passed for static/dynamic pages, 404 handling, legacy rewrites, redirects, PDF/static assets, image optimization, and the external middleware proxy.
- The repository-wide Prettier check still reports pre-existing formatting issues outside the migration diff. `npm audit --omit=dev` also reports pre-existing transitive dependency findings, including one critical `sha.js` advisory through the Coinbase wallet SDK; dependency remediation is outside this migration.

## Dependency update

- [x] Run `npm update` within the versions allowed by `package.json`.
- [x] Review the dependency and lockfile changes.
- [x] Verify TypeScript, lint, and the OpenNext Worker build.

### Review

- `npm update` added 241 packages, removed 209, and changed 283; major releases outside the existing version ranges were intentionally left unchanged.
- Pinned `@wagmi/core` 2.22.1 and `@wagmi/connectors` 6.2.0 to keep Reown AppKit on Wagmi 2-compatible peers after npm selected incompatible Wagmi 3 transitive packages.
- Added explicit Motion variant types required by the updated Motion package.
- Verification passed: TypeScript, lint (one existing image warning), OpenNext build, Wrangler deploy dry-run, and local Worker smoke tests for `/`, `/swaps`, `/exchange/test`, and `/veera`.
- Production audit findings fell from 65 to 42, with no critical findings remaining (10 low, 28 moderate, and 4 high).
- The Worker upload grew from 2,940.90 KiB to 3,231.56 KiB gzip. The build still reports optional MetaMask AsyncStorage and WalletConnect `pino-pretty` resolution warnings, plus a bundled negative-zero comparison warning.

## Wagmi 3 migration

- [x] Confirm the current Wagmi 3 direct WalletConnect API and map affected project code.
- [x] Replace Reown AppKit with Wagmi 3 and the direct WalletConnect connector.
- [x] Update deprecated Wagmi hooks and mutation calls used by the swap flow.
- [x] Verify dependency resolution, TypeScript, lint, the OpenNext Worker build, and representative local routes.
- [x] Review the dependency/bundle impact and document the result.

### Review

- Upgraded to Wagmi 3.7.1 with `@wagmi/core` 3.6.1 and `@wagmi/connectors` 8.0.22; installed WalletConnect Ethereum Provider 2.23.10 explicitly.
- Removed the three direct Reown AppKit dependencies and replaced `WagmiAdapter`/`useAppKitWallet` with Wagmi's direct WalletConnect-only configuration. WalletConnect still installs `@reown/appkit` transitively for its QR modal.
- Migrated account, connect, and disconnect hooks to Wagmi 3 APIs. Replaced the removed ERC-20 `useBalance` mode with a typed `balanceOf` contract read while retaining `useBalance` for native currency.
- Verification passed: dependency tree, scoped Prettier, TypeScript, lint (one existing image warning), OpenNext Worker build, Wrangler dry-run, and local Worker routes `/`, `/swaps`, `/exchange/test`, and `/veera`.
- Browser verification passed for rendering `/swaps`, opening and cancelling the WalletConnect modal, and emitting parent iframe states `{ open: true }` followed by `{ open: false }`.
- Worker upload fell from 3,231.56 KiB to 2,600.26 KiB gzip, with 435 static assets. Production audit findings fell from 42 to 22 (10 low, 9 moderate, 3 high, no critical).
- A real wallet pairing, persisted reconnect, Sepolia authorization, disconnect, and signed swap were not exercised. The final deployment origin must remain authorized for the WalletConnect project ID.

## CI lockfile repair

- [x] Reproduce the Cloudflare `npm ci` lockfile validation failure with npm 10.
- [x] Repair the package lock without changing the declared dependency set.
- [x] Verify `npm ci`, the Worker build, and the deployment dry-run.

### Review

- Cloudflare uses npm 10.9.2, while the prior lockfile was generated with npm 11.6.2 and omitted transitive dependencies required by Wagmi's optional connector graph.
- Regenerated `package-lock.json` with npm 10.9.2; `npm@10.9.2 ci --dry-run` now succeeds.
- A full npm 10.9.2 clean install, OpenNext Worker build, and Wrangler deployment dry-run all pass.
