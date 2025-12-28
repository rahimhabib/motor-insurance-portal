import { NextRequest, NextResponse } from 'next/server';
import { sendEmailToTeam, sendEmailToCustomer } from '@/lib/emailService';

/**
 * API Route to send email notifications
 * POST /api/send-email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, leadData } = body;

    if (type === 'team') {
      // Send email to internal team
      const result = await sendEmailToTeam(leadData);
      return NextResponse.json({ success: result });
    } else if (type === 'customer') {
      // Send email to customer
      const result = await sendEmailToCustomer(leadData);
      return NextResponse.json({ success: result });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid email type' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

