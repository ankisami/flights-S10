import styles from "./BookingModal.module.scss";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { OrderFlight, Passenger } from "../../models/models.types";
import { useEffect, useState } from "react";
import { Button, DatePicker } from "../../components";
import dayjs from "dayjs";
import { postFlight } from "../../services/flight";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  flightId: number;
  departAirport: string | null;
  arrivalAirport: string | null;
  nbPassagers: number | null;
  departureDate: string | null;
};

type FormInputs = Passenger[];

const BookingModal = ({
  isOpen,
  onClose,
  nbPassagers,
  flightId,
  arrivalAirport,
  departAirport,
  departureDate,
}: Props) => {
  const [flightOrder, setFlightOrder] = useState<OrderFlight>({
    date: departureDate,
    currencyId: 1,
    customer: {
      address: "",
      birthday: "",
      firstName: "",
      lastName: "",
      id: null,
    },
    flightId: null,
    persons: [],
  });

  const navigation = useNavigate();
  const initNbPassager = () => {
    let initPassengers: Passenger[] = [];
    for (let index = 0; index < (nbPassagers || 0); index++) {
      initPassengers.push({
        passenger: {
          address: "",
          birthday: dayjs().format("YYYY-MM-DD"),
          firstName: "",
          lastName: "",
          id: null,
        },
        optionsId: [],
      });
    }
    setFlightOrder((prev) => ({ ...prev, persons: initPassengers }));
  };

  useEffect(() => {
    initNbPassager();
  }, []);

  const { handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (_, e) => {
    e?.stopPropagation();
    e?.preventDefault();

    let data = flightOrder;
    data.customer = data.persons[0].passenger;
    data.flightId = flightId;

    try {
      postFlight(data);
      console.log("Donné envoyé");
      navigation("/resumeBooking");
    } catch (e) {
      console.error("Error Api", e);
    }
    console.log("OnSubmit", data);
  };

  const handleCloseModal = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    let modifyPerson: Passenger = { ...flightOrder.persons[id] };
    if (name === "firstName" || name === "lastName" || name === "address") {
      modifyPerson.passenger[name] = value;
    }

    let allPersons = [...flightOrder.persons];
    allPersons[id] = modifyPerson;

    setFlightOrder((prev) => ({ ...prev, persons: allPersons }));
  };

  const handleDate = (date: Date | null, id: number) => {
    let modifyPerson: Passenger = { ...flightOrder.persons[id] };
    modifyPerson.passenger["birthday"] = dayjs(date).format("YYYY-MM-DD");
    let allPersons = [...flightOrder.persons];
    allPersons[id] = modifyPerson;
    setFlightOrder((prev) => ({ ...prev, persons: allPersons }));
  };

  return (
    <>
      <Modal
        open={isOpen}
        className={styles.modalContainer}
        onClose={(e) => handleCloseModal(e)}
      >
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formHeader}>
            <h2 className={styles.title}>Passagers</h2>
          </div>

          {flightOrder.persons.map((item: Passenger, id) => (
            <div className={styles.passengerSection} key={id}>
              <p>Passager n°{id + 1}</p>
              <div className={styles.formContent}>
                <FormControl className={styles.selectType}>
                  <InputLabel id="passager-label-id">Passager</InputLabel>
                  <Select
                    defaultValue=""
                    labelId="passager-label-id"
                    label="Passager"
                  >
                    <MenuItem value={"man"}>Homme</MenuItem>
                    <MenuItem value={"woman"}>Femme</MenuItem>
                    <MenuItem value={"child"}>Enfant</MenuItem>
                    <MenuItem value={"pet"}>Animal</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  defaultValue=""
                  id="outlined-basic"
                  label="Prénom"
                  variant="outlined"
                  name="firstName"
                  onChange={(e) => handleChange(e, id)}
                />

                <TextField
                  defaultValue=""
                  name="lastName"
                  id="outlined-basic"
                  label="Nom"
                  variant="outlined"
                  onChange={(e) => handleChange(e, id)}
                />
              </div>

              <div className={styles.formContent}>
                <TextField
                  defaultValue=""
                  id="outlined-basic"
                  name="address"
                  label="Adresse"
                  variant="outlined"
                  onChange={(e) => handleChange(e, id)}
                />

                <DatePicker
                  label="Date de naissance"
                  value={dayjs(item.passenger.birthday).toDate() || Date()}
                  onChange={(e) => handleDate(e, id)}
                />
              </div>
            </div>
          ))}

          <Button
            title="Réserver"
            className={styles.btn}
            onSubmit={handleSubmit(onSubmit)}
          />
        </form>
      </Modal>
    </>
  );
};

export default BookingModal;
