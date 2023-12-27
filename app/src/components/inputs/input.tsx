import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Input = ({ value, handleChange, field, ...rest }: any) => {
  const [inputValue, setInputValue] = useState(value);
  console.log(">>> value in input: ", value);

  const overrideChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    console.log(">>>Input value, field: ", newValue, field);
    handleChange(newValue, field);
  };

  return <input value={inputValue} onChange={overrideChange} {...rest} />;
};
