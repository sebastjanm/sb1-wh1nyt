import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Car } from "../types/Car";

interface CarCardProps {
  car: Car;
  onPress: () => void;
}

export function CarCard({ car, onPress }: CarCardProps) {
  return (
    <gridLayout 
      className="bg-white rounded-xl m-2 elevation-2"
      rows="auto, auto"
      columns="*"
      onTap={onPress}
    >
      <image
        row={0}
        src={car.image}
        className="w-full h-56 rounded-t-xl"
        stretch="aspectFill"
      />
      <stackLayout row={1} className="p-4">
        <flexboxLayout className="justify-between items-center">
          <stackLayout>
            <label className="text-xl font-bold text-gray-900">{car.make} {car.model}</label>
            <label className="text-gray-600 text-sm">{car.year}</label>
          </stackLayout>
          <stackLayout>
            <label className="text-2xl font-bold text-blue-600">€{car.price}</label>
            <label className="text-gray-500 text-sm text-right">per month</label>
          </stackLayout>
        </flexboxLayout>
        
        <flexboxLayout className="mt-3 flex-wrap">
          {car.features.slice(0, 3).map((feature, index) => (
            <label 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2 mb-2"
            >
              {feature}
            </label>
          ))}
        </flexboxLayout>

        <flexboxLayout className="mt-3 items-center">
          <label className={`text-sm ${car.available ? 'text-green-600' : 'text-orange-600'}`}>
            {car.available ? '● Available Now' : '○ Coming Soon'}
          </label>
        </flexboxLayout>
      </stackLayout>
    </gridLayout>
  );
}