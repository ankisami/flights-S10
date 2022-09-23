import styles from "./OptionsBooking.module.scss";
import ItemBooking from "./ItemBooking/ItemBooking";

type Props = {
  passagers: {
    adults: number;
    children: number;
    animals: number;
  };
  handlePassagers: (action: "add" | "remove") => void;
};

const OptionsBooking = ({ passagers, handlePassagers }: Props) => {
  return (
    <div className={styles.container}>
      <ItemBooking
        title="Adulte"
        name="adults"
        handlePassagers={handlePassagers}
        number={passagers.adults}
      />
      <ItemBooking
        title="Enfant (-10 ans)"
        name="children"
        handlePassagers={handlePassagers}
        number={passagers.children}
      />
      <ItemBooking
        title="Animaux"
        name="animals"
        handlePassagers={handlePassagers}
        number={passagers.animals}
      />
    </div>
  );
};

export default OptionsBooking;
