import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { AddIcon, EditIcon, TrashIcon } from "../../assets/icons";
import { Modal } from "../../components/modals/modalForm";

import { getSubjectData, getTeacherData, getUserData, modalOperation } from "../../utils";

import axios from "axios";
import { Loader } from "../../components/helpers/loader";
import { toast } from "react-toastify";

const bootstrap = require("bootstrap");

export const Table: view = ({
  scheduleClass = observe.schedule.class,
  schedule = observe.schedule.schedule,
  updateSchedule = update.schedule.schedule,
  updateModalFormData = update.modal.formData,
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  getModalFormData = get.modal.formData,
  getTeachersState = get.teachers,
  getSubjectsState = get.subjects,
  getUsers = get.users,
  getUser = get.user,
  updateIsModalOpen = update.modal.isOpen,
}) => {
  const modalFormData = getModalFormData.value();
  const teachersState = getTeachersState.value();
  const subjectsState = getSubjectsState.value();
  const users = getUsers.value();
  const user = getUser.value();

  console.log(">>>teachersState: ", teachersState);

  console.log(">>>Schedule: ", schedule);

  if (user.role === "teacher") {
    return null;
  }

  if (!scheduleClass) {
    return null;
  }

  if (isModalSavePressed) {
    const { type } = modalFormData;
    if (type === "add") {
      console.log(">>>add hour");
      const subjectName = modalFormData.subject;
      const subjectFound = subjectsState.find((subject: any) => {
        return subject.name === subjectName;
      });
      const { subjectId } = subjectFound;
      const { day, hour } = modalFormData;
      const subject = {
        subjectId,
        teacherId: "",
        day,
        hour,
      };
      const { teacherId: subjectTeacherId } = teachersState.find(
        (teacher: any) => {
          return (
            teacher.subjectId === subjectId &&
            teacher.classes.includes(scheduleClass.classId)
          );
        }
      );
      subject.teacherId = subjectTeacherId;
      const newSubjects = [...schedule.subjects, subject];
      const newSchedule = { ...schedule, subjects: newSubjects };
      const updatedSchedule: any = {};
      updatedSchedule.subjects = newSubjects;
      try {
        axios.put(
          `http://localhost:5000/api/schedules/${schedule.scheduleId}`,
          updatedSchedule
        );
        updateSchedule.set(newSchedule);
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Eroare la adaugarea orei", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } else if (type === "edit") {
      console.log(">>>edit hour");
      const subjectName = modalFormData.subject;
      const subjectFound = subjectsState.find((subject: any) => {
        return subject.name === subjectName;
      });
      const { subjectId } = subjectFound;
      const { day, hour } = modalFormData;
      const subject = {
        subjectId,
        teacherId: "",
        day,
        hour,
      };
      const { subjectTeacherId } = teachersState.find((teacher: any) => {
        return (
          teacher.subjectId === subjectId &&
          teacher.classes.includes(scheduleClass.classId)
        );
      });
      subject.teacherId = subjectTeacherId;
      const newSubjects = schedule.subjects.map((subjectEl: any) => {
        if (subjectEl.day === day && subjectEl.hour === hour.toString()) {
          return subject;
        }
        return subjectEl;
      });
      const newSchedule = { ...schedule, subjects: newSubjects };
      try {
        axios.put(
          `http://localhost:5000/api/schedules/${schedule.scheduleId}`,
          newSchedule
        );
        updateSchedule.set(newSchedule);
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Eroare la modificarea orei", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
    updateModalFormData.set({});
    updateIsModalSavePressed.set(false);
  }

  const subjects = schedule.subjects || [];

  const startHour = 8;
  const endHour = 19;
  const days = ["Lu", "Ma", "Mi", "Jo", "Vi"];

  const handleEdit_AddButton = (initalValues: any) => {
    console.log(">>>initalValues: ", initalValues);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  return (
    <div className="schedule">
      <div className="d-flex justify-content-center">
        <h2>Orar clasa {getClassName(scheduleClass.name)}</h2>
      </div>
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
                        type: "text",
                        disabled: true,
                      },
                      {
                        field: "day",
                        label: "Zi",
                        className: "form-floating mb-3 col-md-12",
                        placeholder: "Lu",
                        type: "text",
                        disabled: true,
                      },
                    ];

                    const initialValuesAdd = {
                      subject: "",
                      hour: hour.toString(),
                      day,
                    };

                    if (subjectFound) {
                      const { teacherId } = subjectFound;

                      const { userId: teacherUserId } = getTeacherData(
                        teachersState,
                        teacherId
                      );

                      const { firstName, lastName } = getUserData(
                        users,
                        teacherUserId
                      );

                      const { name: subjectName } = getSubjectData(
                        subjectsState,
                        subjectFound.subjectId
                      );

                      const initialValuesEdit = {
                        subject: subjectFound.name,
                        hour: hour.toString(),
                        day,
                      };

                      return (
                        <td>
                          <div className="text-center d-flex justify-content-center">
                            {firstName} {lastName}
                          </div>
                          <div className="text-center d-flex justify-content-center">
                            {subjectName}
                          </div>
                          {user.role === "director" && (
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
                              <Modal
                                fields={fields}
                                title={"Modifica ora"}
                                type={"edit"}
                              />

                              <button
                                className="btn btn-lg btn-outline-danger py-0"
                                style={{ fontSize: "1rem", border: "none" }}
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          )}
                        </td>
                      );
                    }
                    return (
                      <td className="text-center align-middle">
                        {user.role === "director" && (
                          <>
                            <button
                              className="btn btn-outline-success py-0"
                              style={{ fontSize: "10px", border: "none" }}
                              onClick={() =>
                                handleEdit_AddButton(initialValuesAdd)
                              }
                            >
                              <AddIcon size="1.5rem" />
                            </button>
                            <Modal
                              fields={fields}
                              title={"Adauga ora"}
                              type={"add"}
                            />
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getClassName = (className: any) => {
  switch (className) {
    case "5A":
      return "a V-a A";
      break;
    case "5B":
      return "a V-a B";
      break;
    case "6A":
      return "a VI-a A";
      break;
    case "6B":
      return "a VI-a B";
      break;
    case "7A":
      return "a VII-a A";
      break;
    case "7B":
      return "a VII-a B";
      break;
    case "8A":
      return "a VIII-a A";
      break;
    case "8B":
      return "a VIII-a B";
      break;
    case "9A":
      return "a IX-a A";
      break;
    case "9B":
      return "a IX-a B";
      break;
    case "9C":
      return "a IX-a C";
      break;
    case "10A":
      return "a X-a A";
      break;
    case "10B":
      return "a X-a B";
      break;
    case "10C":
      return "a X-a C";
      break;
    case "11A":
      return "a XI-a A";
      break;
    case "11B":
      return "a XI-a B";
      break;
    case "11C":
      return "a XI-a C";
      break;
    case "12A":
      return "a XII-a A";
      break;
    case "12B":
      return "a XII-a B";
      break;
    case "12C":
      return "a XII-a C";
      break;
    default:
      return "";
      break;
  }
};
