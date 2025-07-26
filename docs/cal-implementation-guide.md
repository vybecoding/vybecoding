# Cal.com Implementation Guide for vybecoding

## When to Implement Cal.com

### ⏰ Timing: Phase 5 (Week 6) of Development

**Prerequisites before implementing:**
1. ✅ Core platform features built (member profiles, app showcase)
2. ✅ Payment system operational (Stripe)
3. ✅ User feedback collected on service types
4. ✅ Clear understanding of booking needs

## Decision Framework

### Step 1: Determine if You Need Booking

Ask these questions:
1. **What services do members offer?**
   - Time-based consultations → Need booking
   - Project-based work → Maybe not
   - Digital products → No booking needed

2. **How do members prefer to work?**
   - Scheduled calls → Need booking
   - Async communication → No booking
   - Mixed → Optional booking

3. **What do early users request?**
   - "I need to schedule calls" → Implement booking
   - "I just need contact info" → Simple contact form
   - Mixed feedback → Start minimal

### Step 2: Choose Implementation Path

Based on your marketplace needs:

## Implementation Paths

### Path A: No Booking Needed (Simplest)
If members don't need scheduling:
```typescript
// Just use contact forms
<ContactMemberForm memberId={member.id} />
```
**Time**: 0 days
**Cost**: $0

### Path B: Basic Availability (Minimal)
For light scheduling needs:
```typescript
// components/MemberAvailability.tsx
export function MemberAvailability({ member }) {
  return (
    <div>
      <h3>Availability</h3>
      <p>{member.availabilityText}</p>
      <button onClick={() => sendEmail(member.email)}>
        Request Appointment
      </button>
    </div>
  );
}
```
**Time**: 1-2 days
**Cost**: $0

### Path C: Cal.com Atoms (Recommended for Marketplaces)
For full scheduling with unlimited members:

```bash
# Since you already installed @calcom/embed-react
# Now implement it properly for marketplace use
```

```typescript
// app/members/[id]/book/page.tsx
import { CalEmbed } from '@/components/cal/CalEmbed';

export default async function MemberBookingPage({ params }) {
  const member = await getMember(params.id);
  
  // Option 1: Each member has their own Cal.com account
  if (member.calUsername) {
    return <CalEmbed calLink={member.calUsername} />;
  }
  
  // Option 2: Use custom booking system
  return <CustomBookingSystem memberId={params.id} />;
}
```

**Implementation Steps:**
1. Add `calUsername` field to member profiles
2. Let members connect their own Cal.com accounts
3. Embed their calendars on your platform
4. They handle their own payments via Cal.com

**Time**: 3-5 days
**Cost**: $0 (members use their own Cal.com accounts)

### Path D: Custom Booking System
For complete control:

```typescript
// convex/schema.ts
export default defineSchema({
  memberAvailability: defineTable({
    memberId: v.string(),
    timezone: v.string(),
    schedule: v.object({
      monday: v.array(timeSlot),
      tuesday: v.array(timeSlot),
      // ... other days
    }),
    duration: v.number(), // default appointment length
    buffer: v.number(),   // time between appointments
    price: v.number(),
  }),
  
  bookings: defineTable({
    memberId: v.string(),
    customerId: v.string(),
    startTime: v.number(),
    endTime: v.number(),
    status: v.string(),
    paidAmount: v.number(),
    stripePaymentIntentId: v.string(),
  }),
});
```

**Time**: 1-2 weeks
**Cost**: $0 (beyond existing infrastructure)

### Path E: Self-Host Cal.com (Advanced)
For ultimate flexibility:

```bash
# Fork Cal.com
git clone https://github.com/calcom/cal.com.git
cd cal.com

# Modify for multi-tenancy
# - Add member_id to all queries
# - Integrate with your Clerk auth
# - Remove their billing system
```

**Time**: 2-4 weeks
**Cost**: $20-50/month hosting

## Recommended Approach for vybecoding

### Phase 5.1: Start Simple (Week 6, Day 1-2)
```typescript
// Add to member profiles
memberProfile: defineTable({
  // ... existing fields
  acceptsBookings: v.boolean(),
  bookingType: v.union(
    v.literal('none'),
    v.literal('cal.com'),
    v.literal('calendly'),
    v.literal('custom')
  ),
  calUsername: v.optional(v.string()),
  hourlyRate: v.optional(v.number()),
});
```

### Phase 5.2: Let Members Choose (Week 6, Day 3-4)
```typescript
// Member settings page
<BookingSettings>
  <RadioGroup value={bookingType} onChange={setBookingType}>
    <Radio value="none">No scheduling needed</Radio>
    <Radio value="cal.com">Use my Cal.com account (free)</Radio>
    <Radio value="custom">Use vybecoding booking (coming soon)</Radio>
  </RadioGroup>
  
  {bookingType === 'cal.com' && (
    <Input 
      label="Cal.com username"
      value={calUsername}
      placeholder="your-username"
    />
  )}
</BookingSettings>
```

### Phase 5.3: Display Booking Options (Week 6, Day 5)
```typescript
// Public member profile
{member.acceptsBookings && (
  <BookingSection>
    {member.bookingType === 'cal.com' && (
      <CalButton 
        calLink={member.calUsername}
        buttonText="Book a Session"
      />
    )}
    
    {member.bookingType === 'custom' && (
      <CustomBookingWidget memberId={member.id} />
    )}
  </BookingSection>
)}
```

## Migration Path

### Start (Week 6):
- Let members add their Cal.com/Calendly links
- Simple embed on their profiles

### Growth (Month 2-3):
- Build custom booking for premium members
- Add calendar sync
- Integrate with your Stripe

### Scale (Month 6+):
- Consider self-hosting Cal.com
- Build advanced scheduling features
- Team bookings, recurring appointments

## Cost Analysis by Scale

| Members | Best Option | Monthly Cost |
|---------|------------|--------------|
| 0-100 | Member's own Cal.com | $0 |
| 100-500 | Cal.com Atoms + Custom | $0 |
| 500-1000 | Custom system | $0 |
| 1000+ | Self-hosted Cal.com | $20-50 |

## Current Status (January 2025)

✅ Cal.com components installed
✅ Stripe integration ready
✅ Basic components created
⏳ Waiting for Phase 5 to implement
⏳ Need user feedback first

## Next Steps

1. **Complete Phase 3-4** (Core features & Communication)
2. **Survey early users** about booking needs
3. **Implement minimal version** based on feedback
4. **Iterate and expand** as needed

## Remember

- Don't implement booking until you confirm users need it
- Start with the simplest solution that works
- Let members use their existing tools when possible
- Build custom only when it becomes a differentiator