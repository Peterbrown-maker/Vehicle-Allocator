export function calculateMinCars(P: number[], S: number[]): number {
  // Count total people
  let totalPeople = 0;
  
  for (let i = 0; i < P.length; i++) {
    totalPeople = totalPeople + P[i];
  }

  // Sort seats from biggest to smallest
  S.sort((a, b) => b - a);

  // Pick cars until we have enough seats
  let seatsAvailable = 0;
  let carsNeeded = 0;

  for (let i = 0; i < S.length; i++) {
    seatsAvailable = seatsAvailable + S[i];
    carsNeeded = carsNeeded + 1;

    if (seatsAvailable >= totalPeople) {
      return carsNeeded;
    }
  }

  return carsNeeded;
}