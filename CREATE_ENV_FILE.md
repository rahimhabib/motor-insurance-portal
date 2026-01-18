# How to Create .env.local File

## Quick Steps

1. **Create the file**: Create a new file named `.env.local` in the root directory (`d:\Cursor\MotorOnline`)

2. **Copy the template**: Copy the contents from `env.template` file

3. **Fill in your values**: Replace the placeholder values with your actual email credentials

## Method 1: Using PowerShell

```powershell
# Copy the template
Copy-Item env.template .env.local

# Then edit .env.local with your actual values
notepad .env.local
```

## Method 2: Manual Creation

1. Create a new file named `.env.local` in the project root
2. Copy this content and fill in your values:

```env
# Email Configuration
TEAM_EMAIL=motor-team@insurancecompany.com

# For Gmail/Outlook with Nodemailer:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password-here
SMTP_FROM=noreply@insurancecompany.com
```

## For Gmail Setup

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** → **2-Step Verification** (enable if not enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Use it as `SMTP_PASSWORD` in `.env.local`

## Example .env.local

```env
TEAM_EMAIL=motor-team@insurancecompany.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=john.doe@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
SMTP_FROM=noreply@insurancecompany.com
```

## Important Notes

- ✅ `.env.local` is already in `.gitignore` - it won't be committed to Git
- ✅ Restart your dev server after creating/updating `.env.local`
- ✅ Never share your `.env.local` file or commit it to Git
- ✅ Use App Passwords for Gmail, not your regular password

## Verify It Works

After creating `.env.local`:

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Submit a test quotation

3. Check the console - you should see email logs (or actual emails if configured)

## Troubleshooting

**File not found?**
- Make sure the file is named exactly `.env.local` (with the dot at the start)
- Make sure it's in the root directory (`d:\Cursor\MotorOnline`)

**Emails not sending?**
- Check that all values in `.env.local` are correct
- For Gmail, make sure you're using an App Password
- Restart your dev server after changes


