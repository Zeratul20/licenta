import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const bootstrap = require("bootstrap");
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { AddIcon, EditIcon } from "../../assets/icons";
import { modalOperation, sortedClassesByName } from "../../utils";
import { Modal } from "../../components/modals/modalForm";
import * as producers from "./producers";
import { Loader } from "../../components/helpers/loader";

export const Classes: view = ({
  classes = observe.classes,
  user = observe.user,
  nrOfStudents = observe.classesDetails.nrOfStudents,
  isStateInitiated = observe.classesDetails.isStateInitiated,
  getTeachersState = get.teachers,
  getUsersState = get.users,
  updateClass = update.classDetails.class,
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
}) => {
  const teachersState = getTeachersState.value();
  const usersState = getUsersState.value();
  const navigate = useNavigate();
  const sortedClasses = sortedClassesByName(classes);
  
  console.log(">>> nrOfStudents", nrOfStudents);

  console.log(">>>sortedClasses: ", sortedClasses);
  
  const [modalType, setModalType] = useState("");

  if(!isStateInitiated) return <Loader />;

  if (user.role !== "director") return null;

  const handleEdit_AddButton = (initalValues: any, type: string) => {
    console.log(">>>initalValues: ", initalValues);
    initalValues.type = type;
    setModalType(type);
    updateModalFormData.set(initalValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  let modalTitle = "";
  if (modalType === "add") modalTitle = "Adauga clasa";
  if (modalType === "edit") modalTitle = "Modifica datele clasei";

  const fields = [
    {
      field: "className",
      label: "Nume Clasa",
      className: "form-floating mb-3 col-md-12",
      placeholder: "5A",
      type: "text",
    },
    {
      field: "teacherEmail",
      label: "Email Diriginte",
      className: "form-floating mb-3 col-md-12",
      placeholder: "popescu.ion@example.com",
      type: "text",
    },
  ];

  const initialValuesAdd = {
    className: "",
    teacherEmail: "",
  };

  return (
    <>
      <h2 style={{ textAlign: "center", paddingBottom: "2rem" }}>Clase</h2>
      <TableContainer
        component={Paper}
        style={{ width: "75%", marginLeft: "200px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingLeft: "30px" }}>
                <b>Nume</b>
              </TableCell>
              <TableCell align="center">
                <b>Diriginte</b>
              </TableCell>
              <TableCell align="center">
                <b>Numar Elevi&nbsp;</b>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedClasses.map((cls: any) => {
              const { classId, teacherId } = cls;
              const teacherFound = teachersState.find(
                (teacher: any) => teacher.teacherId === teacherId
              );
              if (!teacherFound) return null;
              const teacherUser = usersState.find(
                (user: any) => user.userId === teacherFound.userId
              );
              const { firstName, lastName, email } = teacherUser;
              const initialValuesEdit = {
                className: cls.name,
                teacherEmail: email,
                classId,
              };
              const nrOfStudentsFound = nrOfStudents.find(
                (nr: any) => nr.classId === classId
              );
              return (
                <TableRow
                  key={cls.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => {
                        updateClass.set(cls);
                        navigate(`/classes/${classId}`);
                      }}
                    >
                      {cls.name}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {firstName} {lastName}
                  </TableCell>
                  <TableCell align="center">{nrOfStudentsFound?.value || 0}</TableCell>
                  <TableCell align="center">
                    <button
                      className="btn btn-lg btn-outline-primary py-0"
                      style={{ fontSize: "1rem", border: "none" }}
                      onClick={() =>
                        handleEdit_AddButton(initialValuesEdit, "edit")
                      }
                    >
                      <EditIcon />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow
              key={"newClass"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell align="center">
              </TableCell>
              <TableCell align="center">

              </TableCell>
              <TableCell align="center">
                <button
                  className="btn btn-lg btn-outline-primary py-0"
                  style={{ fontSize: "1rem", border: "none" }}
                  onClick={() =>
                    handleEdit_AddButton(initialValuesAdd, "add")
                  }
                >
                  <AddIcon size="1.5rem" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal fields={fields} title={modalTitle} type={modalType} />
    </>
  );
};

Classes.producers(Object.values(producers));

