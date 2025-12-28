/**
 * Email Service Implementation
 * Supports multiple email providers: Nodemailer, SendGrid, AWS SES, Resend
 * 
 * To use a specific provider, install the required package and uncomment the relevant section
 */

import { LeadData } from './notifications';

// Email configuration - Set these in your .env.local file
const EMAIL_CONFIG = {
  // Internal team email
  TEAM_EMAIL: process.env.TEAM_EMAIL || 'motor-team@insurancecompany.com',
  
  // Email service configuration
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  SMTP_FROM: process.env.SMTP_FROM || 'noreply@insurancecompany.com',
  
  // SendGrid API Key (if using SendGrid)
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  
  // AWS SES Configuration (if using AWS SES)
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
  
  // Resend API Key (if using Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
};

/**
 * Send email to internal team
 */
export async function sendEmailToTeam(leadData: LeadData): Promise<boolean> {
  try {
    const emailContent = formatTeamEmail(leadData);
    
    // Choose your email provider (uncomment one):
    
    // Option 1: Using Nodemailer (most common, works with Gmail, Outlook, etc.)
    // return await sendWithNodemailer({
    //   to: EMAIL_CONFIG.TEAM_EMAIL,
    //   subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
    //   html: emailContent.html,
    //   text: emailContent.text,
    // });
    
    // Option 2: Using SendGrid
    // return await sendWithSendGrid({
    //   to: EMAIL_CONFIG.TEAM_EMAIL,
    //   subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
    //   html: emailContent.html,
    //   text: emailContent.text,
    // });
    
    // Option 3: Using AWS SES
    // return await sendWithAWSSES({
    //   to: EMAIL_CONFIG.TEAM_EMAIL,
    //   subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
    //   html: emailContent.html,
    //   text: emailContent.text,
    // });
    
    // Option 4: Using Resend (modern, simple)
    // return await sendWithResend({
    //   to: EMAIL_CONFIG.TEAM_EMAIL,
    //   subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
    //   html: emailContent.html,
    // });
    
    // For now, log to console (development mode)
    console.log('📧 Email to Team:', {
      to: EMAIL_CONFIG.TEAM_EMAIL,
      subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
      body: emailContent.text,
    });
    
    return true;
  } catch (error) {
    console.error('Failed to send email to team:', error);
    return false;
  }
}

/**
 * Send email to customer with reference number
 */
export async function sendEmailToCustomer(leadData: LeadData): Promise<boolean> {
  try {
    // Only send if customer provided email
    if (!leadData.customerDetails.email) {
      console.log('No email provided by customer, skipping customer email');
      return false;
    }
    
    const emailContent = formatCustomerEmail(leadData);
    
    // Choose your email provider (same as above)
    // For now, log to console (development mode)
    console.log('📧 Email to Customer:', {
      to: leadData.customerDetails.email,
      subject: `Your Motor Insurance Quotation - ${leadData.referenceNumber}`,
      body: emailContent.text,
    });
    
    return true;
  } catch (error) {
    console.error('Failed to send email to customer:', error);
    return false;
  }
}

/**
 * Format email for internal team
 */
