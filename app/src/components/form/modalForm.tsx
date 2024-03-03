import React, { useState } from "react";
import { Input } from "../inputs/input";
import "bootstrap/dist/css/bootstrap.min.css";

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
        } = field;
        console.log(">>>field: ", field);
        if (hidden) return null;
        return input(fieldName, label, className, placeholder, type, disabled);
      })}
    </div>
  );
};
