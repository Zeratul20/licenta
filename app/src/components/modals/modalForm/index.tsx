import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "../../form";
import { ModalForm } from "../../form/modalForm";

export const Modal: view = ({
  title,
  fields,
  updateIsModalOpen = update.modal.isOpen,
}) => {
  const handleClose = () => updateIsModalOpen.set(false);
  return (
    <>
      <div className="modal fade" id="modalForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ModalForm fields={fields} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
