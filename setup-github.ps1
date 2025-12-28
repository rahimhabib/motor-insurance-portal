# GitHub Setup Script for Motor Insurance Portal
# Run this script after installing Git

Write-Host "=== Motor Insurance Portal - GitHub Setup ===" -ForegroundColor Cyan
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
Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Cyan
git init

Write-Host ""
Write-Host "Step 2: Adding all files..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Step 3: Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Motor Insurance Quotation Portal"

Write-Host ""
Write-Host "Step 4: Setting default branch to 'main'..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "✓ Local Git repository is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com and create a new repository" -ForegroundColor Yellow
Write-Host "2. Name it: motor-insurance-portal (or any name you prefer)" -ForegroundColor Yellow
Write-Host "3. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "4. After creating, run this command (replace YOUR_USERNAME):" -ForegroundColor Yellow
Write-Host ""
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/motor-insurance-portal.git" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""

