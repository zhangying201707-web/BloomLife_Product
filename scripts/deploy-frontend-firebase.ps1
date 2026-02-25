param(
  [Parameter(Mandatory = $false)][string]$ProjectId = ""
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

Write-Host "Building frontend..."
Set-Location ./frontend
npm run build
Set-Location ..

Write-Host "Deploying Firebase Hosting..."
firebase deploy --only hosting --project $ProjectId

Write-Host "Frontend deployed to Firebase Hosting."
