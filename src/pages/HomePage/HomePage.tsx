import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { SelectInput, Button, DatePicker } from "../../components";
import { Airport } from "../../models/models.types.d";
import { useNavigate } from "react-router-dom";
import { getAirports } from "../../services/flight";
import ItemBooking from "../../components/OptionsBooking/ItemBooking/ItemBooking";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";

type FormInputs = {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: Date;
  passagers: number;
};

const aiportListMocked = [
  {
    id: 0,
    name: "aaaa",
    country: "",
    address: "",
  },
  {
    id: 1,
    name: "bbbb",
    country: "",
    address: "",
  },
  {
    id: 2,
    name: "cccc",
    country: "",
    address: "",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState<Airport[]>(aiportListMocked);

  const defaultValues = {
    departureAirport: "",
    arrivalAirport: "",
    departureDate: new Date(),
    passagers: 1,
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormInputs>({ defaultValues: defaultValues });

  const handleGetAirports = async () => {
    try {
      const { data } = await getAirports();
      setAirports(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    handleGetAirports();
  }, []);

  const onSubmit = (formData: FormInputs) => {
    const { departureAirport, arrivalAirport, passagers, departureDate } =
      formData;
    if (!isValid) return;
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

  console.log("watch()", watch());

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.selectInputContainer}>
          <Controller
            control={control}
            name="departureAirport"
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

        {/* 
        <Checkbox
          label="Aller simple"
          checked={booking.simpleFlight}
          onChange={(e, checked) =>
            setBooking((prev) => ({ ...prev, simpleFlight: checked }))
          }
        /> */}

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
          {/* 
          {!booking.simpleFlight && (
            <DatePicker
              label="Retour"
              date={booking.arrivalDate}
              onChange={(value) => {
                if (value) setBooking((prev) => ({ ...prev, date: value }));
              }}
            />
          )} */}
        </div>

        {/* <OptionsBooking
          passagers={booking.passagers}
          handlePassagers={handlePassagers}
        /> */}

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

        <Button title="Rechercher" onSubmit={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default HomePage;
