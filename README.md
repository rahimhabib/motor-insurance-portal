# Motor Insurance Online Quotation & Lead Portal

A lightweight, database-less web portal for Motor Insurance quotation and lead generation.

## Features

- **Single Fixed Workflow**: Quotation-first model with 5 steps
- **No Database**: Uses in-memory state management
- **Reference Number Generation**: Unique reference numbers for lead tracking
- **Email/WhatsApp Notifications**: Stub functions for internal team notifications
- **Responsive UI**: Clean, modern interface with hover tooltips
- **Config-Driven**: Easy to extend with configuration files

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── QuotationForm.tsx # Main multi-step form
├── config/                # Configuration files
│   └── vehicleData.ts     # Vehicle makes, models, cities
├── lib/                   # Utility functions
│   ├── quotation.ts      # Premium calculation logic
│   ├── referenceGenerator.ts # Reference number generation
│   ├── notifications.ts  # Email/WhatsApp functions
│   └── coverageInfo.ts   # Coverage and add-on information
└── styles/               # CSS modules
    └── QuotationForm.module.css
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Workflow

1. **Vehicle Details**: Select make, model, year, city, and sum insured
2. **Customer Information**: Enter name, mobile, and optional email
3. **Coverage Selection**: Choose one coverage type (Comprehensive, 3T, or 2T)
4. **Optional Add-Ons**: Select Personal Accident and/or Tracker
5. **Quotation Display**: View estimated premium and submit request

## Reference Number Format

Format: `MOT-YYYYMMDD-HHMMSS-XXXXX`

Example: `MOT-20241215-143052-A7B2K`

## Important Notes

- **No Database**: All data is stored in-memory during the session
- **No Policy Issuance**: This portal only generates quotations and leads
- **No Payment Processing**: Payment is handled offline after inspection
- **Single Flow Only**: No alternate workflows or customer dashboards

## Configuration

Vehicle data, cities, and personal accident slabs can be modified in `config/vehicleData.ts`.

## Email Notifications

The system sends emails when a quotation is finalized:

1. **Internal Team Email**: Sent to your team with all lead details
2. **Customer Email**: Sent to customer with reference number and quotation summary

### Setup Email Service

See `EMAIL_SETUP.md` for detailed instructions. Quick setup:

1. Choose a provider (Nodemailer, SendGrid, AWS SES, or Resend)
2. Install the package: `npm install [package-name]`
3. Create `.env.local` with your credentials
4. Update `lib/emailService.ts` to use your provider

**Example with Gmail (Nodemailer):**
```env
TEAM_EMAIL=motor-team@yourcompany.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@yourcompany.com
```

### WhatsApp Integration

WhatsApp notifications are stubs. Integrate with WhatsApp Business API in `lib/notifications.ts`.

## GitHub Setup

To share this project with your colleagues via GitHub:

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Install with default settings

2. **Run the setup script**:
   ```bash
   # PowerShell
   .\setup-github.ps1
   
   # OR Command Prompt
   setup-github.bat
   ```

3. **Create a GitHub repository**:
   - Go to https://github.com
   - Click "New repository"
   - Name it (e.g., `motor-insurance-portal`)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

4. **Push to GitHub** (replace `YOUR_USERNAME`):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/motor-insurance-portal.git
   git push -u origin main
   ```

For detailed instructions, see `GITHUB_SETUP.md`.

## License

Private - Internal Use Only

