export const departureData = [
  "destionation1",
  "destionation2",
  "destionation3",
];
export const arrivalData = ["arrival1", "arrival2", "arrival3"];

export const getFlightsMocked = [
  {
    code: "AF345",
    departure: "DTW",
    arrival: "JFK",
    base_price: 300,
    plane: { name: "AIRBUS350", total_seats: 200 },
  },
  {
    code: "AF346",
    departure: "DTW",
    arrival: "CDG",
    base_price: 700,
    plane: { name: "AIRBUS750", total_seats: 700 },
  },
  {
    code: "AF347",
    departure: "CDG",
    arrival: "JFK",
    base_price: 1000,
    plane: { name: "AIRBUS950", total_seats: 1000 },
  },
  {
    code: "AF348",
    departure: "CDG",
    arrival: "LAD",
    base_price: 300,
    plane: { name: "AIRBUS450", total_seats: 300 },
  },
];