function formatTeamEmail(lead: LeadData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #667eea; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; }
        .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .reference { font-size: 24px; font-weight: bold; color: #667eea; text-align: center; padding: 20px; background: white; border: 2px solid #667eea; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🚗 New Motor Insurance Lead</h2>
        </div>
        <div class="content">
          <div class="reference">Reference: ${lead.referenceNumber}</div>
          
          <div class="section">
            <h3>Lead Information</h3>
            <div class="detail-row"><span class="label">Status:</span> <span>${lead.status}</span></div>
            <div class="detail-row"><span class="label">Assigned To:</span> <span>${lead.assignedTo}</span></div>
            <div class="detail-row"><span class="label">Generated At:</span> <span>${new Date(lead.timestamp).toLocaleString()}</span></div>
          </div>
          
          <div class="section">
            <h3>Vehicle Details</h3>
            <div class="detail-row"><span class="label">Make:</span> <span>${lead.vehicleDetails.make}</span></div>
            <div class="detail-row"><span class="label">Model:</span> <span>${lead.vehicleDetails.model}</span></div>
            <div class="detail-row"><span class="label">Year:</span> <span>${lead.vehicleDetails.modelYear}</span></div>
            <div class="detail-row"><span class="label">City:</span> <span>${lead.vehicleDetails.city}</span></div>
            <div class="detail-row"><span class="label">Sum Insured:</span> <span>PKR ${lead.vehicleDetails.sumInsured.toLocaleString()}</span></div>
          </div>
          
          <div class="section">
            <h3>Customer Details</h3>
            <div class="detail-row"><span class="label">Name:</span> <span>${lead.customerDetails.fullName}</span></div>
            <div class="detail-row"><span class="label">Mobile:</span> <span>${lead.customerDetails.mobile}</span></div>
            ${lead.customerDetails.email ? `<div class="detail-row"><span class="label">Email:</span> <span>${lead.customerDetails.email}</span></div>` : ''}
          </div>
          
          <div class="section">
            <h3>Coverage & Premium</h3>
            <div class="detail-row"><span class="label">Coverage Type:</span> <span>${lead.coverageType}</span></div>
            <div class="detail-row"><span class="label">Estimated Premium:</span> <span><strong>PKR ${lead.quotation.totalPremium.toLocaleString()}</strong></span></div>
            <div class="detail-row"><span class="label">Deductible:</span> <span>PKR ${lead.quotation.deductible.toLocaleString()}</span></div>
          </div>
          
          ${lead.addOns.personalAccident || lead.addOns.tracker ? `
          <div class="section">
            <h3>Add-Ons</h3>
            ${lead.addOns.personalAccident ? `<div class="detail-row"><span class="label">Personal Accident:</span> <span>PKR ${lead.addOns.personalAccident.sumInsured.toLocaleString()} (Age: ${lead.addOns.personalAccident.age}, ${lead.addOns.personalAccident.gender})</span></div>` : ''}
            ${lead.addOns.tracker ? `<div class="detail-row"><span class="label">Tracker:</span> <span>Selected</span></div>` : ''}
          </div>
          ` : ''}
          
          <div class="section" style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">⚠️ Action Required</h3>
            <p style="margin: 0; color: #856404;">Please contact the customer to arrange vehicle inspection and proceed with underwriting.</p>
          </div>
        </div>
        <div class="footer">
          This is an automated notification from Motor Insurance Portal
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
New Motor Insurance Lead Generated

Reference Number: ${lead.referenceNumber}
Status: ${lead.status}
Assigned To: ${lead.assignedTo}
Generated At: ${new Date(lead.timestamp).toLocaleString()}

VEHICLE DETAILS:
- Make: ${lead.vehicleDetails.make}
- Model: ${lead.vehicleDetails.model}
- Year: ${lead.vehicleDetails.modelYear}
- City: ${lead.vehicleDetails.city}
- Sum Insured: PKR ${lead.vehicleDetails.sumInsured.toLocaleString()}

CUSTOMER DETAILS:
- Name: ${lead.customerDetails.fullName}
- Mobile: ${lead.customerDetails.mobile}
${lead.customerDetails.email ? `- Email: ${lead.customerDetails.email}` : ''}

COVERAGE:
- Type: ${lead.coverageType}
- Estimated Premium: PKR ${lead.quotation.totalPremium.toLocaleString()}
- Deductible: PKR ${lead.quotation.deductible.toLocaleString()}

${lead.addOns.personalAccident || lead.addOns.tracker ? `ADD-ONS:
${lead.addOns.personalAccident ? `- Personal Accident: PKR ${lead.addOns.personalAccident.sumInsured.toLocaleString()} (Age: ${lead.addOns.personalAccident.age}, Gender: ${lead.addOns.personalAccident.gender})` : ''}
${lead.addOns.tracker ? '- Tracker: Selected' : ''}
` : ''}

ACTION REQUIRED:
Please contact the customer to arrange vehicle inspection and proceed with underwriting.

---
This is an automated notification from Motor Insurance Portal.
  `.trim();
  
  return { html, text };
}

/**
 * Format email for customer
 */
function formatCustomerEmail(lead: LeadData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .reference-box { background: white; border: 3px solid #667eea; border-radius: 12px; padding: 25px; text-align: center; margin: 25px 0; }
        .reference-number { font-size: 28px; font-weight: bold; color: #667eea; letter-spacing: 3px; font-family: 'Courier New', monospace; }
        .section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .section h3 { color: #667eea; margin-top: 0; }
        .detail { padding: 8px 0; border-bottom: 1px solid #eee; }
        .premium { font-size: 32px; font-weight: bold; color: #667eea; text-align: center; padding: 20px; background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%); border-radius: 8px; margin: 20px 0; }
        .disclaimer { background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 15px; margin: 20px 0; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .cta { text-align: center; margin: 30px 0; }
        .button { display: inline-block; background: #4caf50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Interest!</h1>
          <p>Your Motor Insurance Quotation Request</p>
        </div>
        <div class="content">
          <div class="reference-box">
            <p style="margin: 0 0 10px 0; color: #666;">Your Reference Number:</p>
            <div class="reference-number">${lead.referenceNumber}</div>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Please save this number for future reference</p>
          </div>
          
          <p>Dear ${lead.customerDetails.fullName},</p>
          <p>Thank you for requesting a motor insurance quotation. We have received your request and our team will contact you shortly.</p>
          
          <div class="section">
            <h3>📋 Quotation Summary</h3>
            <div class="detail"><strong>Vehicle:</strong> ${lead.vehicleDetails.make} ${lead.vehicleDetails.model} (${lead.vehicleDetails.modelYear})</div>
            <div class="detail"><strong>Coverage Type:</strong> ${lead.coverageType}</div>
            <div class="detail"><strong>City:</strong> ${lead.vehicleDetails.city}</div>
            <div class="detail"><strong>Sum Insured:</strong> PKR ${lead.vehicleDetails.sumInsured.toLocaleString()}</div>
          </div>
          
          <div class="premium">
            Estimated Annual Premium<br>
            <span style="font-size: 36px;">PKR ${lead.quotation.totalPremium.toLocaleString()}</span>
          </div>
          
          ${lead.addOns.personalAccident || lead.addOns.tracker ? `
          <div class="section">
            <h3>➕ Selected Add-Ons</h3>
            ${lead.addOns.personalAccident ? `<div class="detail">Personal Accident Cover: PKR ${lead.addOns.personalAccident.sumInsured.toLocaleString()}</div>` : ''}
            ${lead.addOns.tracker ? `<div class="detail">GPS Tracker: Included</div>` : ''}
          </div>
          ` : ''}
          
          <div class="disclaimer">
            <strong>⚠️ Important:</strong> This is an estimated quotation only. Final premium, terms, and policy issuance are subject to vehicle inspection and underwriting approval.
          </div>
          
          <div class="section">
            <h3>📞 What Happens Next?</h3>
            <ol style="padding-left: 20px;">
              <li>Our Motor Team will contact you within 24 hours</li>
              <li>We'll arrange a convenient time for vehicle inspection</li>
              <li>After inspection, final premium and terms will be confirmed</li>
              <li>You'll receive updates via SMS and email</li>
            </ol>
          </div>
          
          <div class="cta">
            <p>For any queries, please contact us:</p>
            <p><strong>📞 Phone:</strong> 0800-12345</p>
            <p><strong>📧 Email:</strong> support@insurancecompany.com</p>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated email from Motor Insurance Portal</p>
          <p>© ${new Date().getFullYear()} Insurance Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Thank You for Your Interest!

Your Motor Insurance Quotation Request

Reference Number: ${lead.referenceNumber}
(Please save this number for future reference)

Dear ${lead.customerDetails.fullName},

Thank you for requesting a motor insurance quotation. We have received your request and our team will contact you shortly.

QUOTATION SUMMARY:
- Vehicle: ${lead.vehicleDetails.make} ${lead.vehicleDetails.model} (${lead.vehicleDetails.modelYear})
- Coverage Type: ${lead.coverageType}
- City: ${lead.vehicleDetails.city}
- Sum Insured: PKR ${lead.vehicleDetails.sumInsured.toLocaleString()}

Estimated Annual Premium: PKR ${lead.quotation.totalPremium.toLocaleString()}

${lead.addOns.personalAccident || lead.addOns.tracker ? `SELECTED ADD-ONS:
${lead.addOns.personalAccident ? `- Personal Accident Cover: PKR ${lead.addOns.personalAccident.sumInsured.toLocaleString()}` : ''}
${lead.addOns.tracker ? '- GPS Tracker: Included' : ''}
` : ''}

⚠️ IMPORTANT: This is an estimated quotation only. Final premium, terms, and policy issuance are subject to vehicle inspection and underwriting approval.

WHAT HAPPENS NEXT?
1. Our Motor Team will contact you within 24 hours
2. We'll arrange a convenient time for vehicle inspection
3. After inspection, final premium and terms will be confirmed
4. You'll receive updates via SMS and email

For any queries, please contact us:
📞 Phone: 0800-12345
📧 Email: support@insurancecompany.com

---
This is an automated email from Motor Insurance Portal
© ${new Date().getFullYear()} Insurance Company. All rights reserved.
  `.trim();
  
  return { html, text };
}

// ============================================
// Email Provider Implementations
// Uncomment and configure the one you want to use
// ============================================

/**
 * Send email using Nodemailer (works with Gmail, Outlook, custom SMTP)
 * Install: npm install nodemailer
 * Install types: npm install --save-dev @types/nodemailer
 */
/*
import nodemailer from 'nodemailer';

async function sendWithNodemailer(options: { to: string; subject: string; html: string; text: string }): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: EMAIL_CONFIG.SMTP_HOST,
    port: EMAIL_CONFIG.SMTP_PORT,
    secure: EMAIL_CONFIG.SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_CONFIG.SMTP_USER,
      pass: EMAIL_CONFIG.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: EMAIL_CONFIG.SMTP_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  return !!info.messageId;
}
*/

/**
 * Send email using SendGrid
 * Install: npm install @sendgrid/mail
 */
/*
import sgMail from '@sendgrid/mail';

async function sendWithSendGrid(options: { to: string; subject: string; html: string; text: string }): Promise<boolean> {
  sgMail.setApiKey(EMAIL_CONFIG.SENDGRID_API_KEY);
  
  const msg = {
    to: options.to,
    from: EMAIL_CONFIG.SMTP_FROM,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  await sgMail.send(msg);
  return true;
}
*/

/**
 * Send email using AWS SES
 * Install: npm install @aws-sdk/client-ses
 */
/*
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

async function sendWithAWSSES(options: { to: string; subject: string; html: string; text: string }): Promise<boolean> {
  const sesClient = new SESClient({
    region: EMAIL_CONFIG.AWS_REGION,
    credentials: {
      accessKeyId: EMAIL_CONFIG.AWS_ACCESS_KEY,
      secretAccessKey: EMAIL_CONFIG.AWS_SECRET_KEY,
    },
  });

  const command = new SendEmailCommand({
    Source: EMAIL_CONFIG.SMTP_FROM,
    Destination: {
      ToAddresses: [options.to],
    },
    Message: {
      Subject: {
        Data: options.subject,
      },
      Body: {
        Html: {
          Data: options.html,
        },
        Text: {
          Data: options.text,
        },
      },
    },
  });

  await sesClient.send(command);
  return true;
}
*/

/**
 * Send email using Resend (modern, simple API)
 * Install: npm install resend
 */
/*
import { Resend } from 'resend';

async function sendWithResend(options: { to: string; subject: string; html: string }): Promise<boolean> {
  const resend = new Resend(EMAIL_CONFIG.RESEND_API_KEY);
  
  await resend.emails.send({
    from: EMAIL_CONFIG.SMTP_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
  
  return true;
}
*/

