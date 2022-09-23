import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Airport } from "../../models/models.types.d";
import styles from "./SelectInput.module.scss";

type Props = {
  label: string;
  listData: Airport[];
  value?: string;
  onChange?: (e: SelectChangeEvent<string>) => void;
  className?: string;
};

const SelectInput = ({
  label,
  listData,
  value,
  onChange: handleChange,
  className,
}: Props) => {
  return (
    <div className={styles.container}>
      <InputLabel id="departure">{label}</InputLabel>
      <Select
        className={`${styles.select} ${className}`}
        labelId="departure"
        value={value}
        label="Départ"
        onChange={handleChange}
      >
        {listData.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
