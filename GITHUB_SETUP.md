# GitHub Setup Instructions

Follow these steps to sync your Motor Insurance Portal project with GitHub:

## Step 1: Install Git (if not already installed)

1. Download Git from: https://git-scm.com/download/win
2. Install with default settings
3. Restart your terminal/command prompt after installation

## Step 2: Configure Git (First time only)

Open PowerShell or Command Prompt and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Git Repository

Navigate to your project directory and run:

```bash
cd d:\Cursor\MotorOnline
git init
```

## Step 4: Add All Files

```bash
git add .
```

## Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Motor Insurance Quotation Portal"
```

## Step 6: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `motor-insurance-portal` (or any name you prefer)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 7: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/motor-insurance-portal.git
git branch -M main
git push -u origin main
```

## Step 8: Share with Your Colleague

Once pushed, share the repository URL:
```
https://github.com/YOUR_USERNAME/motor-insurance-portal
```

Your colleague can then clone it using:
```bash
git clone https://github.com/YOUR_USERNAME/motor-insurance-portal.git
cd motor-insurance-portal
npm install
npm run dev
```

## Quick Command Summary

If Git is already installed, you can run these commands in sequence:

```bash
cd d:\Cursor\MotorOnline
git init
git add .
git commit -m "Initial commit: Motor Insurance Quotation Portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/motor-insurance-portal.git
git push -u origin main
```

## Troubleshooting

- **If you get authentication errors**: You may need to use a Personal Access Token instead of password
  - Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
  - Generate a new token with `repo` permissions
  - Use the token as your password when pushing

- **If Git is not recognized**: Make sure Git is installed and added to your system PATH

