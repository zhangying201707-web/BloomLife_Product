# Playwright E2E Module (Sprint Story Verification)

This module is prepared for teachers to validate the Sprint story features through browser E2E tests.

## Install once

From project root:

```powershell
npm run e2e:setup
```

## 1) Development Environment E2E (auto start local services)

```powershell
npm run e2e:dev
```

This command will:
- start backend at `http://127.0.0.1:3001` when using Docker host mapping, or `http://127.0.0.1:3100` for Playwright auto-start local runs
- start frontend at `http://127.0.0.1:5174` (or reuse existing)
- execute Playwright tests headless

Optional interactive debug UI:

```powershell
npm run e2e:dev:ui
```

Visual demo mode for recording:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:dev:visual
```

This mode:
- opens a headed browser window
- slows each action by `2000ms`
- uses a fixed `1440 x 960` viewport so the demo layout stays stable
- is intended for live demos and screen recording

Sprint 2 only:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:sprint2
```

Sprint 2 only visual demo:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:sprint2:visual
```

The Sprint 2 suite now runs as one demo flow and prints progress logs like:
- `Phase 1/4: Discovery and product research`
- `Validating US-001 ...`
- `Phase 4/4: Admin workflow`

## 2) Production Environment Visual E2E

Set production URL first (example below), then run headed visual checks:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:prod:visual
```

Note: this visual mode uses a fixed `1440 x 960` viewport for more stable recording output.

Optional Playwright UI mode against production:

```powershell
$env:E2E_BASE_URL='https://your-frontend-domain'
npm run e2e:prod:ui
```

## Report

Open HTML report:

```powershell
npm run e2e:report
```

Reports are generated under:
- `e2e/playwright-report/dev`
- `e2e/playwright-report/prod`

## Covered Stories (mapped)

- US-001/US-002: Occasion & style/mood filtering
- US-006: Pricing breakdown
- US-007: Availability and delivery date check
- US-011: Greeting card message
- US-012: Optional gifts
- US-016: Cart management entry flow
- US-017: Delivery detail submission
- US-021: Order tracking
- US-022: Notification center refresh
