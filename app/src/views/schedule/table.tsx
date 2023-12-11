import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { AddIcon, EditIcon, TrashIcon } from "../../assets/icons";
import { Modal } from "../../components/modals/modalForm";

import { modalOperation } from "../../utils";

const bootstrap = require("bootstrap");

export const Table: view = ({
  classChosen = observe.schedule.class,
  updateIsModalOpen = update.modal.isOpen,
  updateModalFormData = update.modal.formData,
}) => {
  const startHour = 8;
  const endHour = 19;
  const days = ["Lu", "Ma", "Mi", "Jo", "Vi"];
  const subjects = [
    {
      day: "Lu",
      hour: "8",
      name: "Limba Romana",
    },
    {
      day: "Lu",
      hour: "9",
      name: "Limba Engleza",
    },
    {
      day: "Lu",
      hour: "10",
      name: "Limba Romana",
    },
    {
      day: "Lu",
      hour: "11",
      name: "Limba Engleza",
    },
    {
      day: "Lu",
      hour: "12",
      name: "Limba Romana",
    },
    {
      day: "Lu",
      hour: "13",
      name: "Limba Engleza",
    },
    {
      day: "Lu",
      hour: "14",
      name: "Limba Romana",
    },
    {
      day: "Lu",
      hour: "15",
      name: "Limba Engleza",
    },
    {
      day: "Lu",
      hour: "16",
      name: "Limba Romana",
    },
    {
      day: "Lu",
      hour: "17",
      name: "Limba Engleza",
    },
    {
      day: "Lu",
      hour: "18",
      name: "Limba Romana",
    },
    {
      day: "Lu",
      hour: "19",
      name: "Limba Engleza",
    },
    {
      day: "Ma",
      hour: "8",
      name: "Limba Romana",
    },
    {
      day: "Ma",
      hour: "9",
      name: "Matematica",
    },
    {
      day: "Ma",
      hour: "10",
      name: "Limba Romana",
    },
    {
      day: "Ma",
      hour: "11",
      name: "Limba Engleza",
    },
    {
      day: "Ma",
      hour: "12",
      name: "Istorie",
    },
    {
      day: "Ma",
      hour: "13",
      name: "Geografie",
    },
    {
      day: "Ma",
      hour: "14",
      name: "Limba Romana",
    },
    {
      day: "Ma",
      hour: "15",
      name: "Limba Engleza",
    },
    {
      day: "Ma",
      hour: "16",
      name: "Limba Romana",
    },
  ]; // temporary
  const teachers = [
    {
      subject: "Limba Romana",
      name: "Popescu I.",
    },
    {
      subject: "Limba Engleza",
      name: "Georgescu M.",
    },
    {
      subject: "Matematica",
      name: "Mihaescu G.",
    },
    {
      subject: "Istorie",
      name: "Porumbescu S.",
    },
    {
      subject: "Geografie",
      name: "Stanciu C.",
    },
  ];
  const handleEdit_AddButton = (initalValues: any) => {
    updateIsModalOpen.set(true);
    updateModalFormData.set(initalValues);
    modalOperation("modalForm", "show");
  };

  return (
    <div className="p-5">
      <table className="table table-bordered" style={{ border: "1px" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            {Array.from(
              { length: endHour - startHour + 1 },
              (_, i) => i + startHour
            ).map((hour) => {
              return (
                <th className="text-center" scope="col">
                  {hour}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {days.map((day: string) => {
            return (
              <tr>
                <th scope="row">{day}</th>
                {Array.from(
                  { length: endHour - startHour + 1 },
                  (_, i) => i + startHour
                ).map((hour) => {
                  //   return <td className="text-center">Limba Romana</td>;
                  const subjectFound = subjects.find((subject: any) => {
                    return (
                      subject.day === day && subject.hour === hour.toString()
                    );
                  });
                  console.log(">>>subjectFound: ", subjectFound);

                  const fields = [
                    {
                      field: "subject",
                      label: "Materie",
                      className: "form-floating mb-3 col-md-12",
                      placeholder: "Limba Romana",
                      type: "text",
                    },
                    {
                      field: "hour",
                      label: "Ora",
                      className: "form-floating mb-3 col-md-12",
                      placeholder: "8",
                      type: "number",
                    },
                    {
                      field: "day",
                      label: "Zi",
                      className: "form-floating mb-3 col-md-12",
                      placeholder: "Lu",
                      type: "text",
                    },
                  ];

                  const initialValuesAdd = {
                    subject: "",
                    hour,
                    day,
                  };

                  if (subjectFound) {
                    const teacher = teachers.find((teacher: any) => {
                      return teacher.subject === subjectFound.name;
                    });

                    const initialValuesEdit = {
                      subject: subjectFound.name,
                      hour,
                      day,
                    };

                    return (
                      <td>
                        <div className="text-center d-flex justify-content-center">
                          {teacher?.name}
                        </div>
                        <div className="text-center d-flex justify-content-center">
                          {subjectFound.name}
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-lg btn-outline-primary py-0"
                            style={{ fontSize: "1rem", border: "none" }}
                            onClick={() =>
                              handleEdit_AddButton(initialValuesEdit)
                            }
                          >
                            <EditIcon />
                          </button>
                          <Modal fields={fields} />

                          <button
                            className="btn btn-lg btn-outline-danger py-0"
                            style={{ fontSize: "1rem", border: "none" }}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td className="text-center align-middle">
                      <button
                        className="btn btn-outline-success py-0"
                        style={{ fontSize: "10px", border: "none" }}
                        onClick={() => handleEdit_AddButton(initialValuesAdd)}
                      >
                        <AddIcon size="1.5rem" />
                      </button>
                      <Modal fields={fields} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
