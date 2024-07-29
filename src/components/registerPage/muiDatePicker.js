import React from "react";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export default function MuiDatePicker({
  registerForm,
  birthDate,
  setRegisterForm,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        required
        value={birthDate}
        onChange={(date) =>{
          setRegisterForm({ ...registerForm, birthDate: date })
        }}
        renderInput={(props)=> (<TextField {...props}/>)}
      />
    </LocalizationProvider>
  );
}
