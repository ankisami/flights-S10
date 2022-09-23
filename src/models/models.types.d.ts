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
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  birthday: Date;
};

export type OrderFlight = {
  date: stirng;
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

export type Customer = {
  id: number;
  name: string;
  Address: string;
};

export type Booking = {
  id: number;
  date: string;
  customer: Customer;
  flight: Flight;
};
