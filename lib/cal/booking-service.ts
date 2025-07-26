import { loadStripe } from '@stripe/stripe-js';

// Cal.com booking service with Stripe integration
export interface BookingConfig {
  calLink: string;
  price?: number;
  currency?: string;
  requiresPayment?: boolean;
}

export class CalBookingService {
  private stripePromise: ReturnType<typeof loadStripe>;

  constructor() {
    // Initialize Stripe
    this.stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }

  // Generate booking URL with payment parameters
  generateBookingUrl(config: BookingConfig): string {
    const baseUrl = `https://cal.com/${config.calLink}`;
    const params = new URLSearchParams();

    if (config.requiresPayment && config.price) {
      params.append('price', config.price.toString());
      params.append('currency', config.currency || 'usd');
    }

    return params.toString() ? `${baseUrl}?${params}` : baseUrl;
  }

  // Handle post-booking payment confirmation
  async confirmPayment(paymentIntentId: string) {
    const stripe = await this.stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');

    // Confirm the payment on your backend
    const response = await fetch('/api/cal/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId }),
    });

    if (!response.ok) {
      throw new Error('Payment confirmation failed');
    }

    return response.json();
  }

  // Get booking details with payment status
  async getBookingWithPayment(bookingId: string) {
    const response = await fetch(`/api/cal/booking/${bookingId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }
    return response.json();
  }
}

// Export singleton instance
export const calBookingService = new CalBookingService();