# BloomLife Product – Product Backlog

## Project Overview
BloomLife is a conceptual flower e-commerce platform designed to help users easily select, personalize, and purchase floral products for different occasions.  

## Product Backlog Structure

All user stories are organized and maintained in a **Product Backlog**, following standard Agile practices.

## Production Architecture

- Frontend: `Firebase Hosting`
- Backend: `Google Cloud Run` (Dockerless source deploy from `backend/`)
- API routing: Firebase Hosting rewrite `/api/**` -> Cloud Run service
- Database: managed MySQL (or existing MySQL instance) used by backend env vars

## Files Added for Deployment

- `firebase.json`: Hosting config + SPA fallback + `/api/**` rewrite to Cloud Run
- `.firebaserc`: Firebase project alias (replace with your project id)
- `frontend/.env.production.example`: production env template
- `scripts/deploy-backend-cloudrun.ps1`: backend deploy script
- `scripts/deploy-frontend-firebase.ps1`: frontend deploy script

## One-Time Firebase Console Setup (Required)

1. Create/select a Firebase project  
   In Firebase Console, create a project and copy `Project ID` (for example: `flower-shop-12345`).

2. Enable Hosting  
   Firebase Console -> Build -> Hosting -> Get started.

3. Create a Web App and get config  
   Project settings -> General -> Your apps -> Web app -> SDK setup and configuration.  
   Copy values into a local file `frontend/.env.production` using `frontend/.env.production.example` as template.

4. Enable Cloud APIs for backend deploy  
   In Google Cloud Console (same project), enable:
   - Cloud Run API
   - Cloud Build API
   - Artifact Registry API

5. Prepare database access  
   Decide your MySQL endpoint and credentials: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

## Required Local Replacements Before Deploy

1. Update `.firebaserc`
```json
{
  "projects": {
    "default": "your-real-project-id"
  }
}
```

2. Update `firebase.json` rewrite if needed  
   Default backend service is:
   - `serviceId`: `flower-backend`
   - `region`: `us-central1`  
   If you deploy with another service name/region, edit `firebase.json` to match exactly.

## Deploy Commands

### 1) Deploy Backend to Cloud Run

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-backend-cloudrun.ps1 `
  -ProjectId "your-project-id" `
  -Region "us-central1" `
  -ServiceName "flower-backend" `
  -DbHost "your-db-host" `
  -DbUser "your-db-user" `
  -DbPassword "your-db-password" `
  -DbName "your-db-name"
```

### 2) Deploy Frontend to Firebase Hosting

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-frontend-firebase.ps1 `
  -ProjectId "your-project-id"
```

## Build Deployable Frontend Artifact

```powershell
npm --prefix frontend run build
```

Built files are generated in `frontend/dist` and are ready for Firebase Hosting deploy.



## E2E Testing (Playwright)

Teacher verification scripts for Sprint stories are provided under `e2e/`.

Docker development ports on the host:
- Frontend: `http://localhost:5174`
- Backend API: `http://localhost:3001`

```powershell
npm run e2e:setup
npm run e2e:dev
```

Sprint 2 demo run:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:sprint2
```

Sprint 2 visual demo run:

```powershell
$env:E2E_BASE_URL='http://localhost:5174/'
npm run e2e:sprint2:visual
```

The Sprint 2 demo suite runs as one flow and prints progress logs in the terminal, including the current phase and current story id.

Current Sprint 2 story ids:
- `G-6-US-3` / `G-6-US-4`: Budget filtering and trending arrangements
- `G-6-US-5`: Arrangement comparison
- `G-6-US-8` / `G-6-US-9` / `G-6-US-10`: Product descriptions, reviews, gallery, and pricing
- `G-6-US-13` / `G-6-US-14` / `G-6-US-15`: Wrapping, greeting card preview, and favorite messages
- `G-6-US-18` / `G-6-US-19` / `G-6-US-20`: Delivery window, promo code, and payment method
- `G-6-US-25` / `G-6-US-33`: Subscription and customer support
- `G-6-US-36` / `G-6-US-37`: Admin product management and order status updates

Admin demo access:
- The admin flow uses a fixed demo account from the dedicated admin login screen
- Username: `demo_admin`
- Password: `Admin123456`

Production visual run:

```powershell
$env:E2E_BASE_URL='https://your-frontend-domain'
npm run e2e:prod:visual
```

Open report:

```powershell
npm run e2e:report
```
