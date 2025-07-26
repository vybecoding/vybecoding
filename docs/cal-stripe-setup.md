# Cal.com + Stripe Integration Setup Guide

## Overview
This guide covers setting up Cal.com with Stripe payments for your vybecoding platform, enabling paid bookings and consultations.

## Prerequisites
- Cal.com account (free or paid)
- Stripe account (already configured)
- Next.js app with Clerk auth (already configured)

## Setup Steps

### 1. Cal.com Account Setup

1. **Sign up at Cal.com**
   - Go to https://cal.com/signup
   - Create your account
   - Choose your username (this becomes your booking URL)

2. **Configure Your Profile**
   - Add profile picture
   - Set timezone
   - Configure availability

3. **Create Event Types**
   ```
   Examples:
   - /consultation (15 min, free)
   - /code-review (45 min, $100)
   - /coaching (60 min, $150)
   - /debugging (30 min, $75)
   ```

### 2. Connect Stripe to Cal.com

1. **In Cal.com Dashboard:**
   - Go to Apps → Browse Apps
   - Search for "Stripe"
   - Click "Install"
   - Connect your Stripe account

2. **Configure Payment Settings:**
   - For each paid event type:
     - Edit the event
     - Scroll to "Apps" section
     - Enable Stripe
     - Set the price
     - Save changes

3. **Enable Additional Payment Methods:**
   - Log into Stripe Dashboard
   - Go to Settings → Payments → Payment methods
   - Find Cal.com configuration
   - Enable Apple Pay and Google Pay

### 3. Update Your Code

1. **Replace Cal.com Username**
   ```typescript
   // Replace 'your-username' with your actual Cal.com username in:
   - /app/book/page.tsx
   - /app/services/page.tsx
   - Any other files using CalButton or CalEmbed
   ```

2. **Add Environment Variables**
   ```env
   # Add to .env.local
   CAL_WEBHOOK_SECRET=your_webhook_secret_here
   NEXT_PUBLIC_CAL_USERNAME=your-cal-username
   ```

3. **Configure Webhooks (Optional)**
   In Cal.com:
   - Go to Settings → Developer → Webhooks
   - Add webhook endpoint: `https://yourdomain.com/api/cal/webhook`
   - Select events:
     - BOOKING_CREATED
     - BOOKING_CANCELLED
     - BOOKING_RESCHEDULED
     - BOOKING_PAYMENT_INITIATED
   - Copy the webhook secret to .env.local

### 4. Integrate with Convex

Create a bookings table in your Convex schema:

```typescript
// convex/schema.ts
export default defineSchema({
  // ... existing tables
  
  bookings: defineTable({
    calBookingId: v.string(),
    userId: v.string(),
    eventTypeId: v.optional(v.string()),
    title: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    attendeeEmail: v.string(),
    attendeeName: v.string(),
    status: v.union(
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("rescheduled"),
      v.literal("pending_approval")
    ),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    paymentStatus: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_cal_id", ["calBookingId"])
    .index("by_status", ["status"]),
});
```

### 5. Usage Examples

#### Basic Booking Button
```tsx
<CalButton 
  calLink={`${process.env.NEXT_PUBLIC_CAL_USERNAME}/consultation`}
  buttonText="Book Free Consultation"
/>
```

#### Paid Service Button
```tsx
<CalButton 
  calLink={`${process.env.NEXT_PUBLIC_CAL_USERNAME}/coaching`}
  buttonText="Book Coaching Session"
  price={150}
  currency="USD"
/>
```

#### Inline Calendar
```tsx
<CalEmbed 
  calLink={process.env.NEXT_PUBLIC_CAL_USERNAME}
  config={{
    layout: 'month_view',
    theme: 'light',
  }}
/>
```

#### Floating Button
```tsx
<CalFloatingButton
  calLink={process.env.NEXT_PUBLIC_CAL_USERNAME}
  buttonText="Book a Call"
/>
```

## Self-Hosting Option

If you want to self-host Cal.com:

1. **Clone Cal.com**
   ```bash
   git clone https://github.com/calcom/cal.com.git
   cd cal.com
   ```

2. **Configure Environment**
   ```env
   DATABASE_URL=postgresql://...
   STRIPE_CLIENT_ID=ca_...
   STRIPE_PRIVATE_KEY=sk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Deploy**
   - Can deploy to Vercel, Railway, or your own server
   - Follow https://cal.com/docs/self-hosting/installation

## Testing

1. **Test Free Booking**
   - Click a consultation button
   - Should open Cal.com modal
   - Complete booking without payment

2. **Test Paid Booking**
   - Click a paid service button
   - Should show Stripe payment form
   - Use test card: 4242 4242 4242 4242
   - Complete booking

3. **Test Webhooks**
   - Make a booking
   - Check server logs for webhook events
   - Verify booking stored in Convex

## Common Issues

1. **"Invalid cal link" error**
   - Ensure username is correct
   - Event type must be published

2. **Payment not showing**
   - Verify Stripe is connected in Cal.com
   - Check event type has price set
   - Ensure Stripe app is enabled for that event

3. **Styling issues**
   - Cal.com inherits some styles from parent
   - May need to wrap in isolated container
   - Use `config.styles` to customize

## Next Steps

1. Customize booking confirmation emails
2. Add booking management dashboard
3. Implement recurring bookings
4. Set up team scheduling
5. Add buffer times between meetings