import * as React from "react";
import { TextField, StackLayout, FlexboxLayout, ActivityIndicator } from "@nativescript/core";
import { createPaymentIntent, confirmPayment } from "../services/stripe";

interface StripePaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function StripePayment({ amount, onSuccess, onError }: StripePaymentProps) {
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Validate input
      if (!cardNumber || !expiry || !cvc) {
        throw new Error('Please fill in all payment details');
      }

      if (cardNumber.length !== 16) {
        throw new Error('Invalid card number');
      }

      const [expiryMonth, expiryYear] = expiry.split('/');
      if (!expiryMonth || !expiryYear || expiryMonth.length !== 2 || expiryYear.length !== 2) {
        throw new Error('Invalid expiry date');
      }

      if (cvc.length !== 3) {
        throw new Error('Invalid CVC');
      }

      // Create payment method
      const paymentMethod = {
        card: {
          number: cardNumber,
          exp_month: parseInt(expiryMonth, 10),
          exp_year: parseInt(`20${expiryYear}`, 10),
          cvc: cvc,
        },
      };

      // Create payment intent
      const { clientSecret } = await createPaymentIntent(amount * 100); // Convert to cents

      // Confirm payment
      await confirmPayment(clientSecret, paymentMethod);

      onSuccess();
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <stackLayout className="mt-4">
      <label className="text-sm text-gray-600 mb-1">Card Number</label>
      <textField
        className="input p-4 border rounded-lg mb-4"
        hint="4242 4242 4242 4242"
        keyboardType="number"
        maxLength={16}
        text={cardNumber}
        editable={!loading}
        onTextChange={(args) => setCardNumber(args.value)}
      />

      <flexboxLayout className="justify-between mb-4">
        <stackLayout className="w-1/2 mr-2">
          <label className="text-sm text-gray-600 mb-1">Expiry Date</label>
          <textField
            className="input p-4 border rounded-lg"
            hint="MM/YY"
            keyboardType="number"
            maxLength={5}
            text={expiry}
            editable={!loading}
            onTextChange={(args) => setExpiry(formatExpiry(args.value))}
          />
        </stackLayout>

        <stackLayout className="w-1/2 ml-2">
          <label className="text-sm text-gray-600 mb-1">CVC</label>
          <textField
            className="input p-4 border rounded-lg"
            hint="123"
            keyboardType="number"
            maxLength={3}
            secure={true}
            text={cvc}
            editable={!loading}
            onTextChange={(args) => setCvc(args.value)}
          />
        </stackLayout>
      </flexboxLayout>

      <button
        className={`p-4 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
        onTap={handlePayment}
        isEnabled={!loading}
      >
        {loading ? (
          <flexboxLayout className="justify-center items-center">
            <activityIndicator busy={true} color="white" className="mr-2" />
            <label className="text-white">Processing...</label>
          </flexboxLayout>
        ) : (
          `Pay €${amount}`
        )}
      </button>

      <stackLayout className="mt-4 p-4 bg-gray-100 rounded-lg">
        <label className="text-xs text-gray-500 text-center">
          🔒 Payments are securely processed by Stripe.
        </label>
        <label className="text-xs text-gray-500 text-center mt-1">
          Your card details are encrypted and never stored on our servers.
        </label>
      </stackLayout>
    </stackLayout>
  );
}