/**
 * Notification Functions
 * Email and WhatsApp notification stubs
 * In production, these would integrate with actual email/WhatsApp APIs
 */

export interface LeadData {
  referenceNumber: string;
  vehicleDetails: {
    make: string;
    model: string;
    modelYear: number;
    city: string;
    sumInsured: number;
  };
  customerDetails: {
    fullName: string;
    mobile: string;
    email?: string;
  };
  coverageType: string;
  addOns: {
    personalAccident?: {
      sumInsured: number;
      age: number;
      gender: string;
    };
    tracker?: boolean;
  };
  quotation: {
    totalPremium: number;
    deductible: number;
  };
  status: string;
  assignedTo: string;
  timestamp: string;
}

/**
 * Send email notification to internal team
 * Calls the API route which handles actual email sending
 */
export async function sendEmailNotification(leadData: LeadData): Promise<boolean> {
  try {
    // Call the Next.js API route to send email
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'team',
        leadData,
      }),
    });
    
    const result = await response.json();
    return result.success || false;
  } catch (error) {
    console.error('Email notification failed:', error);
    // Fallback to console log in development
    console.log('📧 Email Notification (Fallback):', {
      to: 'motor-team@insurancecompany.com',
      subject: `New Motor Insurance Lead - ${leadData.referenceNumber}`,
      body: formatEmailBody(leadData),
    });
    return false;
  }
}

/**
 * Send email notification to customer
 * Calls the API route which handles actual email sending
 */
export async function sendEmailToCustomer(leadData: LeadData): Promise<boolean> {
  try {
    // Only send if customer provided email
    if (!leadData.customerDetails.email) {
      return false;
    }
    
    // Call the Next.js API route to send email
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'customer',
        leadData,
      }),
    });
    
    const result = await response.json();
    return result.success || false;
  } catch (error) {
    console.error('Customer email notification failed:', error);
    return false;
  }
}

/**
 * Send WhatsApp notification (optional placeholder)
 * This is a stub function - replace with actual WhatsApp Business API
 */
export async function sendWhatsAppNotification(leadData: LeadData): Promise<boolean> {
  try {
    // In production, integrate with WhatsApp Business API
    console.log('💬 WhatsApp Notification:', {
      to: '+92XXXXXXXXXX', // Internal team WhatsApp number
      message: formatWhatsAppMessage(leadData),
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  } catch (error) {
    console.error('WhatsApp notification failed:', error);
    return false;
  }
}

/**
 * Format email body for internal team
 */
function formatEmailBody(lead: LeadData): string {
  return `
New Motor Insurance Lead Generated

Reference Number: ${lead.referenceNumber}
Status: ${lead.status}
Assigned To: ${lead.assignedTo}
Generated At: ${lead.timestamp}

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

ADD-ONS:
${lead.addOns.personalAccident ? `- Personal Accident: PKR ${lead.addOns.personalAccident.sumInsured.toLocaleString()} (Age: ${lead.addOns.personalAccident.age}, Gender: ${lead.addOns.personalAccident.gender})` : ''}
${lead.addOns.tracker ? '- Tracker: Selected' : ''}

ACTION REQUIRED:
Please contact the customer to arrange vehicle inspection and proceed with underwriting.

---
This is an automated notification from Motor Insurance Portal.
  `.trim();
}

/**
 * Format WhatsApp message for internal team
 */
function formatWhatsAppMessage(lead: LeadData): string {
  return `🚗 New Motor Insurance Lead

Ref: ${lead.referenceNumber}
Customer: ${lead.customerDetails.fullName}
Mobile: ${lead.customerDetails.mobile}
Vehicle: ${lead.vehicleDetails.make} ${lead.vehicleDetails.model} (${lead.vehicleDetails.modelYear})
Premium: PKR ${lead.quotation.totalPremium.toLocaleString()}

Status: ${lead.status}
Action: Arrange Inspection`;
}

/**
 * Create lead object in memory (no database)
 */
export function createLead(leadData: Omit<LeadData, 'status' | 'assignedTo' | 'timestamp'>): LeadData {
  const lead: LeadData = {
    ...leadData,
    status: 'New – Inspection Required',
    assignedTo: 'Motor Team',
    timestamp: new Date().toISOString(),
  };
  
  // In a real application, this would be stored in a database
  // For this MVP, we're just logging it
  console.log('📋 Lead Created:', lead);
  
  return lead;
}

