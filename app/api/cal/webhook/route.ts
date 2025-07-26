import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { api } from '@/convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Verify Cal.com webhook signature
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = headers();
    const signature = headersList.get('cal-signature');
    
    // Verify webhook signature if secret is set
    if (process.env.CAL_WEBHOOK_SECRET) {
      if (!signature || !verifyWebhookSignature(body, signature, process.env.CAL_WEBHOOK_SECRET)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);

    // Handle different Cal.com webhook events
    switch (event.triggerEvent) {
      case 'BOOKING_CREATED':
        // Handle new booking
        await handleBookingCreated(event);
        break;
        
      case 'BOOKING_RESCHEDULED':
        // Handle rescheduled booking
        await handleBookingRescheduled(event);
        break;
        
      case 'BOOKING_CANCELLED':
        // Handle cancelled booking
        await handleBookingCancelled(event);
        break;
        
      case 'BOOKING_REQUESTED':
        // Handle booking request (for approval-based bookings)
        await handleBookingRequested(event);
        break;
        
      case 'BOOKING_PAYMENT_INITIATED':
        // Handle payment initiated
        await handlePaymentInitiated(event);
        break;
        
      default:
        console.log('Unhandled Cal.com event:', event.triggerEvent);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Cal.com webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleBookingCreated(event: any) {
  const { payload } = event;
  
  // Extract booking details
  const booking = {
    calBookingId: payload.uid,
    eventTypeId: payload.eventTypeId,
    title: payload.title,
    description: payload.description,
    startTime: payload.startTime,
    endTime: payload.endTime,
    attendees: payload.attendees,
    organizer: payload.organizer,
    location: payload.location,
    metadata: payload.metadata,
    paymentRequired: payload.price > 0,
    price: payload.price,
    currency: payload.currency,
    status: 'confirmed',
  };

  // Store booking in Convex
  // await convex.mutation(api.bookings.create, booking);

  console.log('Booking created:', booking);
}

async function handleBookingRescheduled(event: any) {
  const { payload } = event;
  console.log('Booking rescheduled:', payload.uid);
  
  // Update booking in Convex
  // await convex.mutation(api.bookings.update, {
  //   calBookingId: payload.uid,
  //   startTime: payload.startTime,
  //   endTime: payload.endTime,
  //   status: 'rescheduled',
  // });
}

async function handleBookingCancelled(event: any) {
  const { payload } = event;
  console.log('Booking cancelled:', payload.uid);
  
  // Update booking status in Convex
  // await convex.mutation(api.bookings.update, {
  //   calBookingId: payload.uid,
  //   status: 'cancelled',
  //   cancelledAt: new Date().toISOString(),
  // });
}

async function handleBookingRequested(event: any) {
  const { payload } = event;
  console.log('Booking requested (pending approval):', payload.uid);
  
  // Store pending booking
  // await convex.mutation(api.bookings.create, {
  //   ...booking,
  //   status: 'pending_approval',
  // });
}

async function handlePaymentInitiated(event: any) {
  const { payload } = event;
  console.log('Payment initiated for booking:', payload.uid);
  
  // Update booking with payment info
  // await convex.mutation(api.bookings.update, {
  //   calBookingId: payload.uid,
  //   paymentStatus: 'initiated',
  //   stripePaymentIntentId: payload.paymentIntentId,
  // });
}