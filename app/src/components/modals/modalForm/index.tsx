import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "../../form";
import { ModalForm } from "../../form/modalForm";
import { modalOperation } from "../../../utils";

export const Modal: view = ({
  title,
  fields,
  type,
  updateIsModalSavePressed = update.modal.isSavePressed,
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
}) => {
  const handleSave = () => {
    updateIsModalSavePressed.set(true);
    updateIsModalOpen.set(false);
    modalOperation("modalForm", "hide");
  };
  const handleClose = () => {
    updateModalFormData.set({});
    updateIsModalOpen.set(false);
    modalOperation("modalForm", "hide");
  };
  return (
    <>
      <div className="modal fade" id="modalForm">
        <div
          className="modal-dialog"
          style={{
            position: "absolute",
            top: "200px",
            right: "500px",
            width: "500px",
            zIndex: 10040,
            overflow: "auto",
            overflowY: "auto",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <ModalForm fields={fields} type={type} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
