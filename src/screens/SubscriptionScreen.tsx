import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { DatePicker, alert } from "@nativescript/core";
import { ConfigOption } from "../types/Subscription";
import { OptionSelector } from "../components/OptionSelector";
import { calculatePrice } from "../utils/priceCalculator";
import { StripePayment } from "../components/StripePayment";

type SubscriptionScreenProps = {
  route: RouteProp<MainStackParamList, "Subscription">;
  navigation: FrameNavigationProp<MainStackParamList, "Subscription">;
};

const CONTRACT_TERMS: ConfigOption[] = [
  { value: 3, label: "3 months", multiplier: 1.2 },
  { value: 6, label: "6 months", multiplier: 1.1 },
  { value: 12, label: "12 months", multiplier: 1 },
  { value: 24, label: "24 months", multiplier: 0.95 },
  { value: 36, label: "36 months", multiplier: 0.9 },
];

const MILEAGE_OPTIONS: ConfigOption[] = [
  { value: 500, label: "500 km/month", multiplier: 1 },
  { value: 1000, label: "1,000 km/month", multiplier: 1.1 },
  { value: 1500, label: "1,500 km/month", multiplier: 1.2 },
  { value: 2000, label: "2,000 km/month", multiplier: 1.3 },
  { value: 2500, label: "2,500 km/month", multiplier: 1.4 },
  { value: 3000, label: "3,000 km/month", multiplier: 1.5 },
];

const DEPOSIT_OPTIONS: ConfigOption[] = [
  { value: 500, label: "€500", multiplier: 1.1 },
  { value: 1000, label: "€1,000", multiplier: 1.05 },
  { value: 2000, label: "€2,000", multiplier: 1 },
];

const INSURANCE_OPTIONS: ConfigOption[] = [
  { value: "free", label: "Free", multiplier: 1 },
  { value: "extra", label: "Extra", multiplier: 1.15 },
  { value: "carfree", label: "CarFree", multiplier: 1.25 },
];

export function SubscriptionScreen({ route, navigation }: SubscriptionScreenProps) {
  const { carId } = route.params;
  const [term, setTerm] = React.useState<number>(12);
  const [mileage, setMileage] = React.useState<number>(1000);
  const [deposit, setDeposit] = React.useState<number>(1000);
  const [insurance, setInsurance] = React.useState<string>("free");
  const [handoverDate, setHandoverDate] = React.useState<Date>(new Date());
  const [showPayment, setShowPayment] = React.useState<boolean>(false);
  const basePrice = 599;

  const totalPrice = React.useMemo(() => {
    return calculatePrice(basePrice, term, mileage, deposit, insurance);
  }, [term, mileage, deposit, insurance]);

  const handlePaymentSuccess = () => {
    alert({
      title: "Success!",
      message: "Your subscription has been confirmed. We'll contact you shortly with delivery details.",
      okButtonText: "OK"
    }).then(() => {
      navigation.navigate("Home");
    });
  };

  const handlePaymentError = (error: string) => {
    alert({
      title: "Payment Failed",
      message: error,
      okButtonText: "Try Again"
    });
  };

  return (
    <scrollView className="bg-white">
      <stackLayout className="p-4">
        <label className="text-2xl font-bold mb-6">Configure Your Subscription</label>

        {!showPayment ? (
          <>
            <OptionSelector
              title="Contract Term"
              options={CONTRACT_TERMS}
              selectedValue={term}
              onSelect={(value) => setTerm(value as number)}
            />

            <OptionSelector
              title="Monthly Mileage"
              options={MILEAGE_OPTIONS}
              selectedValue={mileage}
              onSelect={(value) => setMileage(value as number)}
            />

            <OptionSelector
              title="Down Payment"
              options={DEPOSIT_OPTIONS}
              selectedValue={deposit}
              onSelect={(value) => setDeposit(value as number)}
            />

            <OptionSelector
              title="Insurance Package"
              options={INSURANCE_OPTIONS}
              selectedValue={insurance}
              onSelect={(value) => setInsurance(value as string)}
            />

            <label className="text-lg font-semibold mt-4 mb-2">Desired Handover Date</label>
            <datePicker
              className="mb-4"
              date={handoverDate}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
              onDateChange={(args) => setHandoverDate(args.value)}
            />

            <stackLayout className="bg-gray-100 p-4 rounded-lg mt-4">
              <flexboxLayout className="justify-between">
                <label className="text-lg">Monthly Payment:</label>
                <label className="text-2xl font-bold text-blue-600">€{totalPrice}</label>
              </flexboxLayout>
              <label className="text-sm text-gray-600 mt-2">
                Includes insurance, maintenance, and delivery
              </label>
            </stackLayout>

            <button 
              className="bg-blue-600 text-white p-4 rounded-lg mt-6"
              onTap={() => setShowPayment(true)}
            >
              Continue to Payment
            </button>
          </>
        ) : (
          <>
            <stackLayout className="mb-6">
              <label className="text-xl font-semibold mb-2">Payment Details</label>
              <label className="text-gray-600">
                Your card will be charged €{totalPrice} monthly
              </label>
            </stackLayout>

            <StripePayment
              amount={totalPrice}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />

            <button 
              className="bg-gray-200 text-gray-700 p-4 rounded-lg mt-4"
              onTap={() => setShowPayment(false)}
            >
              Back to Configuration
            </button>
          </>
        )}
      </stackLayout>
    </scrollView>
  );
}