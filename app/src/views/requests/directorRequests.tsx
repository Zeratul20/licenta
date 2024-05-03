import React, { useState } from "react";
import { Modal } from "../../components/modals/modalForm";
import { modalOperation } from "../../utils";
import * as producers from "./producers";
// import { toast } from "react-toastify";
import { GreenTick } from "../../assets/icons/greenTick";
import { RedX } from "../../assets/icons/redX";
import { getClassName } from "../../utils";

export const DirectorRequests: view = ({
  user = observe.user,
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
  requests = observe.requests.content,
  getStudents = get.students,
  getUsers = get.users,
  getTeacherState = get.teacher,
  getClassesState = get.classes,
}) => {
  console.log(">>>user: ", user);
  console.log(">>>requests: ", requests);
  const studentsState = getStudents.value();
  const usersState = getUsers.value();
  const classesState = getClassesState.value();
  const [requestType, setRequestType] = useState(0);
  const [status, setStatus] = useState("");
  const fieldsTypeReject = [
    {
      field: "response",
      label: "Motiv respingere",
      className: "form-floating mb-3 col-md-12",
      placeholder: "Motiv respingere",
      type: "text",
    },
  ];
  const fieldsType1: any = [];
  const fieldsType2: any = [
    {
      field: "className",
      label: "Clasa",
      className: "form-floating mb-3 col-md-12",
      placeholder: "5A",
      type: "text",
    },
  ];
  const fieldsType3: any = [
    {
      field: "subjectName",
      label: "Materie",
      className: "form-floating mb-3 col-md-12",
      placeholder: "Matematica",
      type: "text",
    },
  ];
  const fieldsType4: any = [];
  const fieldsType5: any = [];

  const initialValuesType1 = {
    requestType: 1,
  };
  const initialValuesType2 = { requestType: 2, className: "" };
  const initialValuesType3 = { requestType: 3, subjectName: "", classes: "" };
  const initialValuesType4 = { requestType: 4 };
  const initialValuesType5 = { requestType: 5 };

  const handleAnswerRequest = (
    initialValues: any,
    request: any,
    status: string
  ) => {
    const { userId, requestId } = request;
    initialValues.status = status;
    initialValues.requestId = requestId;
    initialValues.userId = userId;
    if (initialValues.requestType === 1)
      initialValues.students = request.students;
    if (initialValues.requestType === 5)
      initialValues.classId = request.classId;
    updateModalFormData.set(initialValues);
    console.log(">>>initialValues: ", initialValues);
    setRequestType(initialValues.requestType);
    setStatus(status);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  let fieldsType = [];
  let modalTitle = "";
  if (status === "rejected") {
    fieldsType = fieldsTypeReject;
    modalTitle = "Respingere";
  } else if (requestType === 1) {
    fieldsType = fieldsType1;
    modalTitle = "Acceptare Cerere parinte -> elev";
  } else if (requestType === 2) {
    fieldsType = fieldsType2;
    modalTitle = "Acceptare Cerere elev";
  } else if (requestType === 3) {
    fieldsType = fieldsType3;
    modalTitle = "Acceptare Cerere profesor";
  } else if (requestType === 4) {
    fieldsType = fieldsType4;
    modalTitle = "Acceptare Cerere stergere elev";
  } else if (requestType === 5) {
    fieldsType = fieldsType5;
    modalTitle = "Acceptare Cerere mutare elev";
  }

  const pendingRequests = requests.filter(
    (request: any) => request.status === "pending"
  );

  return (
    <>
      <h2
        style={{
          paddingLeft: "100px",
          paddingTop: "40px",
          paddingBottom: "50px",
        }}
      >
        Cereri in asteptare:
      </h2>
      <div>
        {pendingRequests.map((request: any) => {
          console.log(">>>request: ", request);
          if (request.type == "1") {
            const dataForParent = usersState.find(
              (userState: any) => userState.userId === request.userId
            );
            const {
              email: parentEmail,
              firstName: parentFirstName,
              lastName: parentLastName,
            } = dataForParent;
            return (
              <div
                key={request.requestId}
                style={{ width: "75%", paddingBottom: "50px" }}
              >
                <div
                  className="card border-dark mb-5 w-75"
                  style={{
                    marginLeft: "250px",
                    zIndex: 1,
                    boxShadow: "4px 4px 15px 2px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    className="card-header border-dark"
                    style={{ backgroundColor: "#e7e8e9" }}
                    // style={{ display: "flex" }}
                  >
                    <b>Cerere de tipul parinte {`-> elev(i)`}</b>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="card-title">
                        Parintele <b>{parentEmail}</b>{" "}
                        {`(${parentLastName} ${parentFirstName})`}
                        doreste sa isi asigneze urmatorii elevi:
                      </div>
                      <div className="card-text">
                        {request.students.map((student: any) => {
                          const userIdForStudent = studentsState.find(
                            (studentState: any) =>
                              studentState.studentId === student
                          )?.userId;
                          const dataForStudent = usersState.find(
                            (userState: any) =>
                              userState.userId === userIdForStudent
                          );
                          const {
                            email: studentEmail,
                            firstName: studentFirstName,
                            lastName: studentLastName,
                          } = dataForStudent;
                          return (
                            <p>
                              {studentEmail}{" "}
                              {`(${studentLastName} ${studentFirstName})`}
                            </p>
                          );
                        })}
                        <div style={{ display: "flex" }}>
                          <button
                            style={{
                              border: "none",
                              background: "transparent",
                              paddingRight: "200px",
                              // blockSize: "15px",
                            }}
                            onClick={() =>
                              handleAnswerRequest(
                                initialValuesType1,
                                request,
                                "accepted"
                              )
                            }
                          >
                            <GreenTick />
                          </button>
                          <button
                            style={{
                              border: "none",
                              background: "transparent",
                              paddingLeft: "200px",
                            }}
                            onClick={() =>
                              handleAnswerRequest(
                                { response: "" },
                                request,
                                "rejected"
                              )
                            }
                          >
                            <RedX />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (request.type == "2") {
            const dataForUser = usersState.find(
              (userState: any) => userState.userId === request.userId
            );
            const { email, firstName, lastName } = dataForUser;
            return (
              <div
                key={request.requestId}
                style={{ width: "75%", paddingBottom: "50px" }}
              >
                <div
                  className="card border-dark mb-5 w-75"
                  style={{
                    marginLeft: "250px",
                    zIndex: 1,
                    boxShadow: "4px 4px 15px 2px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    className="card-header border-dark"
                    style={{ backgroundColor: "#e7e8e9" }}
                    // style={{ display: "flex" }}
                  >
                    <b>Cerere de tipul elev</b>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="card-title">
                        Utilizatorul <b>{email}</b> {`(${lastName} ${firstName})`}{" "}
                        doreste sa isi asigneze rolul de elev.
                      </div>
                      <div className="card-text" style={{ display: "flex" }}>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingRight: "200px",
                            // blockSize: "15px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              initialValuesType2,
                              request,
                              "accepted"
                            )
                          }
                        >
                          <GreenTick />
                        </button>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingLeft: "200px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              { response: "" },
                              request,
                              "rejected"
                            )
                          }
                        >
                          <RedX />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (request.type == "3") {
            const dataForUser = usersState.find(
              (userState: any) => userState.userId === request.userId
            );
            const { email, firstName, lastName } = dataForUser;
            return (
              <div
                key={request.requestId}
                style={{ width: "75%", paddingBottom: "50px" }}
              >
                <div
                  className="card border-dark mb-5 w-75"
                  style={{
                    marginLeft: "250px",
                    zIndex: 1,
                    boxShadow: "4px 4px 15px 2px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    className="card-header border-dark"
                    style={{ backgroundColor: "#e7e8e9" }}
                    // style={{ display: "flex" }}
                  >
                    <b>Cerere de tipul profesor</b>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="card-title">
                        Utilizatorul <b>{email}</b> {`(${lastName} ${firstName})`}{" "}
                        doreste sa isi asigneze rolul de profesor.
                      </div>
                      <div className="card-text" style={{ display: "flex" }}>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingRight: "200px",
                            // blockSize: "15px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              initialValuesType3,
                              request,
                              "accepted"
                            )
                          }
                        >
                          <GreenTick />
                        </button>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingLeft: "200px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              { response: "" },
                              request,
                              "rejected"
                            )
                          }
                        >
                          <RedX />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (request.type == "4") {
            const dataForUser = usersState.find(
              (userState: any) => userState.userId === request.userId
            );
            const { email, firstName, lastName } = dataForUser;
            return (
              <div
                key={request.requestId}
                style={{ width: "75%", paddingBottom: "50px" }}
              >
                <div
                  className="card border-dark mb-5 w-75"
                  style={{
                    marginLeft: "250px",
                    zIndex: 1,
                    boxShadow: "4px 4px 15px 2px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    className="card-header border-dark"
                    style={{ backgroundColor: "#e7e8e9" }}
                    // style={{ display: "flex" }}
                  >
                    <b>Cerere de tipul stergere elev</b>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="card-title">
                        Utilizatorul <b>{email}</b>{" "}
                        {`(${lastName} ${firstName})`} doreste sa isi stearga
                        rolul de elev.
                      </div>
                      <div className="card-text" style={{ display: "flex" }}>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingRight: "200px",
                            // blockSize: "15px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              initialValuesType4,
                              request,
                              "accepted"
                            )
                          }
                        >
                          <GreenTick />
                        </button>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingLeft: "200px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              { response: "" },
                              request,
                              "rejected"
                            )
                          }
                        >
                          <RedX />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            const dataForUser = usersState.find(
              (userState: any) => userState.userId === request.userId
            );
            const { email, firstName, lastName } = dataForUser;
            const { classId } = request;
            const className = classesState.find(
              (classState: any) => classState.classId === classId
            )?.name;
            return (
              <div
                key={request.requestId}
                style={{ width: "75%", paddingBottom: "50px" }}
              >
                <div
                  className="card border-dark mb-5 w-75"
                  style={{
                    marginLeft: "250px",
                    zIndex: 1,
                    boxShadow: "4px 4px 15px 2px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    className="card-header border-dark"
                    style={{ backgroundColor: "#e7e8e9" }}
                    // style={{ display: "flex" }}
                  >
                    <b>Cerere de tipul mutare elev</b>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="card-title">
                        Elevul <b>{email}</b> {`(${lastName} ${firstName})`} doreste sa
                        se mute in clasa {className}.
                      </div>
                      <div className="card-text" style={{ display: "flex" }}>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingRight: "200px",
                            // blockSize: "15px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              initialValuesType5,
                              request,
                              "accepted"
                            )
                          }
                        >
                          <GreenTick />
                        </button>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            paddingLeft: "200px",
                          }}
                          onClick={() =>
                            handleAnswerRequest(
                              { response: "" },
                              request,
                              "rejected"
                            )
                          }
                        >
                          <RedX />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <Modal fields={fieldsType} title={modalTitle} type={"add"} />
      </div>
    </>
  );
};
