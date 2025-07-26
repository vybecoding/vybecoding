# Resend Email Integration

## Setup Instructions

1. **Get your Resend API key:**
   - Go to https://resend.com/signup
   - Create a free account (100k emails/month)
   - Navigate to API Keys section
   - Create a new API key
   - Add it to `.env.local`: `RESEND_API_KEY=re_xxxxx`

2. **Verify your domain (optional but recommended):**
   - In Resend dashboard, go to Domains
   - Add your domain (vybecoding.ai)
   - Follow DNS verification steps
   - Update `EMAIL_FROM` in `.env.local` once verified

3. **Test email sending:**
   - Set `TEST_EMAIL_ADDRESS` in `.env.local` to your email
   - In development, visit: http://localhost:3000/api/email/test
   - Check your inbox for the test email

## Usage Examples

```typescript
import { getEmailService } from '@/lib/email';
import { welcomeEmail, welcomeEmailText } from '@/lib/email/templates';

// Send welcome email
const emailService = getEmailService();
await emailService.sendEmail({
  to: user.email,
  subject: 'Welcome to vybecoding!',
  html: welcomeEmail(user.firstName),
  text: welcomeEmailText(user.firstName),
});

// Send custom email
await emailService.sendEmail({
  to: 'user@example.com',
  subject: 'Custom Subject',
  html: '<h1>Custom HTML</h1>',
  text: 'Custom plain text',
});
```

## Integration Points

### 1. User Registration (with Clerk webhook)
```typescript
// app/api/clerk/webhook/route.ts
import { getEmailService } from '@/lib/email';
import { welcomeEmail, welcomeEmailText } from '@/lib/email/templates';

// In your user.created webhook handler:
const emailService = getEmailService();
await emailService.sendEmail({
  to: user.emailAddresses[0].emailAddress,
  subject: 'Welcome to vybecoding!',
  html: welcomeEmail(user.firstName || 'there'),
  text: welcomeEmailText(user.firstName || 'there'),
});
```

### 2. Stripe Subscription Events
```typescript
// In your Stripe webhook handler:
if (event.type === 'customer.subscription.created') {
  await emailService.sendEmail({
    to: customer.email,
    subject: 'Subscription Confirmed',
    html: subscriptionConfirmationEmail(plan.name, nextBillingDate),
  });
}
```

## Switching to Postal (When Needed)

When you exceed 100k emails/month:

1. Set up Postal on your server
2. Create a new `PostalService` class implementing `EmailService`
3. Update the factory in `/lib/email/index.ts`:

```typescript
// Change from:
emailService = new ResendService();

// To:
emailService = new PostalService();
```

All your email code will continue working without changes!