import { useEffect, useState } from "react";
import styles from "./BookingPage.module.scss";
import { Outlet, useSearchParams } from "react-router-dom";
import { Flight } from "../../models/models.types";
import { getFlights } from "../../services/flight";
import { Alert, CircularProgress } from "@mui/material";
import { Header, Item } from "../../components";
import { AxiosError } from "axios";

// const aiportListMocked = [
//   {
//     id: 0,
//     name: "aaaa",
//     country: "",
//     address: "",
//   },
//   {
//     id: 1,
//     name: "bbbb",
//     country: "",
//     address: "",
//   },
//   {
//     id: 2,
//     name: "cccc",
//     country: "",
//     address: "",
//   },
// ];

// const flightsListMocked: Flight[] = [
//   {
//     id: 0,
//     depart: {
//       id: 0,
//       name: "aaaa",
//       country: "",
//       address: "",
//     },
//     arrival: {
//       id: 1,
//       name: "bbbb",
//       country: "",
//       address: "",
//     },
//     price: 500,
//     stopOver: [
//       {
//         id: 2,
//         name: "cccc",
//         country: "",
//         address: "",
//       },
//     ],
//     provider: "",
//   },
// ];

const BookingPage = () => {
  const [flights, setFlights] = useState<Flight[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const departAirport = searchParams.get("departAirport");
    const arrivalAirport = searchParams.get("arrivalAirport");
    const nbPersons = searchParams.get("nbPersons");
    const departureDate = searchParams.get("departureDate");

    if (departAirport && arrivalAirport && departureDate && nbPersons)
      handleGetFlights(departAirport, arrivalAirport, nbPersons, departureDate);
  }, [searchParams]);

  const handleGetFlights = async (
    departureAirport: string,
    arrivalAirport: string,
    nbPassagers: string,
    departureDate: string
  ) => {
    setError("");
    try {
      const { data } = await getFlights(
        departureAirport,
        arrivalAirport,
        nbPassagers,
        departureDate
      );
      setFlights(data);
      // setFlights(flightsListMocked);
    } catch (e) {
      const error = e as AxiosError;
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste de vols</h1>

      {!flights && !error && <CircularProgress className={styles.progress} />}

      {flights && !error && (
        <>
          <h3>
            {searchParams.get("departAirport")} -{" "}
            {searchParams.get("arrivalAirport")}
          </h3>
          <div className={styles.gridContainer}>
            {flights?.map((flight: Flight) => (
              <Item
                key={flight.id}
                departAirport={searchParams.get("departAirport")}
                arrivalAirport={searchParams.get("arrivalAirport")}
                nbPassagers={Number(searchParams.get("nbPersons") || 0)}
                departureDate={searchParams.get("departureDate")}
                flight={flight}
              />
            ))}
          </div>
        </>
      )}

      {error && (
        <Alert severity="error">Un problème est surevenu avec l'API!</Alert>
      )}

      <Outlet />
    </div>
  );
};

export default BookingPage;
