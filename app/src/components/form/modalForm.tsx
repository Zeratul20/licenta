import React, { useState } from "react";
import { Input } from "../inputs/input";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePick } from "../inputs/datePicker";

export const ModalForm: view = ({
  fields,
  type,
  updateModalFormData = update.modal.formData,
  modalFormData = observe.modal.formData,
  isModalOpen = observe.modal.isOpen,
}: any) => {
  if (!isModalOpen) return null;
  console.log(">>>formData: ", modalFormData);
  const handleChange = (value: string, field: string) => {
    console.log(">>>modalForm Field: ", field);
    console.log(">>>modalForm Value: ", value);
    modalFormData[field] = value;
    modalFormData.type = type;
    updateModalFormData.set(modalFormData);
  };

  const input = (
    field: string,
    label: string,
    className: string = "",
    placeholder: string = "",
    type = "text",
    disabled = false
  ) => {
    console.log(">>>Form field: ", field);
    console.log(">>>Modal form data field", modalFormData[field]);
    return (
      <div className={className}>
        <Input
          field={field}
          className="form-control"
          value={modalFormData[field] || ""}
          type={type}
          placeholder={placeholder}
          handleChange={handleChange}
          disabled={disabled}
        />
        <label className="form-label ps-4">{label}</label>
      </div>
    );
  };

  const datePicker = (
    field: string,
    className: string = "",
    disabled = false
  ) => {
    return (
      <div className={className}>
        <DatePick
          field={field}
          value={modalFormData[field] || ""}
          handleChange={handleChange}
          disabled={disabled}
        />
      </div>
    );
  };

  return (
    <div className="row">
      {fields.map((field: any) => {
        const {
          field: fieldName,
          label,
          className,
          placeholder,
          type,
          disabled,
          hidden,
          isDate,
        } = field;
        console.log(">>>field: ", field);
        if (hidden) return null;
        if (isDate) return datePicker(fieldName, className, disabled);
        return input(fieldName, label, className, placeholder, type, disabled);
      })}
    </div>
  );
};
