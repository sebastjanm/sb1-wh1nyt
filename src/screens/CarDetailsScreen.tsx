import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { ObservableArray } from "@nativescript/core";

type CarDetailsScreenProps = {
  route: RouteProp<MainStackParamList, "CarDetails">;
  navigation: FrameNavigationProp<MainStackParamList, "CarDetails">;
};

export function CarDetailsScreen({ route, navigation }: CarDetailsScreenProps) {
  const { carId } = route.params;

  return (
    <scrollView className="bg-white">
      <stackLayout className="p-4">
        <image
          src="https://example.com/car-large.jpg"
          className="w-full h-64 rounded-lg"
          stretch="aspectFill"
        />
        
        <stackLayout className="mt-4">
          <label className="text-2xl font-bold">Tesla Model 3</label>
          <label className="text-xl text-blue-600">€599/month</label>
        </stackLayout>

        <stackLayout className="mt-4">
          <label className="text-lg font-semibold">Features</label>
          <stackLayout className="ml-4">
            <label>• Autopilot</label>
            <label>• Long Range Battery</label>
            <label>• Premium Interior</label>
          </stackLayout>
        </stackLayout>

        <button 
          className="bg-blue-600 text-white p-4 rounded-lg mt-4"
          onTap={() => navigation.navigate("Subscription", { carId })}
        >
          Subscribe Now
        </button>
      </stackLayout>
    </scrollView>
  );
}