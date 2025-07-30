import { Resend } from 'resend';

// Email service interface for easy provider switching
export interface EmailService {
  sendEmail(params: {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    from?: string;
    replyTo?: string;
  }): Promise<{ success: boolean; error?: string; data?: any }>;
}

// Resend implementation
class ResendService implements EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set');
    }
    
    this.resend = new Resend(apiKey);
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@vybecoding.ai';
  }

  async sendEmail(params: {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    from?: string;
    replyTo?: string;
  }) {
    try {
      const result = await this.resend.emails.send({
        from: params.from || this.fromEmail,
        to: params.to,
        subject: params.subject,
        html: params.html || params.text || '',
        text: params.text,
        replyTo: params.replyTo,
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Email send error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

// Export singleton instance
let emailService: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailService) {
    emailService = new ResendService();
  }
  return emailService;
}

// When ready to switch to Postal, just change this:
// emailService = new PostalService();