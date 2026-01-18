# Quick GitHub Push Commands

Since your repository is already created at: **https://github.com/rahimhabib/motor-insurance-portal**

## Option 1: Run the Script (Easiest)

After installing Git, simply run:
```powershell
.\push-to-github.ps1
```

Or double-click `push-to-github.bat`

## Option 2: Manual Commands

If you prefer to run commands manually, here's what to do:

### 1. Install Git (if not installed)
Download from: https://git-scm.com/download/win

### 2. Open PowerShell in your project folder and run:

```powershell
# Initialize git (if not already done)
git init
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Motor Insurance Quotation Portal"

# Connect to your GitHub repository
git remote add origin https://github.com/rahimhabib/motor-insurance-portal.git

# Push to GitHub
git push -u origin main
```

## Authentication

When you run `git push`, you'll be prompted for credentials:

1. **Username**: Your GitHub username (`rahimhabib`)
2. **Password**: Use a **Personal Access Token** (not your GitHub password)

### How to Create a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "Motor Insurance Portal")
4. Select scope: **`repo`** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

## After Pushing

Your repository will be available at:
**https://github.com/rahimhabib/motor-insurance-portal**

Share this link with your colleague!

## Your Colleague Can Clone It:

```bash
git clone https://github.com/rahimhabib/motor-insurance-portal.git
cd motor-insurance-portal
npm install
npm run dev
```


