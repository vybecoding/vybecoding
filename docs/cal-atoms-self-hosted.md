# Self-Hosting Cal.com Atoms for Marketplace

## The Solution: Use Cal.com's Open Source Components

Cal.com is open source, which means you can use their React components (Atoms) without paying $10,000/year for the Platform plan.

## What are Cal.com Atoms?

Atoms are Cal.com's modular React components:
- **Booking Calendar** - Shows available slots
- **Availability Settings** - Manage member schedules  
- **Google Calendar Connect** - Sync with external calendars
- **Payment Integration** - Built-in Stripe support

## How to Self-Host for Your Marketplace

### Option 1: Use Cal.com Components Directly (Recommended)

```bash
# Install Cal.com's open source packages
npm install @calcom/atoms @calcom/ui @calcom/lib
```

```typescript
// Use their components in your app
import { BookingCalendar } from '@calcom/atoms';
import { AvailabilitySettings } from '@calcom/atoms';

// Each member gets their own booking page
export function MemberBookingPage({ memberId }: { memberId: string }) {
  return (
    <BookingCalendar
      userId={memberId}
      onBookingComplete={handleBooking}
      // Your Stripe integration
      paymentConfig={{
        stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
        amount: member.hourlyRate,
      }}
    />
  );
}
```

### Option 2: Fork and Modify Cal.com

```bash
# Clone Cal.com
git clone https://github.com/calcom/cal.com.git
cd cal.com

# Modify for multi-tenancy
# - Add member_id to all tables
# - Modify auth to support your Clerk users
# - Remove their billing/subscription code
```

### Option 3: Extract Just What You Need

Since Cal.com is open source (AGPLv3), you can:
1. Study their booking logic
2. Extract the components you need
3. Adapt them to work with your Convex backend

## Implementation Strategy

### 1. Database Schema (Convex)
```typescript
// Member availability
memberAvailability: defineTable({
  memberId: v.string(),
  schedules: v.array(v.object({
    name: v.string(),
    timezone: v.string(),
    availability: v.array(v.object({
      days: v.array(v.number()),
      startTime: v.string(), // "09:00"
      endTime: v.string(),   // "17:00"
    })),
  })),
  dateOverrides: v.array(v.object({
    date: v.string(),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
  })),
})

// Bookings (reuse your existing schema)
bookings: defineTable({
  memberId: v.string(),
  // ... existing fields
})
```

### 2. Key Components to Build/Adapt

```typescript
// components/booking/CalendarView.tsx
// Adapt from @calcom/atoms or build custom
export function CalendarView({ 
  memberId,
  onSlotSelect 
}: CalendarViewProps) {
  // Show available slots
}

// components/booking/AvailabilityForm.tsx  
// Let members set their schedule
export function AvailabilityForm({
  memberId,
  onSave
}: AvailabilityFormProps) {
  // Weekly recurring availability
}

// components/booking/BookingFlow.tsx
// Complete booking with payment
export function BookingFlow({
  memberId,
  selectedSlot,
  price
}: BookingFlowProps) {
  // 1. Collect customer info
  // 2. Process Stripe payment
  // 3. Create booking in Convex
  // 4. Send emails via Resend
}
```

## Cost Analysis

| Approach | Monthly Cost | Development Time |
|----------|--------------|------------------|
| Cal.com Platform | $833+ | 1 week |
| Self-host full Cal.com | $20-50 (hosting) | 2-4 weeks |
| Use Cal.com Atoms | $0 | 1-2 weeks |
| Build custom inspired by Cal | $0 | 2-3 weeks |

## Legal Considerations

Cal.com uses AGPLv3 license, which means:
- ✅ You can use it for commercial purposes
- ✅ You can modify the code
- ⚠️ If you modify and distribute, you must open source your changes
- ✅ Using their components via npm is generally fine
- ✅ Building your own inspired version is always allowed

## Recommended Path

1. **Start Simple**: Build basic booking with your existing stack
2. **Study Cal.com**: Learn from their open source code
3. **Gradually Add Features**: 
   - Week 1: Basic availability and booking
   - Week 2: Calendar sync
   - Week 3: Recurring appointments
   - Week 4: Team scheduling

## Quick Start

```bash
# Option 1: Use their UI components
npm install @calcom/ui @calcom/embed-react

# Option 2: Build inspired components
npm install date-fns react-big-calendar react-hook-form

# Option 3: Clone and study
git clone https://github.com/calcom/cal.com.git cal-study
cd cal-study && npm install
# Study their implementation
```

## Example: Minimal Booking System

```typescript
// Using your existing stack + Cal.com inspiration
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { api } from '@/convex/_generated/api';

export function MemberBookingWidget({ member }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  return (
    <div>
      {/* Your custom calendar component */}
      <AvailableSlots 
        memberId={member.id}
        onSelect={setSelectedSlot}
      />
      
      {/* Booking form with Stripe */}
      {selectedSlot && (
        <BookingForm
          slot={selectedSlot}
          price={member.hourlyRate}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
```

This approach gives you:
- ✅ No monthly Cal.com fees
- ✅ Full control over the experience
- ✅ Works with unlimited members
- ✅ Integrates with your existing stack
- ✅ Can study Cal.com's code for best practices