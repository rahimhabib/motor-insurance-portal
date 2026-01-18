# Email Setup Guide

This guide explains how to configure email notifications for the Motor Insurance Portal.

## How It Works

When a customer finalizes their quotation:

1. **Internal Team Email**: Sent to your team with all lead details
2. **Customer Email**: Sent to the customer with their reference number and quotation summary

## Email Flow

```
Customer Submits Quotation
    ↓
Reference Number Generated
    ↓
Lead Created (in-memory)
    ↓
┌─────────────────────────┐
│  Email Notifications    │
├─────────────────────────┤
│ 1. Team Email (always)  │
│ 2. Customer Email       │
│    (if email provided)  │
└─────────────────────────┘
```

## Setup Options

Choose one of the following email providers:

### Option 1: Nodemailer (Recommended for Gmail/Outlook)

**Best for**: Gmail, Outlook, custom SMTP servers

1. Install package:
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

2. Create `.env.local` file:
```env
TEAM_EMAIL=motor-team@yourcompany.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@yourcompany.com
```

3. For Gmail, you need an **App Password**:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use that as `SMTP_PASSWORD`

4. Uncomment the Nodemailer code in `lib/emailService.ts`:
   - Find `sendWithNodemailer` function
   - Uncomment the import and function
   - Update `sendEmailToTeam` and `sendEmailToCustomer` to use it

### Option 2: SendGrid

**Best for**: Production apps, high volume

1. Install package:
```bash
npm install @sendgrid/mail
```

2. Get API key from: https://sendgrid.com

3. Create `.env.local`:
```env
TEAM_EMAIL=motor-team@yourcompany.com
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SMTP_FROM=noreply@yourcompany.com
```

4. Verify your sender email in SendGrid dashboard

5. Uncomment SendGrid code in `lib/emailService.ts`

### Option 3: AWS SES

**Best for**: AWS infrastructure, enterprise

1. Install package:
```bash
npm install @aws-sdk/client-ses
```

2. Create `.env.local`:
```env
TEAM_EMAIL=motor-team@yourcompany.com
AWS_REGION=us-east-1
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
SMTP_FROM=noreply@yourcompany.com
```

3. Verify your email/domain in AWS SES

4. Uncomment AWS SES code in `lib/emailService.ts`

### Option 4: Resend (Modern & Simple)

**Best for**: Modern apps, easy setup

1. Install package:
```bash
npm install resend
```

2. Get API key from: https://resend.com

3. Create `.env.local`:
```env
TEAM_EMAIL=motor-team@yourcompany.com
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_FROM=noreply@yourcompany.com
```

4. Verify your domain in Resend dashboard

5. Uncomment Resend code in `lib/emailService.ts`

## Configuration Steps

1. **Choose your provider** from the options above

2. **Install the required package**:
```bash
npm install [package-name]
```

3. **Create `.env.local`** file in the root directory with your credentials

4. **Update `lib/emailService.ts`**:
   - Uncomment the import for your chosen provider
   - Uncomment the function (e.g., `sendWithNodemailer`)
   - Update `sendEmailToTeam` and `sendEmailToCustomer` to call your function

5. **Test the setup**:
   - Submit a test quotation
   - Check your email inbox
   - Check the console for any errors

## Example: Using Nodemailer with Gmail

1. Install:
```bash
npm install nodemailer @types/nodemailer
```

2. Create `.env.local`:
```env
TEAM_EMAIL=motor-team@insurancecompany.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourname@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=noreply@insurancecompany.com
```

3. In `lib/emailService.ts`, uncomment:
```typescript
import nodemailer from 'nodemailer';

// And in sendEmailToTeam function:
return await sendWithNodemailer({
  to: EMAIL_CONFIG.TEAM_EMAIL,
  subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
  html: emailContent.html,
  text: emailContent.text,
});
```

## Email Templates

The system includes two HTML email templates:

1. **Team Email**: Professional format with all lead details
2. **Customer Email**: Customer-friendly format with reference number and next steps

Both templates are automatically formatted in `lib/emailService.ts`.

## Troubleshooting

### Emails not sending?
- Check `.env.local` file exists and has correct values
- Verify your email provider credentials
- Check browser console for errors
- Check server logs (if running in production)

### Gmail blocking emails?
- Use App Password (not regular password)
- Enable "Less secure app access" (if available)
- Consider using SendGrid or Resend instead

### Testing locally?
- Emails will log to console in development mode
- Set up a test email provider for local testing
- Use services like Mailtrap for testing SMTP

## Security Notes

- **Never commit `.env.local`** to Git (it's already in `.gitignore`)
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Use App Passwords for Gmail (not your main password)

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names as in `.env.local`
3. Restart your application after adding variables
4. Test email sending in production

## Support

For issues or questions:
- Check the email provider's documentation
- Review error messages in console
- Test with a simple email first before integrating


