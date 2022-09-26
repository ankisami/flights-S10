import style from "./DatePicker.module.scss";
import {
  DatePicker as DatePickerLib,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  label: string;
  value: Date;
  onChange: (date: Date | null) => void;
};

const DatePicker = ({ label, value, onChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerLib
        label={label}
        value={value}
        onChange={(date) => onChange(date)}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
