import axios from "axios";
import { Airport, Flight } from "../models/models.types";

const API_URL = "http://10.8.111.81:8080";

export const getAirports = async () => {
  return await axios.get<Airport[]>(`${API_URL}/flight/airports`);
};

export const getFlights = async (
  departureAirport: string,
  arrivalAirport: string,
  nbPersons: number
) => {
  return await axios.get<Flight[]>(
    `${API_URL}/flight?departAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&nbPersons=${nbPersons}`
  );
};
