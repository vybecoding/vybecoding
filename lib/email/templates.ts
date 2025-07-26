// Email templates with consistent branding

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vybecoding</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #6366f1;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #6366f1;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 14px;
      color: #666;
    }
    .footer a {
      color: #6366f1;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">vybecoding</div>
      </div>
      ${content}
      <div class="footer">
        <p>© ${new Date().getFullYear()} vybecoding. All rights reserved.</p>
        <p>
          <a href="https://vybecoding.ai/terms">Terms</a> · 
          <a href="https://vybecoding.ai/privacy">Privacy</a> · 
          <a href="https://vybecoding.ai/unsubscribe">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const welcomeEmail = (firstName: string) => baseTemplate(`
  <h1>Welcome to vybecoding! 🎉</h1>
  <p>Hi ${firstName},</p>
  <p>Thanks for joining vybecoding! We're excited to have you on board.</p>
  <p>Here's what you can do next:</p>
  <ul>
    <li>Complete your profile</li>
    <li>Explore our features</li>
    <li>Join our community</li>
  </ul>
  <center>
    <a href="https://vybecoding.ai/dashboard" class="button">Go to Dashboard</a>
  </center>
  <p>If you have any questions, feel free to reply to this email.</p>
  <p>Best regards,<br>The vybecoding Team</p>
`);

export const passwordResetEmail = (resetUrl: string) => baseTemplate(`
  <h1>Reset Your Password</h1>
  <p>You requested to reset your password. Click the button below to create a new password:</p>
  <center>
    <a href="${resetUrl}" class="button">Reset Password</a>
  </center>
  <p>This link will expire in 1 hour for security reasons.</p>
  <p>If you didn't request this, you can safely ignore this email.</p>
`);

export const subscriptionConfirmationEmail = (planName: string, nextBillingDate: string) => baseTemplate(`
  <h1>Subscription Confirmed! ✅</h1>
  <p>Your subscription to the <strong>${planName}</strong> plan is now active.</p>
  <p>Next billing date: <strong>${nextBillingDate}</strong></p>
  <center>
    <a href="https://vybecoding.ai/account/billing" class="button">Manage Subscription</a>
  </center>
  <p>Thank you for upgrading! You now have access to all premium features.</p>
`);

export const subscriptionCanceledEmail = (endDate: string) => baseTemplate(`
  <h1>Subscription Canceled</h1>
  <p>Your subscription has been canceled and will remain active until <strong>${endDate}</strong>.</p>
  <p>After this date, you'll be moved to the free plan. You can resubscribe anytime.</p>
  <center>
    <a href="https://vybecoding.ai/pricing" class="button">View Plans</a>
  </center>
  <p>We're sorry to see you go. If you have feedback, we'd love to hear it.</p>
`);

export const invoiceEmail = (invoiceUrl: string, amount: string, date: string) => baseTemplate(`
  <h1>Invoice Available</h1>
  <p>Your invoice for <strong>${amount}</strong> dated <strong>${date}</strong> is now available.</p>
  <center>
    <a href="${invoiceUrl}" class="button">Download Invoice</a>
  </center>
  <p>This invoice is for your records. No action is required.</p>
`);

// Plain text versions
export const welcomeEmailText = (firstName: string) => `
Welcome to vybecoding!

Hi ${firstName},

Thanks for joining vybecoding! We're excited to have you on board.

Here's what you can do next:
- Complete your profile
- Explore our features
- Join our community

Visit your dashboard: https://vybecoding.ai/dashboard

If you have any questions, feel free to reply to this email.

Best regards,
The vybecoding Team
`;

export const passwordResetEmailText = (resetUrl: string) => `
Reset Your Password

You requested to reset your password. Visit this link to create a new password:

${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request this, you can safely ignore this email.
`;