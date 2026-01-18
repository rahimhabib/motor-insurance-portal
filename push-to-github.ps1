# Push Motor Insurance Portal to GitHub
# Repository: https://github.com/rahimhabib/motor-insurance-portal

Write-Host "=== Pushing to GitHub ===" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/rahimhabib/motor-insurance-portal" -ForegroundColor Yellow
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Install with default settings" -ForegroundColor Yellow
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "Step 1: Checking if git is initialized..." -ForegroundColor Cyan
if (Test-Path .git) {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
    git branch -M main
}

Write-Host ""
Write-Host "Step 2: Adding all files..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Step 3: Checking for existing commits..." -ForegroundColor Cyan
$commitCount = (git rev-list --count HEAD 2>$null)
if ($commitCount -eq "0" -or $commitCount -eq $null) {
    Write-Host "Creating initial commit..." -ForegroundColor Cyan
    git commit -m "Initial commit: Motor Insurance Quotation Portal"
} else {
    Write-Host "✓ Repository already has commits" -ForegroundColor Green
    Write-Host "Creating commit with current changes..." -ForegroundColor Cyan
    git add .
    git commit -m "Update: Motor Insurance Quotation Portal" -a
}

Write-Host ""
Write-Host "Step 4: Setting up remote repository..." -ForegroundColor Cyan
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/rahimhabib/motor-insurance-portal.git
} else {
    Write-Host "Adding remote 'origin'..." -ForegroundColor Cyan
    git remote add origin https://github.com/rahimhabib/motor-insurance-portal.git
}

Write-Host ""
Write-Host "Step 5: Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You may be prompted for your GitHub credentials." -ForegroundColor Yellow
Write-Host ""
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: https://github.com/rahimhabib/motor-insurance-portal" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Share this link with your colleague:" -ForegroundColor Yellow
    Write-Host "https://github.com/rahimhabib/motor-insurance-portal" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "✗ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "1. Authentication required - use Personal Access Token" -ForegroundColor Yellow
    Write-Host "2. Create token at: https://github.com/settings/tokens" -ForegroundColor Yellow
    Write-Host "3. Use token as password when prompted" -ForegroundColor Yellow
}


