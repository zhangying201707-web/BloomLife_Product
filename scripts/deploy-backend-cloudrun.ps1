param(
  [Parameter(Mandatory = $false)][string]$ProjectId = "",
  [Parameter(Mandatory = $false)][string]$Region = "us-central1",
  [Parameter(Mandatory = $false)][string]$ServiceName = "flower-backend",
  [Parameter(Mandatory = $false)][string]$DbStorage = "/tmp/app.sqlite"
)

$ErrorActionPreference = "Stop"

if (-not $ProjectId) {
  if (Test-Path "./.firebaserc") {
    try {
      $firebaseRc = Get-Content "./.firebaserc" -Raw | ConvertFrom-Json
      $ProjectId = $firebaseRc.projects.default
    } catch {
      $ProjectId = ""
    }
  }
}

if (-not $ProjectId) {
  throw "ProjectId is required. Set .firebaserc projects.default or pass -ProjectId."
}

$gcloudCmd = "gcloud"
$localGcloud = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue) -and (Test-Path $localGcloud)) {
  $gcloudCmd = $localGcloud
}

Write-Host "Deploying backend to Cloud Run..."
& $gcloudCmd config set project $ProjectId | Out-Null

& $gcloudCmd run deploy $ServiceName `
  --source ./backend `
  --region $Region `
  --platform managed `
  --allow-unauthenticated `
  --set-env-vars "NODE_ENV=production,DB_STORAGE=$DbStorage"

Write-Host "Backend deployed: $ServiceName ($Region)"
