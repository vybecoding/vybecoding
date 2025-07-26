import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getEmailService } from '@/lib/email';
import { welcomeEmail, welcomeEmailText } from '@/lib/email/templates';

// Example API route for sending emails
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, to, data } = await req.json();
    const emailService = getEmailService();

    let result;
    
    switch (type) {
      case 'welcome':
        result = await emailService.sendEmail({
          to,
          subject: 'Welcome to vybecoding!',
          html: welcomeEmail(data.firstName || 'there'),
          text: welcomeEmailText(data.firstName || 'there'),
        });
        break;
        
      case 'custom':
        result = await emailService.sendEmail({
          to,
          subject: data.subject,
          html: data.html,
          text: data.text,
        });
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}