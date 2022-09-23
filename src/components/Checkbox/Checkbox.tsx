import React from "react";
import { Checkbox as CheckboxLib, FormControlLabel } from "@mui/material";
import styles from "./Checkbox.module.scss";

type Props = {
  label?: string;
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

const Checkbox = ({ label, checked, onChange: handleChange }: Props) => {
  return (
    <FormControlLabel
      className={styles.container}
      label={label}
      control={
        <CheckboxLib id={label} checked={checked} onChange={handleChange} />
      }
    />
  );
};

export default Checkbox;
