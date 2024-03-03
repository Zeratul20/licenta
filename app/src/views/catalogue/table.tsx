import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "./style.css";

import { AddIcon, EditIcon, TrashIcon } from "../../assets/icons";
import { Modal } from "../../components/modals/modalForm";

import axios from "axios";
import { modalOperation } from "../../utils";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";

export const Table: view = ({
  catalogueClass = observe.catalogue.class,
  catalogue = observe.catalogue.catalogue,
  updateModalFormData = update.modal.formData,
  absences = observe.catalogue.absences,
  updateIsModalOpen = update.modal.isOpen,
  getCatalogueTeacher = get.catalogue.teacher,
  getUser = get.user,
  getUsers = get.users,
  getSubjectsState = get.subjects,
}) => {
  const [modalType, setModalType] = useState("");
  if (!catalogueClass) return null;

  console.log(">>>catalogueClass: ", catalogueClass);

  const user = getUser.value();

  const catalogueTeacher = getCatalogueTeacher.value();
  const subjectsState = getSubjectsState.value();
  const users = getUsers.value();

  let modalTitle = "";

  let fields: any = [];

  if (modalType === "addGrade") {
    modalTitle = "Adauga nota";
    fields = [
      {
        field: "name",
        label: "Nume",
        className: "form-floating mb-3 col-md-12",
        placeholder: "Popescu Ion",
        type: "text",
        disabled: true,
      },
      {
        field: "grade",
        label: "Nota",
        className: "form-floating mb-3 col-md-12",
        placeholder: "10",
        type: "text",
      },
      {
        field: "date",
        label: "Data",
        className: "form-floating mb-3 col-md-12",
        placeholder: "01.01",
        type: "text",
        disabled: true,
      },
    ];
  } else if (modalType === "addAbsence") {
    fields = [
      {
        field: "name",
        label: "Nume",
        className: "form-floating mb-3 col-md-12",
        placeholder: "Popescu Ion",
        type: "text",
        disabled: true,
      },
      {
        field: "grade",
        label: "Nota",
        className: "form-floating mb-3 col-md-12",
        placeholder: "10",
        type: "text",
        disabled: true,
        hidden: true,
      },
      {
        field: "date",
        label: "Data",
        className: "form-floating mb-3 col-md-12",
        placeholder: "01.01",
        type: "text",
        disabled: true,
      },
    ];
    modalTitle = "Adauga absenta";
  } else if (modalType === "editAbsence") {
    fields = [
      {
        field: "name",
        label: "Nume",
        className: "form-floating mb-3 col-md-12",
        placeholder: "Popescu Ion",
        type: "text",
        disabled: true,
      },
      {
        field: "grade",
        label: "Nota",
        className: "form-floating mb-3 col-md-12",
        placeholder: "10",
        type: "text",
        disabled: true,
        hidden: true,
      },
      {
        field: "date",
        label: "Data",
        className: "form-floating mb-3 col-md-12",
        placeholder: "01.01",
        type: "text",
        disabled: true,
      },
    ];
    modalTitle = "Modifica nota";
  }

  const getSubject = (subjectId: string) => {
    const subject = subjectsState.find(
      (subject: any) => subject.subjectId === subjectId
    );
    return subject;
  };

  const getUserById = (userId: string) => {
    const user = users.find((user: any) => user.userId === userId);
    return user;
  };

  if (!catalogue) return null;
  console.log(">>>catalogueClass: ", catalogueClass);

  let { subjects: tempSubjects } = catalogueClass;
  let isDiriginte = false;
  if (user.role === "teacher") {
    if (catalogueClass.teacherId === catalogueTeacher.teacherId)
      isDiriginte = true;
    else tempSubjects = [catalogueTeacher.subjectId];
  }

  const subjects = tempSubjects;

  console.log("catalogue: ", catalogue);
  console.log("subjects: ", subjects);

  const handleEdit_AddButton = (initalValues: any, type: string) => {
    console.log(">>>initalValues: ", initalValues);
    initalValues.type = type;
    setModalType(type);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  const sortedCatalogue = catalogue.sort((a: any, b: any) => {
    const { lastName: lastNameA, firstName: firstNameA } = getUserById(
      a.userId
    );
    const { lastName: lastNameB, firstName: firstNameB } = getUserById(
      b.userId
    );
    if (lastNameA < lastNameB) {
      return -1;
    }
    if (lastNameA > lastNameB) {
      return 1;
    }
    if (firstNameA < firstNameB) {
      return -1;
    }
    if (firstNameA > firstNameB) {
      return 1;
    }
    return 0;
  });

  const manipulateGrades = (grades: any) => {
    if (grades.length === 0) {
      return null;
    }
    return grades.map((grade: any, index: any) => {
      return (
        <div className="text-center" key={index} style={{ display: "flex" }}>
          <div className="catalogue-content">{grade.value}</div>
          <div className="catalogue-content-dates">/{grade.date}</div>
        </div>
      );
    });
  };

  const manipulateAbsences = (absences: any, initialValuesEdit: any) => {
    console.log(">>>absences: ", absences);
    if (absences.length === 0) return null;
    return absences.map((absence: any, index: number) => {
      initialValuesEdit.absenceId = absence.absenceId;
      let isCutClassname = absence.isMotivated ? "is-cut" : "";
      return (
        <div className="text-center" key={index} style={{ display: "flex" }}>
          <div className={isCutClassname}>
            <span className="catalogue-content">X</span>
            <span className="catalogue-content-dates">/{absence.date}</span>
          </div>
          {isDiriginte && !absence.isMotivated && (
            <button
              className="btn btn-outline-primary py-0"
              style={{ fontSize: "15px", border: "none" }}
              onClick={() =>
                handleEdit_AddButton(initialValuesEdit, "editAbsence")
              }
            >
              Motiveaza
            </button>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <table className="table table-bordered" style={{ border: "1px" }}>
        <thead>
          <tr>
            <th scope="col" colSpan={2}>
              <div className="text-center">#</div>
            </th>
            {user.role !== "teacher" && (
              <th scope="col" colSpan={1}>
                <div className="text-center">Media generala</div>
              </th>
            )}
            {/* <th scope="col" colSpan={1}>
              <div className="text-center"> </div>
            </th> */}
            {subjects.map((subject: string, index: number) => {
              const { name: subjectName } = getSubject(subject);
              return (
                <th scope="col" key={index} colSpan={2}>
                  <div className="text-center">{subjectName}</div>
                </th>
              );
            })}
          </tr>
          <tr>
            <th scope="col" key={"catalog-name"} colSpan={2}>
              <div className="text-center">Nume</div>
            </th>
            {/* <th scope="col" key={"catalog-name"} colSpan={1}>
              <div className="text-center"> </div>
            </th> */}
            {user.role !== "teacher" && (
              <th scope="col" key={"catalog-name"} colSpan={1}>
                <div className="text-center"> </div>
              </th>
            )}
            {subjects.map((subject: string, index: number) => {
              return (
                <>
                  <th scope="col" key={index} colSpan={1}>
                    <div className="text-center">Note</div>
                  </th>
                  <th scope="col" key={index} colSpan={1}>
                    <div className="text-center">Absente</div>
                  </th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {catalogue.map((student: any, index: number) => {
            console.log(">>>student in catalogue: ", student);
            const { lastName, firstName } = getUserById(student.userId);
            return (
              <tr key={index}>
                <th scope="row" key={index} colSpan={2}>
                  <div className="text-center">
                    {lastName} {firstName}
                  </div>
                </th>
                {user.role !== "teacher" && (
                  <td scope="col" key={index} colSpan={1}>
                    {" "}
                  </td>
                )}
                {subjects.map((subject: string, index: number) => {
                  const studentGrade = student.grades.find(
                    (studentGrade: any) => studentGrade.subjectId === subject
                  ) || { grades: [] };
                  const date = dayjs().format("DD.MM");
                  // const fields = [
                  //   {
                  //     field: "name",
                  //     label: "Nume",
                  //     className: "form-floating mb-3 col-md-12",
                  //     placeholder: "Popescu Ion",
                  //     type: "text",
                  //     disabled: true,
                  //   },
                  //   {
                  //     field: "grade",
                  //     label: "Nota",
                  //     className: "form-floating mb-3 col-md-12",
                  //     placeholder: "10",
                  //     type: "text",
                  //   },
                  //   {
                  //     field: "date",
                  //     label: "Data",
                  //     className: "form-floating mb-3 col-md-12",
                  //     placeholder: "01.01",
                  //     type: "text",
                  //     disabled: true,
                  //   },
                  // ];
                  const initialValuesAddGrade = {
                    name: `${lastName} ${firstName}`,
                    grade: "",
                    date,
                    studentId: student.studentId,
                  };
                  const initalValuesAbsence = {
                    name: `${lastName} ${firstName}`,
                    grade: "",
                    date,
                    studentId: student.studentId,
                  };

                  const studentSubjectAbsences = absences.filter(
                    (absence: any) =>
                      absence.studentId === student.studentId &&
                      absence.subjectId === subject
                  );
                  return (
                    <>
                      <td
                        scope="col"
                        key={index}
                        colSpan={1}
                        className="text-center"
                      >
                        {manipulateGrades(studentGrade.grades)}
                        {user.role === "teacher" &&
                          catalogueTeacher.subjectId === subject && (
                            <>
                              <button
                                className="btn btn-outline-primary py-2.5"
                                style={{ fontSize: "10px", border: "none" }}
                                onClick={() =>
                                  handleEdit_AddButton(
                                    initialValuesAddGrade,
                                    "addGrade"
                                  )
                                }
                              >
                                <AddIcon size="1.5rem" />
                              </button>
                            </>
                          )}
                      </td>
                      <td
                        scope="col"
                        key={index}
                        colSpan={1}
                        className="text-center"
                      >
                        {manipulateAbsences(
                          studentSubjectAbsences,
                          initalValuesAbsence
                        )}
                        {user.role === "teacher" &&
                          catalogueTeacher.subjectId === subject && (
                            <>
                              <button
                                className="btn btn-outline-primary py-2.5"
                                style={{ fontSize: "10px", border: "none" }}
                                onClick={() =>
                                  handleEdit_AddButton(
                                    initalValuesAbsence,
                                    "addAbsence"
                                  )
                                }
                              >
                                <AddIcon size="1.5rem" />
                              </button>
                            </>
                          )}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal fields={fields} title={modalTitle} type={modalType} />
    </div>
  );
};
