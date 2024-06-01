import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { AddIcon, EditIcon, TrashIcon } from "../../assets/icons";
import { Modal } from "../../components/modals/modalForm";

import { getClassName, getShortClassName } from "../../utils";

import { generatePDF } from "../../utils/pdf";

import DownloadIcon from "../../assets/img/download.png";

import {
  getSubjectData,
  getTeacherData,
  getUserData,
  modalOperation,
} from "../../utils";

const colors = [
  "#ddeeff",
  "#ddccff",
  "#ffddcc",
  "#ffccdd",
  "#ccffdd",
  "#f6fdc3",
  "#f6d6c3",
  "#f6c3c3",
  "#f6c3e7",
  "#c3f6f6",
  "#c3f6c3",
  "#c3c3f6",
  "#f4c5c5",
];

export const Table: view = ({
  scheduleClass = observe.schedule.class,
  schedule = observe.schedule.schedule,
  scheduleTeacher = observe.schedule.teacher,
  getSchedules = get.schedules,
  updateModalFormData = update.modal.formData,
  getTeachersState = get.teachers,
  getSubjectsState = get.subjects,
  getUsers = get.users,
  getUser = get.user,
  getClassesState = get.classes,
  getScheduleStudent = get.schedule.student,
  updateIsModalOpen = update.modal.isOpen,
}) => {
  const teachersState = getTeachersState.value();
  const subjectsState = getSubjectsState.value();
  const schedules = getSchedules.value();
  const users = getUsers.value();
  const user = getUser.value();
  const scheduleStudent = getScheduleStudent.value();

  const [modalType, setModalType] = useState("");

  console.log(">>>teachersState: ", teachersState);

  console.log(">>>Schedule: ", schedule);
  console.log(">>>Schedules: ", schedules);

  const schedulePdfData: any = [];

  const startHour = 8;
  const endHour = 19;
  const days = ["Lu", "Ma", "Mi", "Jo", "Vi"];

  const handleDownloadClick = async (
    schedulePdfData: any,
    type: string,
    schedulePdfGeneralData: any
  ) => {
    const pdfData = await generatePDF(
      schedulePdfData,
      type,
      schedulePdfGeneralData
    );
    const blob = new Blob([pdfData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Orar.pdf";
    a.click();
  };

  if (user.role === "teacher") {
    if (!scheduleTeacher) {
      return (
        <div className="d-flex justify-content-center">
          <h2>Orar indisponibil</h2>
        </div>
      );
    }
    const teacher = teachersState.find(
      (teacher: any) => teacher.userId === user.userId
    );
    const subjectName = getSubjectData(subjectsState, teacher.subjectId).name;
    const classesState = getClassesState.value();
    console.log(">>>scheduleTeacher: ", scheduleTeacher);
    const colorsForClasses: any = {};
    classesState.forEach((classEl: any, index: number) => {
      colorsForClasses[classEl.classId] = colors[index];
    });
    const schedulePdfGeneralData = {
      teacherName: ` ${user.firstName} ${user.lastName}`,
    };
    return (
      <div className="schedule">
        <div className="d-flex justify-content-center">
          <h2>
            {user.lastName} {user.firstName}
          </h2>
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
                      const hourFound = scheduleTeacher.find(
                        (subject: any) =>
                          subject.day === day &&
                          subject.hour === hour.toString()
                      );

                      if (hourFound) {
                        const { classId } = hourFound;
                        const backgroundClr = colorsForClasses[classId];
                        const { name: className } = classesState.find(
                          (classEl: any) => classEl.classId === classId
                        );

                        const subjectData = {
                          hour,
                          day,
                          className: getShortClassName(className),
                          backgroundColor: backgroundClr,
                        };
                        schedulePdfData.push(subjectData);

                        console.log(">>>SecheduleTeacher: ", scheduleTeacher);
                        let actualSubjectName = subjectName;
                        if(className.startsWith("10") && actualSubjectName === "Logica")
                          actualSubjectName = "Psihologie";
                        return (
                          <td style={{ backgroundColor: backgroundClr }}>
                            <div className="text-center d-flex justify-content-center">
                              <div style={{display: "flex", flexDirection: "column"}}>
                                <span><b>{getShortClassName(className)}</b></span>
                                <span style={{fontSize: "13px"}}>{actualSubjectName}</span>
                              </div>
                            </div>
                          </td>
                        );
                      }
                      return <td className="text-center align-middle"></td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ paddingLeft: "1000px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              handleDownloadClick(
                schedulePdfData,
                "teacher",
                schedulePdfGeneralData
              )
            }
          >
            <div className="d-flex">
              <span>Descărcați orarul</span>
              <img
                src={DownloadIcon}
                alt="Download"
                style={{ width: "30px", marginLeft: "10px" }}
              />
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (!scheduleClass || !schedule) {
    return null;
  }

  const subjects = schedule.subjects || [];

  console.log(">>>subjects: ", subjects);

  const handleEdit_AddButton = (initalValues: any, type: string) => {
    console.log(">>>initalValues: ", initalValues);
    initalValues.type = type;
    setModalType(type);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  let modalTitle = "";

  let fields = [
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

  if (modalType === "add") modalTitle = "Adaugă oră";
  else if (modalType === "edit") modalTitle = "Modifică ora";
  else if (modalType === "delete") {
    fields = [];
    modalTitle = "Sterge ora";
  }

  const colorsForSubjects: any = {};

  subjectsState.forEach((subject: any, index: number) => {
    colorsForSubjects[subject.subjectId] = colors[index];
  });

  const schedulePdfGeneralData = {
    className: getClassName(scheduleClass.name),
  };

  return (
    <div className="schedule">
      <div>
        <h2 style={{ textAlign: "center" }}>
          Clasa {getClassName(scheduleClass.name)}
        </h2>
        {user.role === "parent" && (
          <h3 style={{ textAlign: "center" }}>
            {"("}
            {scheduleStudent.lastName} {scheduleStudent.firstName}
            {")"}
          </h3>
        )}
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
                  <th className="text-center" scope="col" style={{}}>
                    {hour}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {days.map((day: string, index: number) => {
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

                    const backgroundClr = subjectFound
                      ? colorsForSubjects[subjectFound.subjectId]
                      : "#ffffff";

                    const initialValuesAdd = {
                      subject: "",
                      hour: hour.toString(),
                      day,
                    };

                    if (subjectFound) {
                      console.log(">>>subjectFound: ", subjectFound);
                      console.log(">>>hour: ", hour);
                      console.log(">>>day: ", day);
                      console.log(">>>subjects: ", subjects);
                      const { teacherId } = subjectFound;

                      const { userId: teacherUserId } = getTeacherData(
                        teachersState,
                        teacherId
                      );

                      const { firstName, lastName } = getUserData(
                        users,
                        teacherUserId
                      );

                      console.log(">>>subjectsState", subjectsState);

                      let { name: subjectName } = getSubjectData(
                        subjectsState,
                        subjectFound.subjectId
                      );

                      if (
                        subjectName === "Logica" &&
                        scheduleClass.name.startsWith("10")
                      )
                        subjectName = "Psihologie";

                      console.log(">>>subjectName: ", subjectName);

                      const initialValuesEdit = {
                        subject: subjectName,
                        hour: hour.toString(),
                        day,
                      };

                      const subjectData = {
                        subject: subjectName,
                        hour,
                        day,
                        teacherName: `${firstName} ${lastName}`,
                        backgroundColor: backgroundClr,
                      };

                      schedulePdfData.push(subjectData);

                      return (
                        <td style={{ backgroundColor: backgroundClr }}>
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
                                  handleEdit_AddButton(
                                    initialValuesEdit,
                                    "edit"
                                  )
                                }
                              >
                                <EditIcon />
                              </button>

                              <button
                                className="btn btn-lg btn-outline-danger py-0"
                                style={{ fontSize: "1rem", border: "none" }}
                                onClick={() =>
                                  handleEdit_AddButton(
                                    initialValuesAdd,
                                    "delete"
                                  )
                                }
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
                                handleEdit_AddButton(initialValuesAdd, "add")
                              }
                            >
                              <AddIcon size="1.5rem" />
                            </button>
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
        <div style={{ paddingLeft: "950px", paddingTop: "20px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              handleDownloadClick(
                schedulePdfData,
                "class",
                schedulePdfGeneralData
              )
            }
          >
            <div className="d-flex">
              <span>Descărcați orarul</span>
              <img
                src={DownloadIcon}
                alt="Download"
                style={{ width: "30px", marginLeft: "10px" }}
              />
            </div>
          </button>
        </div>
      </div>
      <Modal fields={fields} title={modalTitle} type={modalType} />
    </div>
  );
};
