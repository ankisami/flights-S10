import styles from "./BookingModal.module.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormInputs = {
  firstName: string;
  lastName: string;
  passager: "man" | "woman" | "child" | "pet";
};

const BookingModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <Modal open={isOpen} className={styles.modalContainer} onClose={onClose}>
      <form className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Passagers</h2>
        </div>

        <div className={styles.formContent}>
          <FormControl className={styles.selectType}>
            <InputLabel id="passager-label-id">Passager</InputLabel>
            <Select
              labelId="passager-label-id"
              label="Passager"
              {...register("passager")}
            >
              <MenuItem value={"man"}>Homme</MenuItem>
              <MenuItem value={"woman"}>Femme</MenuItem>
              <MenuItem value={"child"}>Enfant</MenuItem>
              <MenuItem value={"pet"}>Animal</MenuItem>
            </Select>
          </FormControl>

          <TextField
            {...register("firstName")}
            id="outlined-basic"
            label="Prénom"
            variant="outlined"
          />
          <TextField
            {...register("lastName")}
            id="outlined-basic"
            label="Nom"
            variant="outlined"
          />
        </div>
      </form>
    </Modal>
  );
};

export default BookingModal;
