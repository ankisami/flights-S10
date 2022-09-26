import { Card } from "@mui/material";
import styles from "./Item.module.scss";
import { Flight, OrderFlight } from "../../models/models.types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";

type Props = {
  flight: Flight;
  departAirport: string | null;
  arrivalAirport: string | null;
  nbPassagers: number | null;
  departureDate: string | null;
};

const Item = ({
  flight,
  nbPassagers,
  arrivalAirport,
  departAirport,
  departureDate,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className={`${styles.container} `} onClick={() => setIsOpen(true)}>
      <div className={styles.headerLeft}>
        <div>
          <span className={styles.title}>Départ: </span>
          <span> {flight.depart.name}</span>
        </div>

        <div>
          <span className={styles.title}>Arrivée: </span>
          <span> {flight.arrival.name}</span>
        </div>

        <div>
          <span className={styles.title}>Prix:</span>
          <span> {flight.price} €</span>
        </div>

        <div>
          <span className={styles.title}>Companie:</span>
          <span> {flight.provider || "Non Renseigné"}</span>
        </div>
      </div>

      {flight.stopOver.length > 0 && (
        <div className={styles.headerRight}>
          <div className={styles.stopOvers}>
            {flight.stopOver.map((stopOver, id) => (
              <div key={stopOver.id}>
                <span className={styles.title}>Escale n°{id + 1}: </span>
                <span> {stopOver.name}</span>
              </div>
            ))}
          </div>
          <h6 className={styles.warningMessage}>
            Attention escale présent sur ce vol
          </h6>
        </div>
      )}

      <ArrowForwardIosIcon className={`${isOpen && styles.reverseIcon}`} />

      <BookingModal
        isOpen={isOpen}
        flightId={flight.id}
        arrivalAirport={arrivalAirport}
        departAirport={departAirport}
        departureDate={departureDate}
        nbPassagers={nbPassagers}
        onClose={() => setIsOpen(false)}
      />
    </Card>
  );
};

export default Item;
