import React, { useState } from "react";
import { Input } from "../inputs/input";
import "bootstrap/dist/css/bootstrap.min.css";

export const Form = ({
  fields,
  setData,
  buttonMessage,
  buttonWidth,
  setIsButtonPressed,
  initalValues = {},
}: any) => {
  const [formData, setFormData]: any = useState(initalValues);
  console.log(">>>formData: ", formData);
  const handleChange = (value: string, field: string) => {
    formData[field] = value;
    setFormData(formData);
  };
  const handleClick = () => {
    console.log(">>>Sign Up data: ", formData);
    setIsButtonPressed(true);
    setData(formData);
  };

  const input = (
    field: string,
    label: string,
    className: string = "",
    placeholder: string = "",
    type = "text"
  ) => {
    console.log(">>>Form field: ", field);
    return (
      <div className={className}>
        <Input
          field={field}
          className="form-control"
          value={formData[field] || ""}
          type={type}
          placeholder={placeholder}
          handleChange={handleChange}
        />
        <label className="form-label ps-4">{label}</label>
      </div>
    );
  };
  return (
    <div className="row">
      {fields.map((field: any) => {
        const { field: fieldName, label, className, placeholder, type } = field;
        console.log(">>>field: ", field);
        return input(fieldName, label, className, placeholder, type);
      })}
      <div className="col-12 pt-4">
        <button
          onClick={handleClick}
          className="btn btn-outline-primary"
          style={{ width: buttonWidth }}
        >
          {buttonMessage}
        </button>
      </div>
    </div>
  );
};
