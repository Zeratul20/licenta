import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getClassName, modalOperation } from "../../../utils";
import * as producers from "./producers";
import { AddIcon, EditIcon, TrashIcon } from "../../../assets/icons";
import { Modal } from "../../../components/modals/modalForm";

export const ClassDetails: view = ({
  getClassesState = get.classes,
  getTeachersState = get.teachers,
  getUsersState = get.users,
  getSubjectsState = get.subjects,
  user = observe.user,
  classChosen = observe.classDetails.class,
  classTeachers = observe.classDetails.teachers,
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
}) => {
  const { classId } = useParams();
  const navigate = useNavigate();
  if (user.role !== "director" || !classChosen) {
    navigate("/home");
    return null;
  }
  const [modalType, setModalType] = useState("");
  const classesState = getClassesState.value();
  const subjectsState = getSubjectsState.value();
  const usersState = getUsersState.value();
  const teachersState = getTeachersState.value();
  const classFound = classesState.find((cls: any) => cls.classId === classId);
  console.log(">>>classTeachers", classTeachers);
  const teachers: any = [];
  classTeachers.forEach((teacherId: any) => {
    const teacherFound = teachersState.find(
      (teacher: any) => teacher.teacherId === teacherId
    );
    const { firstName, lastName, email } = usersState.find(
      (user: any) => user.userId === teacherFound.userId
    );
    const subjectFound = subjectsState.find(
      (subject: any) => subject.subjectId === teacherFound.subjectId
    );
    const classTeacher = {
      teacherId,
      firstName,
      lastName,
      email,
      subjectName: subjectFound.name,
    };
    if (teacherId === classFound.teacherId) teachers.unshift(classTeacher);
    else teachers.push(classTeacher);
  });
  console.log(">>>>>Teachers: ", teachers);

  const handleEdit_AddButton = (initalValues: any, type: string) => {
    console.log(">>>initalValues: ", initalValues);
    initalValues.type = type;
    setModalType(type);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  let modalTitle = "";
  let fields: any = [];

  if (modalType === "add") {
    modalTitle = "Adauga materie";
    fields = [
      {
        field: "subjectName",
        label: "Materie",
        className: "form-floating mb-3 col-md-12",
        placeholder: "Limba Romana",
        type: "text",
      },
      {
        field: "teacherEmail",
        label: "Email Profesor",
        className: "form-floating mb-3 col-md-12",
        placeholder: "popescu.ion@example.com",
        type: "text",
      },
    ];
  }
  if (modalType === "edit") {
    modalTitle = "Modifica profesor";
    fields = [
      {
        field: "subjectName",
        label: "Materie",
        className: "form-floating mb-3 col-md-12",
        placeholder: "Limba Romana",
        type: "text",
        disabled: true,
      },
      {
        field: "teacherEmail",
        label: "Email Profesor",
        className: "form-floating mb-3 col-md-12",
        placeholder: "popescu.ion@example.com",
        type: "text",
      },
    ];
  }
  if (modalType === "delete") {
    modalTitle = "Sterge materie";
  }

  const initialValuesAdd = {
    subjectName: "",
    teacherEmail: "",
    classId,
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Clasa {getClassName(classFound?.name)}
      </h2>
      <TableContainer
        component={Paper}
        style={{ width: "75%", marginLeft: "200px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingLeft: "30px" }}>
                <b>Materie</b>
              </TableCell>
              <TableCell align="center">
                <b>Profesor</b>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher: any, index: number) => {
              const { teacherId, firstName, lastName, email, subjectName } =
                teacher;
              const initialValuesEdit = {
                subjectName,
                teacherEmail: email,
                teacherId,
                classId,
              };
              return (
                <TableRow
                  key={teacherId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {subjectName}
                  </TableCell>
                  <TableCell align="center">
                    {firstName} {lastName} {index === 0 ? "(diriginte)" : ""}
                  </TableCell>
                  <TableCell align="center">
                    {index > 0 && (
                      <button
                        className="btn btn-lg btn-outline-primary py-0"
                        style={{ fontSize: "1.2rem", border: "none" }}
                        onClick={() =>
                          handleEdit_AddButton(initialValuesEdit, "edit")
                        }
                      >
                        <EditIcon />
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {index > 0 && (
                      <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: "1.2rem", border: "none" }}
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow
              key={"newSubject"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <button
                  className="btn btn-lg btn-outline-primary py-0"
                  style={{ fontSize: "1.5rem", border: "none" }}
                  onClick={() => handleEdit_AddButton(initialValuesAdd, "add")}
                >
                  <AddIcon size="1.5rem" />
                </button>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal fields={fields} title={modalTitle} type={modalType} />
    </>
  );
};

ClassDetails.producers(Object.values(producers));
