import { NextResponse } from 'next/server';
import { getEmailService } from '@/lib/email';

// Test endpoint for email sending (development only)
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Development only' }, { status: 403 });
  }

  const testEmail = process.env.TEST_EMAIL_ADDRESS || 'test@example.com';
  const emailService = getEmailService();

  const result = await emailService.sendEmail({
    to: testEmail,
    subject: 'vybecoding Email Test',
    html: `
      <h1>Test Email</h1>
      <p>This is a test email from vybecoding.</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
    `,
    text: `Test Email\n\nThis is a test email from vybecoding.\nTimestamp: ${new Date().toISOString()}`,
  });

  return NextResponse.json(result);
}