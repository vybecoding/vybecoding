# Marketplace Booking Architecture

## The Challenge
Cal.com's pricing model ($12-79/user/month) doesn't work for marketplaces with thousands of members. You need a solution that scales without per-user costs.

## Recommended Solution: Custom Booking System

### Architecture Overview
```
Your Platform ($20/month hosting)
├── Member Profiles (Convex)
├── Booking Engine (Custom)
├── Payment Processing (Stripe)
└── Notifications (Resend)
```

### Option 1: Minimal Custom Solution (Recommended)

#### Database Schema (Convex)
```typescript
// Member availability settings
memberSettings: defineTable({
  userId: v.string(),
  timezone: v.string(),
  duration: v.number(), // default meeting duration
  buffer: v.number(), // minutes between meetings
  price: v.number(),
  currency: v.string(),
  weeklySchedule: v.object({
    monday: v.array(v.object({ start: v.string(), end: v.string() })),
    tuesday: v.array(v.object({ start: v.string(), end: v.string() })),
    // ... other days
  }),
  blockedDates: v.array(v.string()),
})

// Bookings
bookings: defineTable({
  memberId: v.string(),
  customerId: v.string(),
  startTime: v.string(),
  endTime: v.string(),
  status: v.string(), // confirmed, cancelled, completed
  price: v.number(),
  stripePaymentIntentId: v.string(),
  meetingUrl: v.optional(v.string()),
  notes: v.optional(v.string()),
})
```

#### Key Components
1. **Availability Calendar** - Show member's available slots
2. **Booking Form** - Collect customer info
3. **Payment Integration** - Use existing Stripe setup
4. **Email Notifications** - Use Resend for confirmations

### Option 2: Third-Party Alternatives

#### 1. **Calendly Marketplace** ($0/month)
- Members create their own free Calendly accounts
- Embed their Calendly links in your platform
- They handle their own payments via Calendly-Stripe

#### 2. **TidyCal** ($29 lifetime per member)
- One-time payment per member
- White-label friendly
- Integrates with Stripe

#### 3. **SimplyBook.me** (From $0/month)
- Free tier available
- Marketplace features
- Commission-based pricing available

### Option 3: Hybrid Approach

Use different solutions based on member tier:
- **Free members**: Basic availability display, contact form
- **Pro members**: Custom booking with Stripe
- **Premium members**: Full Cal.com integration (they pay)

## Implementation Plan

### Phase 1: MVP (1 week)
```typescript
// Simple booking page
<MemberBookingPage>
  <AvailabilityCalendar memberId={memberId} />
  <BookingForm onSubmit={handleBooking} />
  <StripePayment amount={member.price} />
</MemberBookingPage>
```

### Phase 2: Enhanced Features (2-3 weeks)
- Recurring bookings
- Calendar sync (Google, Outlook)
- Video meeting integration
- Rescheduling/cancellations

### Phase 3: Scale (1 month)
- Bulk availability management
- Team bookings
- Advanced scheduling rules
- Analytics dashboard

## Cost Comparison

| Solution | 1000 Members | Setup Time | Monthly Cost |
|----------|--------------|------------|--------------|
| Cal.com Teams | ❌ | 1 day | $12,000 |
| Cal.com Platform | ❌ | 1 week | $189 + member accounts |
| Custom Basic | ✅ | 1 week | $0 |
| Custom Full | ✅ | 1 month | $0 |
| Hybrid | ✅ | 3 days | Varies |

## Quick Start: Basic Booking System

```bash
# 1. Install dependencies
npm install date-fns react-big-calendar

# 2. Create booking components
mkdir components/booking
touch components/booking/Calendar.tsx
touch components/booking/TimeSlotPicker.tsx
touch components/booking/BookingForm.tsx

# 3. Set up API routes
mkdir app/api/bookings
touch app/api/bookings/availability/route.ts
touch app/api/bookings/create/route.ts
```

## Recommended Path

1. **Start with basic custom booking** (1 week to MVP)
2. **Add features based on user feedback**
3. **Consider Cal.com self-hosting only if you need complex features**
4. **Let premium members use their own Cal.com accounts**

This approach gives you:
- ✅ No per-user costs
- ✅ Full control over features
- ✅ Works with your existing stack
- ✅ Scales to unlimited members
- ✅ Own your data and customer relationships