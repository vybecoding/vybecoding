# Booking Implementation Guide

## Decision Tree

```
Need booking? → No → Use contact forms only
             ↓
             Yes → How many members?
                   ↓
                   < 10 → Use Cal.com paid accounts
                   > 10 → Use one of these:
```

### Detailed Scaling Guide
```
How important is booking to your platform?
├─ Nice to have → Simple contact form
├─ Important → Cal.com Atoms (free)
└─ Core feature → Consider:
    ├─ < 50 members → Cal.com Teams ($600/mo)
    ├─ 50-500 members → Self-host Cal.com
    └─ 500+ members → Custom solution
```

## Implementation Options

### Option 1: Member-Owned Cal.com (Recommended for Marketplaces)
**Cost**: $0 (members pay for their own accounts)
**Setup**: 3-5 days

```typescript
// 1. Add to member schema
memberProfile: defineTable({
  calUsername: v.optional(v.string()), // member's cal.com username
  // ... other fields
})

// 2. Embed their calendar
import Cal from "@calcom/embed-react";
<Cal calLink={member.calUsername} />

// 3. Members handle their own Stripe via Cal.com
```

### Option 2: Custom Booking System
**Cost**: $0
**Setup**: 1 week

```typescript
// Database schema (Convex)
memberSettings: defineTable({
  userId: v.string(),
  timezone: v.string(),
  duration: v.number(),
  price: v.number(),
  weeklySchedule: v.object({
    monday: v.array(v.object({ start: v.string(), end: v.string() })),
    // ... other days
  }),
})

bookings: defineTable({
  memberId: v.string(),
  customerId: v.string(),
  startTime: v.string(),
  endTime: v.string(),
  status: v.string(),
  stripePaymentIntentId: v.string(),
})

// Components needed
<AvailabilityCalendar memberId={memberId} />
<BookingForm onSubmit={handleBooking} />
<StripePayment amount={member.price} />
```

### Option 3: Cal.com Open Source Components
**Cost**: $0
**Setup**: 1-2 weeks

```bash
npm install @calcom/atoms @calcom/ui @calcom/lib
```

```typescript
import { BookingCalendar } from '@calcom/atoms';

export function MemberBookingPage({ memberId }) {
  return (
    <BookingCalendar
      userId={memberId}
      onBookingComplete={handleBooking}
      paymentConfig={{
        stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
        amount: member.hourlyRate,
      }}
    />
  );
}
```

## Implementation Timeline

### Phase 1: Contact Forms Only (Now)
- Simple contact button on member profiles
- Email notifications via Resend

### Phase 2: Basic Availability (Week 3-4)
- Add availability text field to profiles
- "Request appointment" button

### Phase 3: Full Booking (Week 5-6)
- Implement chosen solution based on user feedback
- Start with 10-20 pilot members

## Quick Implementation

### For Member-Owned Cal.com:

```typescript
// 1. Update member profile page
export async function MemberProfile({ member }) {
  return (
    <>
      {member.calUsername ? (
        <Cal 
          calLink={member.calUsername}
          config={{
            theme: "dark",
            hideEventTypeDetails: false,
          }}
        />
      ) : (
        <ContactForm memberId={member.id} />
      )}
    </>
  );
}

// 2. Add setup instructions for members
<MemberDashboard>
  <CalSetupInstructions>
    1. Sign up at cal.com (free)
    2. Connect your Stripe account
    3. Enter your Cal username here
  </CalSetupInstructions>
</MemberDashboard>
```

### For Custom Solution:

```bash
# Install deps
npm install date-fns react-big-calendar

# Create components
mkdir components/booking
touch components/booking/Calendar.tsx
touch components/booking/TimeSlotPicker.tsx
touch components/booking/BookingForm.tsx

# API routes
mkdir app/api/bookings
touch app/api/bookings/availability/route.ts
touch app/api/bookings/create/route.ts
```

## Key Decisions

1. **Avoid Cal.com Platform plan** ($10,000/year) - not suitable for marketplaces
2. **Don't use Cal.com Teams** ($12-79/user/month) - too expensive at scale
3. **Let members manage their own bookings** - scales infinitely at $0 cost
4. **Build custom only if** members need unified booking experience

## Environment Variables

```env
# Only if using Cal.com embeds
NEXT_PUBLIC_CAL_USERNAME=your-cal-username
CAL_WEBHOOK_SECRET=your_webhook_secret

# For any booking solution
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
```

## Testing Checklist

- [ ] Member can add Cal username to profile
- [ ] Booking calendar displays correctly
- [ ] Payments process through member's Stripe
- [ ] Emails send to both parties
- [ ] Mobile responsive
- [ ] Timezone handling works

## Common Issues

1. **Cal embed not showing**: Check if member.calUsername exists
2. **Stripe not working**: Members must connect Stripe in Cal.com
3. **Timezone issues**: Always store in UTC, display in user timezone

## Summary

For vybecoding marketplace with 1000+ potential members:
- Use member-owned Cal.com accounts (Option 1)
- They handle payments, you provide the platform
- Zero per-user costs
- Implement in Phase 5 after core features