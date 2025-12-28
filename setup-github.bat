@echo off
echo === Motor Insurance Portal - GitHub Setup ===
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Install with default settings
    echo 3. Restart Command Prompt and run this script again
    echo.
    pause
    exit /b 1
)

echo Git is installed!
echo.
echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Motor Insurance Quotation Portal"

echo.
echo Step 4: Setting default branch to 'main'...
git branch -M main

echo.
echo Local Git repository is ready!
echo.
echo Next steps:
echo 1. Go to https://github.com and create a new repository
echo 2. Name it: motor-insurance-portal (or any name you prefer)
echo 3. DO NOT initialize with README, .gitignore, or license
echo 4. After creating, run these commands (replace YOUR_USERNAME):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/motor-insurance-portal.git
echo    git push -u origin main
echo.
pause

