@echo off
echo === Pushing to GitHub ===
echo Repository: https://github.com/rahimhabib/motor-insurance-portal
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

echo Step 1: Checking if git is initialized...
if exist .git (
    echo Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    git branch -M main
)

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating commit...
git commit -m "Initial commit: Motor Insurance Quotation Portal"

echo.
echo Step 4: Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/rahimhabib/motor-insurance-portal.git

echo.
echo Step 5: Pushing to GitHub...
echo You may be prompted for your GitHub credentials.
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo Push failed. You may need to:
    echo 1. Create a Personal Access Token at: https://github.com/settings/tokens
    echo 2. Use the token as your password when prompted
) else (
    echo.
    echo Successfully pushed to GitHub!
    echo.
    echo Repository URL: https://github.com/rahimhabib/motor-insurance-portal
    echo.
    echo Share this link with your colleague:
    echo https://github.com/rahimhabib/motor-insurance-portal
)

echo.
pause


