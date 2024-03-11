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
import { Paginate } from "../../components/modules/pagination";

const subjectsOrder = [
  "Limba Romana",
  "Limba Engleza",
  "Matematica",
  "Istorie",
  "Fizica",
  "Chimie",
  "Biologie",
  "Informatica",
  "Geografie",
  "Ed. Fizica",
];

export const Table: view = ({
  catalogueClass = observe.catalogue.class,
  catalogue = observe.catalogue.catalogue,
  updateModalFormData = update.modal.formData,
  absences = observe.catalogue.absences,
  currentPage = observe.catalogue.currentPage,
  updateCurrentPage = update.catalogue.currentPage,
  updateIsModalOpen = update.modal.isOpen,
  getCatalogueTeacher = get.catalogue.teacher,
  getUser = get.user,
  getUsers = get.users,
  getStudents = get.students,
  subjectsState = observe.subjects,
}) => {
  const [modalType, setModalType] = useState("");
  if (!catalogueClass) return null;

  console.log(">>>catalogueClass: ", catalogueClass);

  const user = getUser.value();

  const catalogueTeacher = getCatalogueTeacher.value();
  const users = getUsers.value();
  const studentsState = getStudents.value();

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
    modalTitle = "Motiveaza absenta";
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

  const getUserByStudentId = (studentId: string) => {
    const student = studentsState.find(
      (student: any) => student.studentId === studentId
    );
    const user = users.find((user: any) => user.userId === student.userId);
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

  const filteredSubjectsState = subjectsState.filter((subject: any) =>
    subjects.includes(subject.subjectId)
  );

  const sortedSubjectsObj = filteredSubjectsState.sort((a: any, b: any) => {
    return subjectsOrder.indexOf(a.name) - subjectsOrder.indexOf(b.name);
  });

  const sortedSubjects = sortedSubjectsObj.map(
    (subject: any) => subject.subjectId
  );

  console.log("catalogue: ", catalogue);
  console.log("sortedSubjects: ", sortedSubjects);

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

  const manipulateAbsences = (absences: any) => {
    console.log(">>>absences: ", absences);
    if (absences.length === 0) return null;
    return absences.map((absence: any, index: number) => {
      const { absenceId, date, studentId } = absence;
      const { firstName, lastName } = getUserByStudentId(studentId);
      const initialValuesEdit = {
        name: `${lastName} ${firstName}`,
        absenceId,
        date,
        studentId,
      };
      initialValuesEdit.absenceId = absence.absenceId;
      initialValuesEdit.date = absence.date;
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

  const calculateAverage = (grades: any) => {
    let sum = 0;
    grades.forEach((grade: any) => {
      sum += parseInt(grade.value);
    });
    return sum / grades.length;
  };

  const handlePageChange = (event: any, value: number) => {
    updateCurrentPage.set(value);
  };

  const filteredCatalogue = [];
  for (let i = currentPage * 3 - 3; i < currentPage * 3; i++) {
    if (catalogue[i]) {
      filteredCatalogue.push(catalogue[i]);
    }
  }

  const calculateNrOfPages = () => {
    console.log("current page: ", currentPage);
    return (
      Math.floor(catalogue.length / 3) + (catalogue.length % 3 !== 0 ? 1 : 0) ||
      0
    );
  };

  return (
    <>
      <div>
        <Paginate
          nrOfPages={calculateNrOfPages()}
          onChange={(event: any, value: number) =>
            handlePageChange(event, value)
          }
          currentPage={currentPage}
        />
      </div>
      <div className="p-5">
        <table className="table table-bordered" style={{ border: "1px" }}>
          <thead>
            <tr>
              <th scope="col" colSpan={2}>
                <div className="text-center">#</div>
              </th>
              {(user.role !== "teacher" || isDiriginte) && (
                <th scope="col" colSpan={1}>
                  <div className="text-center">Media generala</div>
                </th>
              )}
              {/* <th scope="col" colSpan={1}>
              <div className="text-center"> </div>
            </th> */}
              {sortedSubjects.map((subject: string, index: number) => {
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
              {(user.role !== "teacher" || isDiriginte) && (
                <th scope="col" key={"catalog-name"} colSpan={1}>
                  <div className="text-center"> </div>
                </th>
              )}
              {sortedSubjects.map((subject: string, index: number) => {
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
            {filteredCatalogue.map((student: any, index: number) => {
              console.log(">>>student in catalogue: ", student);
              const { lastName, firstName } = getUserById(student.userId);
              let crAvg = 0;
              const gradesForAvg = student.grades;
              gradesForAvg.forEach((grade: any) => {
                crAvg += Math.round(calculateAverage(grade.grades));
              });
              crAvg = crAvg / gradesForAvg.length;
              const generalAvg = crAvg.toFixed(2);
              return (
                <>
                  <tr key={index}>
                    <th
                      scope="row"
                      key={index}
                      colSpan={2}
                      // style={{ borderBottom: "hidden" }}
                    >
                      <div className="text-center">
                        {lastName} {firstName}
                      </div>
                    </th>
                    {(user.role !== "teacher" || isDiriginte) && (
                      <td
                        scope="col"
                        key={index}
                        colSpan={1}
                        // style={{ borderBottom: "hidden" }}
                      >
                        {" "}
                      </td>
                    )}
                    {sortedSubjects.map((subject: string, index: number) => {
                      const studentGrade = student.grades.find(
                        (studentGrade: any) =>
                          studentGrade.subjectId === subject
                      ) || { grades: [] };
                      const date = dayjs().format("DD.MM");
                      const initialValuesAddGrade = {
                        name: `${lastName} ${firstName}`,
                        grade: "",
                        date,
                        studentId: student.studentId,
                      };

                      const initalValuesAddAbsence = {
                        name: `${lastName} ${firstName}`,
                        grade: "",
                        date,
                        studentId: student.studentId,
                      };

                      const studentSubjectAbsences = absences
                        .filter(
                          (absence: any) =>
                            absence.studentId === student.studentId &&
                            absence.subjectId === subject
                        )
                        .sort((a: any, b: any) => {
                          return dayjs(b.date).isAfter(dayjs(a.date)) ? -1 : 1;
                        });
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
                            // style={{ borderBottom: "hidden" }}
                          >
                            {manipulateAbsences(studentSubjectAbsences)}
                            {user.role === "teacher" &&
                              catalogueTeacher.subjectId === subject && (
                                <>
                                  <button
                                    className="btn btn-outline-primary py-2.5"
                                    style={{ fontSize: "10px", border: "none" }}
                                    onClick={() =>
                                      handleEdit_AddButton(
                                        initalValuesAddAbsence,
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
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center"
                      style={{ borderTop: "hidden" }}
                    ></td>
                    {(user.role !== "teacher" || isDiriginte) && (
                      <td
                        scope="col"
                        key={index}
                        colSpan={1}
                        className="text-center"
                        style={{ borderTop: "hidden" }}
                      >
                        <i style={{ color: "red", fontFamily: "cursive" }}>
                          <b>{generalAvg !== "NaN" ? generalAvg : ""}</b>
                        </i>
                      </td>
                    )}
                    {sortedSubjects.map((subject: string, index: number) => {
                      const studentGrade = student.grades.find(
                        (studentGrade: any) =>
                          studentGrade.subjectId === subject
                      ) || { grades: [] };
                      const avg = calculateAverage(studentGrade.grades);
                      return (
                        <>
                          <td
                            scope="col"
                            key={index}
                            colSpan={1}
                            className="text-center"
                          >
                            {studentGrade.grades.length > 0 ? (
                              <i
                                style={{ color: "red", fontFamily: "cursive" }}
                              >
                                {Math.round(avg)}
                              </i>
                            ) : (
                              ""
                            )}
                          </td>
                          <td
                            scope="col"
                            key={index}
                            colSpan={1}
                            className="text-center"
                          ></td>
                        </>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <Modal fields={fields} title={modalTitle} type={modalType} />
      </div>
    </>
  );
};
