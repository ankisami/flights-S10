import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import styles from "./ItemBooking.module.scss";

type ItemProps = {
  title: string;
  name: "adults" | "children" | "animals";
  number: number;
  handlePassagers: (action: "add" | "remove") => void;
};
const Item = ({ title, name, number, handlePassagers }: ItemProps) => {
  return (
    <div className={styles.container}>
      <h6 className={styles.title}>{title}</h6>

      <div className={styles.controlInput}>
        <div>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePassagers("remove");
            }}
          >
            <input hidden type="button" />
            <RemoveCircleOutlineIcon className={styles.icon} />
          </IconButton>
        </div>

        <div className={styles.number}>{number}</div>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePassagers("add");
          }}
        >
          <input hidden type="button" />
          <ControlPointIcon className={styles.icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default Item;
