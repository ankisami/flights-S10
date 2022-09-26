export type Airport = {
  id: number;
  name: string;
  country: string;
  address: string;
};

export type Flight = {
  id: number;
  depart: Airport;
  arrival: Airport;
  price: number;
  stopOver: Airport[];
  provider: string;
};

export type Customer = {
  id: number | null;
  firstName: string;
  lastName: string;
  address: string;
  birthday: string;
};

export type OrderFlight = {
  date: stirng;
  customer: Customer;
  flightId: number | null;
  persons: Passenger[];
  currencyId: number;
};

export type Passenger = {
  passenger: Customer;
  optionsId: number[];
};

// export type Flight = {
//   code: string;
//   departure: stirng[];
//   arrival: string[];
//   base_price: number;
//   plane: Plane;
// };

export type Plane = {
  name: string;
  total_seats: number;
};

export type Tickets = {
  code?: string;
  flight: flight;
  date: string;
  payed_price: number;
  customer_name: string;
  customer_nationality: string;
  options?: FlightOptions[];
  booking_source: string;
};

export enum OptionType {
  "BonusLuggage",
  "FirstClass",
  "ChampagneOnBoard",
  "LoungeAccess",
}

export type Booking = {
  id: number;
  date: string;
  customer: Customer;
  flight: Flight;
};
