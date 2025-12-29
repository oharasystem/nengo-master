# Nengo-Master Implementation Plan (Revised)

## Goal
Initialize and implement the "Nengo-Master" application on Cloudflare Workers using Hono, D1 (Native Bindings), and TailwindCSS (CDN), based on `SPEC.md` and user constraints.

## User Review Required
- **D1 Database Binding**: I will need to create a D1 database configuration. For local development (`wrangler dev`), we will use a local D1 database.
    - I will create `wrangler.toml` with the D1 binding configuration.
    - You may need to run `wrangler d1 execute nengo-db --file=seed_data.sql` manually later or I can try to run it if I have access.

## Proposed Changes

### Configuration & Dependencies
- [DELETE] `wrangler.jsonc` (Replace with `wrangler.toml`)
- [NEW] `wrangler.toml`: Cloudflare Workers configuration with D1 binding.
- [MODIFY] `package.json`:
    - Remove `wrangler` devDependency if it's already global, or keep it.
    - Ensure `hono` is installed.
    - No `drizzle-orm` or `tailwindcss` dependencies.

### Database
- [INFO] Use `seed_data.sql` for schema and data.
- [NEW] `src/db.ts` (Optional): minimal type definitions for Cloudflare Bindings (Env).

### Logic (`src/utils`)
- [NEW] `src/utils/era.ts`: Era conversion logic (West/Japanese).
- [COMPLETED] `src/utils/resume.ts`: Academic year calculation logic (Expanded to include admission years).
- [NEW] `src/index.tsx`: Resume Input Simplification (Remove Month, Add Early Birthday Checkbox).

### Components (`src/components`)
- [COMPLETED] `src/components/Layout.tsx`: Base layout structure.
    - **Crucial**: Include `<script src="https://cdn.tailwindcss.com"></script>` in `<head>`.
    - **Logic**: Handle separate modals for AD and Era. Sync state by reading current year on modal open.
- [COMPLETED] `src/components/DrumPicker.tsx`: UI for year selection (Server-rendered JSX).
    - **Update**: configurable `mode` ('ad' or 'era') and `id`. Returns a single scrollable list.
- [NEW] `src/components/TriviaCard.tsx`: UI for displaying trivia.

### Application Entry (`src`)
- [COMPLETED] `src/index.tsx`: Main application logic, routing, and API endpoints. 
    - **Update**: Render two distinct inputs (West/Japanese) and two separate modals.
- [COMPLETED] `src/client.ts` (Inlined in `Layout.tsx`): Client-side vanilla JS for the scroll/picker logic.

## Verification Plan

### Automated Tests
- Run `npm run dev` to start the local server.
- curl endpoints:
    - `GET /api/trivia/1989` -> Expect JSON with Era and Trivia.
    - `POST /api/calculate/resume` -> Expect JSON with graduation years.

### Manual Verification
- Access `http://localhost:8787`.
- Check if the "Drum Roll" UI works (CSS Scroll Snap).
- Verify styles are loaded via Tailwind CDN.
- Verify changing the year updates the displayed trivia (Database interaction).
