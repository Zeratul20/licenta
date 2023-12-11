import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Input = ({ val, handleChange, field, ...rest }: any) => {
  const [inputValue, setInputValue] = useState(val);
  // const [count, setCount] = useState(0);
  // if (inputValue.length === 0 && count == 0) {
  //   setCount(1);
  //   console.log(">>> debug val: ", val);
  //   setInputValue(val);
  // }
  // console.log(">>> debug value: ", inputValue);
  // console.log(">>> debug field: ", field);

  const overrideChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    console.log(">>>Input value, field: ", newValue, field);
    handleChange(newValue, field);
  };

  return <input value={inputValue} onChange={overrideChange} {...rest} />;
};
