import * as React from "react";
import { ObservableArray } from "@nativescript/core";
import { Car } from "../types/Car";
import { CarCard } from "../components/CarCard";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

const MOCK_CARS: Car[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    price: 599,
    image: "https://tesla-cdn.thron.com/delivery/public/image/tesla/5a7b3001-249f-4065-a330-4ea6a17ccf7b/bvlatuR/std/2560x1708/Model-3-Main-Hero-Desktop-LHD",
    features: ["Autopilot", "Long Range", "Premium Interior"],
    available: true
  },
  {
    id: "2",
    make: "BMW",
    model: "iX3",
    year: 2024,
    price: 799,
    image: "https://media.ed.edmunds-media.com/bmw/ix/2024/oem/2024_bmw_ix_4dr-suv_xdrive50_fq_oem_1_1600.jpg",
    features: ["Electric", "Sport Package", "Premium Sound"],
    available: true
  },
  {
    id: "3",
    make: "Volkswagen",
    model: "ID.4",
    year: 2024,
    price: 549,
    image: "https://media.ed.edmunds-media.com/volkswagen/id4/2024/oem/2024_volkswagen_id4_4dr-suv_pro-s_fq_oem_1_1600.jpg",
    features: ["Electric", "Travel Assist", "Panoramic Roof"],
    available: true
  },
  {
    id: "4",
    make: "Audi",
    model: "Q4 e-tron",
    year: 2024,
    price: 699,
    image: "https://media.ed.edmunds-media.com/audi/q4-e-tron/2024/oem/2024_audi_q4-e-tron_4dr-suv_prestige_fq_oem_1_1600.jpg",
    features: ["Quattro", "Matrix LED", "Virtual Cockpit"],
    available: true
  },
  {
    id: "5",
    make: "Mercedes-Benz",
    model: "EQA",
    year: 2024,
    price: 649,
    image: "https://media.ed.edmunds-media.com/mercedes-benz/eqa/2024/oem/2024_mercedes-benz_eqa_4dr-suv_300-4matic_fq_oem_1_1600.jpg",
    features: ["MBUX", "Electric", "Premium Package"],
    available: true
  }
];

type HomeScreenProps = {
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedFilter, setSelectedFilter] = React.useState<'all' | 'electric' | 'suv'>('all');
  const cars = new ObservableArray<Car>(MOCK_CARS);

  React.useEffect(() => {
    console.log("HomeScreen mounted");
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <gridLayout className="bg-gray-100">
        <activityIndicator busy={true} className="text-blue-600" />
      </gridLayout>
    );
  }

  return (
    <gridLayout rows="auto, auto, *" className="bg-gray-100">
      {/* Hero Section */}
      <stackLayout row={0} className="p-6 bg-blue-600">
        <label className="text-3xl font-bold text-white">Find Your Perfect Car</label>
        <label className="text-lg text-white opacity-90 mt-2">All-inclusive monthly subscription</label>
        <label className="text-white mt-1">Insurance • Maintenance • Delivery included</label>
      </stackLayout>
      
      {/* Filters */}
      <scrollView row={1} orientation="horizontal" className="bg-white border-b border-gray-200">
        <flexboxLayout className="p-4">
          {['all', 'electric', 'suv'].map((filter) => (
            <button
              key={filter}
              className={`mr-4 px-6 py-2 rounded-full ${
                selectedFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onTap={() => setSelectedFilter(filter as any)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </flexboxLayout>
      </scrollView>

      {/* Car List */}
      <scrollView row={2}>
        <stackLayout className="p-4">
          {cars.map((car) => (
            <CarCard 
              key={car.id}
              car={car}
              onPress={() => {
                console.log("Navigating to car details:", car.id);
                navigation.navigate("CarDetails", { carId: car.id });
              }}
            />
          ))}
        </stackLayout>
      </scrollView>
    </gridLayout>
  );
}