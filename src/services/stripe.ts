import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

export interface PaymentIntent {
  clientSecret: string;
  id: string;
}

export async function createPaymentIntent(amount: number): Promise<PaymentIntent> {
  try {
    const response = await fetch('YOUR_BACKEND_URL/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Payment failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Failed to create payment intent');
  }
}

export async function confirmPayment(
  clientSecret: string,
  paymentMethod: any
): Promise<any> {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod,
  });

  if (error) {
    throw new Error(error.message);
  }

  return paymentIntent;
}