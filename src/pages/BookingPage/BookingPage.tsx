import { useEffect, useState } from "react";
import styles from "./BookingPage.module.scss";
import { Outlet, useSearchParams } from "react-router-dom";
import { Flight } from "../../models/models.types";
import { getFlights } from "../../services/flight";
import { Alert, CircularProgress } from "@mui/material";
import { Item } from "../../components";
import { AxiosError } from "axios";

const BookingPage = () => {
  const [flights, setFlights] = useState<Flight[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const departAirport = searchParams.get("departAirport");
    const arrivalAirport = searchParams.get("arrivalAirport");

    if (departAirport && arrivalAirport)
      handleGetFlights(departAirport, arrivalAirport, 5);
  }, [searchParams]);

  const handleGetFlights = async (
    departureAirport: string,
    arrivalAirport: string,
    nbPassagers: number
  ) => {
    setError("");
    try {
      const { data } = await getFlights(
        departureAirport,
        arrivalAirport,
        nbPassagers
      );
      setFlights(data);
      console.log("data", data);
    } catch (e) {
      const error = e as AxiosError;
      console.log("error", error);
      setError(error.message);
    }
  };

  console.log("flights", flights);
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
              <Item key={flight.id} flight={flight} />
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
