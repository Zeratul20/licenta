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

const manipulateGrades = (grades: any) => {
  if (grades.length === 0) {
    return (
      <div className="text-center">
        <span className="badge ">-</span>
      </div>
    );
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
  if (absences.length === 0) {
    return (
      <div className="text-center">
        <span className="badge">-</span>
      </div>
    );
  }
  return absences.map((absence: any, index: number) => {
    return (
      <div className="text-center" key={index} style={{ display: "flex" }}>
        <span className="badge">x/</span>
        <span className="badge sm">{absence}</span>
      </div>
    );
  });
};

export const Table: view = ({
  catalogueClass = observe.catalogue.class,
  catalogue = observe.catalogue.catalogue,
  updateCatalogue = update.catalogue.catalogue,
  updateModalFormData = update.modal.formData,
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  updateIsModalOpen = update.modal.isOpen,
  getModalFormData = get.modal.formData,
  getCatalogueTeacher = get.catalogue.teacher,
  getCatalogueStudent = get.catalogue.student,
  getUser = get.user,
  getUsers = get.users,
  getSubjectsState = get.subjects,
  getParents = get.parents,
  getStudents = get.students,
}) => {
  if (!catalogueClass) return null;

  console.log(">>>catalogueClass: ", catalogueClass);

  const user = getUser.value();

  const modalFormData = getModalFormData.value();
  const catalogueTeacher = getCatalogueTeacher.value();
  const catalogueStudent = getCatalogueStudent.value();
  const subjectsState = getSubjectsState.value();
  const parentsState = getParents.value();
  const studentsState = getStudents.value();
  const users = getUsers.value();

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

  if (isModalSavePressed) {
    if (user.role === "teacher") {
      const newGrade: any = {};
      const { name, grade, date, studentId } = modalFormData;
      let newCatalogue = catalogue;
      for (let i = 0; i < catalogue.length; i++) {
        let student = catalogue[i];
        if (student.studentId === studentId) {
          newGrade.value = grade;
          newGrade.date = date;
          if (!student.grades[0])
            student.grades.push({
              subjectId: catalogueTeacher.subjectId,
              grades: [],
            });
          student.grades[0].grades.push(newGrade);
          newCatalogue[i] = student;
        }
      }

      try {
        axios.put(
          `http://localhost:5000/api/students/${studentId}/${catalogueTeacher.teacherId}/grades`,
          newGrade
        );
        console.log(">>>newCatalogue: ", newCatalogue);
        const parentsFound = parentsState.filter((parent: any) =>
          parent.students.includes(studentId)
        );
        const userParents = parentsFound.map((parent: any) =>
          users.find((user: any) => user.userId === parent.userId)
        );
        const emails = userParents.map((user: any) => user.email);
        const studentFound = studentsState.find(
          (student: any) => student.studentId === studentId
        );
        const userStudent = users.find(
          (user: any) => user.userId === studentFound.userId
        );
        updateCatalogue.set(newCatalogue);
        axios.post(`http://localhost:5000/api/email/grade`, {
          emailsTo: emails,
          ccEmail: userStudent.email,
          studentName: `${userStudent.lastName} ${userStudent.firstName}`,
          grade: newGrade.value,
          subjectName: getSubject(catalogueTeacher.subjectId).name,
        });
      } catch (error) {
        console.log(">>>error: ", error);
        toast.error("Eroare la adaugarea notei", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
    updateIsModalSavePressed.set(false);
  }

  if (!catalogue) return null;
  console.log(">>>catalogueClass: ", catalogueClass);
  let { subjects: tempSubjects } = catalogueClass;
  if (user.role === "teacher") {
    tempSubjects = [catalogueTeacher.subjectId];
  }

  const subjects = tempSubjects;

  console.log("catalogue: ", catalogue);
  console.log("subjects: ", subjects);

  const handleEdit_AddButton = (initalValues: any) => {
    console.log(">>>initalValues: ", initalValues);
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
                  const fields = [
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
                  const initialValuesAdd = {
                    name: `${lastName} ${firstName}`,
                    grade: "",
                    date: dayjs().format("DD.MM"),
                    studentId: student.studentId,
                  };
                  return (
                    <>
                      <td
                        scope="col"
                        key={index}
                        colSpan={1}
                        className="text-center align-middle"
                      >
                        {manipulateGrades(studentGrade.grades)}
                        {user.role === "teacher" && (
                          <>
                            <button
                              className="btn btn-outline-primary py-0"
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
                      <td scope="col" key={index} colSpan={1}>
                        {manipulateAbsences([])}
                      </td>
                    </>
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
