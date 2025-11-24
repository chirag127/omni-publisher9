# Omni-Publisher Agent Guide

## Build & Run
- **Run Publisher:** `pnpm start` (runs `src/publish.ts` via tsx)
- **Build TS:** `pnpm build` (runs `tsc`)
- **Deploy Site:** `pnpm deploy` (runs `hugo --minify`)
- **Lint:** `pnpm lint` (biome check)
- **Format:** `pnpm format` (biome format)
- **Tests:** No tests configured currently.

## Architecture
- **Core:** `src/publish.ts` orchestrates publishing.
- **Adapters:** `src/adapters/` contains platform-specific logic (implementing `Adapter` interface).
- **Flow:** 
  1. Reads Markdown from `content/posts`.
  2. Publishes to Blogger FIRST to generate a canonical URL.
  3. Publishes/Updates other platforms in parallel.
  4. Tracks state in `src/utils/state.ts`.
- **Configuration:** Uses `.env` for credentials (loaded via `dotenv`).

## Code Style & Conventions
- **TypeScript:** Strict mode enabled (`strict: true`). Use `ES2022` target.
- **Imports:** 
  - Use `.js` extension for local imports (e.g., `import { x } from "./file.js"`).
  - Use `node:` prefix for built-in modules (e.g., `node:fs/promises`).
- **Formatting:** Follow Biome defaults (2 space indent, 100 char line width).
- **Logging:** Use `logger` from `src/utils/logger.ts` instead of `console`.
