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
- uses a higher test timeout automatically so slow-motion playback does not fail early

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
- `Validating G-6-US-3 ...`
- `Phase 4/4: Admin workflow`

Sprint 3 only:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:sprint3
```

Sprint 3 only visual demo:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:sprint3:visual
```

The Sprint 3 suite also runs as one demo flow and prints progress logs like:
- `Phase 1/3: Orders, proof of delivery, and reorder`
- `Validating G-6-US-26 ...`
- `Phase 3/3: Admin shipment and analytics workflow`

Admin demo access in the flow:
- Open `Admin Demo Login`
- Use the fixed demo account
- Username: `demo_admin`
- Password: `Admin123456`

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

- G-6-US-3 / G-6-US-4: Budget filtering and trending arrangements
- G-6-US-5: Arrangement comparison
- G-6-US-8 / G-6-US-9 / G-6-US-10: Product descriptions, reviews, gallery, and pricing
- G-6-US-13 / G-6-US-14 / G-6-US-15: Wrapping, personalized message, and favorite messages
- G-6-US-18 / G-6-US-19 / G-6-US-20: Delivery time window, promo code, and payment method
- G-6-US-25 / G-6-US-33: Subscription and customer support
- G-6-US-36 / G-6-US-37: Admin product management and order status updates
- G-6-US-23 / G-6-US-24: Delivery photo proof and delay alerts
- G-6-US-26 / G-6-US-27 / G-6-US-28: Subscription management, theme previews, and address updates
- G-6-US-29 / G-6-US-30: Order history and reorder
- G-6-US-31 / G-6-US-32: Favorite products and personal information updates
- G-6-US-34 / G-6-US-35: FAQ browsing and support chat
- G-6-US-38 / G-6-US-39: Subscription shipment management and sales analytics
