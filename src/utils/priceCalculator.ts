export function calculatePrice(
  basePrice: number,
  term: number,
  mileage: number,
  deposit: number,
  insurance: string
): number {
  // Get multipliers
  const termMultiplier = getTermMultiplier(term);
  const mileageMultiplier = getMileageMultiplier(mileage);
  const depositMultiplier = getDepositMultiplier(deposit);
  const insuranceMultiplier = getInsuranceMultiplier(insurance);

  // Calculate final price
  const price = basePrice * termMultiplier * mileageMultiplier * depositMultiplier * insuranceMultiplier;
  
  // Round to nearest euro
  return Math.round(price);
}

function getTermMultiplier(term: number): number {
  switch (term) {
    case 3: return 1.2;
    case 6: return 1.1;
    case 12: return 1;
    case 24: return 0.95;
    case 36: return 0.9;
    default: return 1;
  }
}

function getMileageMultiplier(mileage: number): number {
  switch (mileage) {
    case 500: return 1;
    case 1000: return 1.1;
    case 1500: return 1.2;
    case 2000: return 1.3;
    case 2500: return 1.4;
    case 3000: return 1.5;
    default: return 1;
  }
}

function getDepositMultiplier(deposit: number): number {
  switch (deposit) {
    case 500: return 1.1;
    case 1000: return 1.05;
    case 2000: return 1;
    default: return 1;
  }
}

function getInsuranceMultiplier(insurance: string): number {
  switch (insurance) {
    case "free": return 1;
    case "extra": return 1.15;
    case "carfree": return 1.25;
    default: return 1;
  }
}</content>