import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { SelectInput, Button, DatePicker } from "../../components";
import { Airport } from "../../models/models.types.d";
import { useNavigate } from "react-router-dom";
import { getAirports } from "../../services/flight";
import ItemBooking from "../../components/OptionsBooking/ItemBooking/ItemBooking";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert } from "@mui/material";

type FormInputs = {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: Date;
  passagers: number;
};

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

const HomePage = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState<Airport[]>();
  const [alert, setAlert] = useState({ isOpen: false, message: "" });

  const defaultValues = {
    departureAirport: "",
    arrivalAirport: "",
    departureDate: new Date(),
    passagers: 1,
  };
  const schema = yup
    .object({
      departureAirport: yup.string().required("Veuillez choisir un aéroport"),
      arrivalAirport: yup.string().required("Veuillez choisir un aéroport"),
    })
    .required();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const handleGetAirports = async () => {
    try {
      const data = await getAirports();
      setAirports(data.data);
    } catch (error) {
      setAlert({
        isOpen: true,
        message: "Impossible de récupérer la liste des airoports",
      });
      console.error("error for get Airports list", error);
    }
  };

  useEffect(() => {
    handleGetAirports();
  }, []);

  const onSubmit = (formData: FormInputs) => {
    const { departureAirport, arrivalAirport, passagers, departureDate } =
      formData;
    const departureDateFormated = dayjs(departureDate).format("YYYY-MM-DD");
    navigate(
      `/booking?departAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&nbPersons=${passagers}&departureDate=${departureDateFormated}`
    );
  };

  const handlePassagers = (action: "add" | "remove") => {
    let nbPassagers = watch("passagers");
    if (action === "remove" && nbPassagers === 1) return;

    action === "add"
      ? setValue("passagers", nbPassagers + 1)
      : setValue("passagers", nbPassagers - 1);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.formLabel}>Acheter un billet</h4>
        <div className={styles.selectInputContainer}>
          <Controller
            control={control}
            name="departureAirport"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <SelectInput
                className={styles.selectInput}
                label="Départ"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                listData={airports || []}
              />
            )}
          />

          <Controller
            name="arrivalAirport"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <SelectInput
                className={styles.selectInput}
                label="Arrivé"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                listData={
                  airports?.filter((item) => {
                    if (item.name === watch("departureAirport")) return false;
                    return item;
                  }) || []
                }
              />
            )}
          />
        </div>

        <div className={styles.datePickerSection}>
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Départ"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <Controller
            name="passagers"
            control={control}
            render={({ field }) => (
              <ItemBooking
                title="Passagers"
                name="adults"
                handlePassagers={(e) => handlePassagers(e)}
                number={field.value}
              />
            )}
          />
        </div>

        <Button
          title="Rechercher"
          className={styles.formBtn}
          disabled={!isValid}
        />
      </form>

      {alert.isOpen && <Alert severity="error">{alert.message}</Alert>}
    </div>
  );
};

export default HomePage;
