export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  features: string[];
  available: boolean;
}

export interface Subscription {
  id: string;
  carId: string;
  duration: number;
  monthlyPrice: number;
  mileage: number;
  availableFrom: string;
}