import React, { useState } from "react";
import { Input } from "../inputs/input";
import "bootstrap/dist/css/bootstrap.min.css";

export const ModalForm: view = ({
  fields,
  updateModalFormData = update.modal.formData,
  modalFormData = observe.modal.formData,
}: any) => {
  console.log(">>>formData: ", modalFormData);
  const handleChange = (value: string, field: string) => {
    modalFormData[field] = value;
    updateModalFormData.set(modalFormData);
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
          val={modalFormData[field] || ""}
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
    </div>
  );
};
