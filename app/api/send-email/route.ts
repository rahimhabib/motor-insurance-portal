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

    console.log('📧 Email API called:', { type, to: type === 'team' ? leadData?.referenceNumber : leadData?.customerDetails?.email });

    if (type === 'team') {
      // Send email to internal team
      const result = await sendEmailToTeam(leadData);
      console.log('📧 Team email result:', result);
      return NextResponse.json({ success: result });
    } else if (type === 'customer') {
      // Send email to customer
      const result = await sendEmailToCustomer(leadData);
      console.log('📧 Customer email result:', result);
      return NextResponse.json({ success: result });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid email type' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('❌ Email API error:', error);
    console.error('❌ Error details:', {
      message: error?.message,
      stack: error?.stack,
    });
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}


