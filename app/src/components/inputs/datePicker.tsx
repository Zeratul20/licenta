import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "dayjs/locale/ro";
import "dayjs/locale/en";

import dayjs from "dayjs";

export const DatePick = ({
  value,
  handleChange,
  field,
  disabled = false,
}: any) => {
  const [inputValue, setInputValue] = useState(value);
  console.log(">>>Datepicker inputValue: ", inputValue);
  console.log(">>>Datepicker field: ", field);

  const overrideChange = (value: any) => {
    const newValue = value.format("DD.MM");
    setInputValue(newValue);
    handleChange(newValue, field);
  };

  const parsedInputValue = `${inputValue.slice(3, 5)}.${inputValue.slice(
    0,
    2
  )}`;

  const lng = "ro";
  const now = new Date();
  const minDate = dayjs(now).subtract(1, "month").startOf("month");
  return (
    <LocalizationProvider adapterLocale={lng} dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          maxDate={dayjs(now)}
          minDate={minDate}
          views={["day", "month"]}
          //   value={dayjs(parsedInputValue)}
          value={dayjs(parsedInputValue).year(dayjs(now).year())}
          onChange={overrideChange}
          format={"DD.MM"}
          label="Data"
          disabled={disabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
