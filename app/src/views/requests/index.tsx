import React from "react";
import { Modal } from "../../components/modals/modalForm";
import { modalOperation } from "../../utils";
import axios from "axios";
import * as producers from "./producers";
import { toast } from "react-toastify";

// type 1 -> parent to student
// type 2 -> student role
// type 3 -> teacher role

export const Requests: view = ({
  user = observe.user,
  updateModalFormData = update.modal.formData,
  isModalSavePressed = observe.modal.isSavePressed,
  updateIsModalSavePressed = update.modal.isSavePressed,
  updateIsModalOpen = update.modal.isOpen,
  getModalFormData = get.modal.formData,
  requests = observe.requests.content,
  updateRequests = update.requests.content,
  getStudents = get.students,
  getUsers = get.users,
}) => {
  console.log(">>>user: ", user);
  const modalFormData = getModalFormData.value();
  const studentsState = getStudents.value();
  const usersState = getUsers.value();
  const fieldsType1 = [
    {
      field: "email1",
      label: "E-mail Elev1",
      className: "form-floating mb-3 col-md-12",
      placeholder: "name@example.com",
      type: "email",
    },
    {
      field: "email2",
      label: "E-mail Elev2",
      className: "form-floating mb-3 col-md-12",
      placeholder: "name@example.com",
      type: "email",
    },
  ];
  const fieldsType2: any = [];
  const fieldsType3: any = [];

  const initialValuesType1 = {
    type: 1,
    email1: "",
    email2: "",
  };
  const initialValuesType2 = { type: 2 };
  const initialValuesType3 = { type: 3 };

  const handleMakeRequest = (initialValues: any) => {
    updateModalFormData.set(initialValues);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  if (isModalSavePressed) {
    console.log(">>>modalFormData: ", modalFormData);
    if (modalFormData.type === 1) {
      const newRequest: any = {};
      newRequest.type = "1";
      newRequest.students = [];
      const userId1 = usersState.find(
        (user: any) => user.email === modalFormData.email1
      )?.userId;
      if (!userId1) {
        toast.error("Elevul 1 nu a fost gasit", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const studentId1 = studentsState.find(
        (student: any) => student.userId === userId1
      )?.studentId;
      if (!studentId1) {
        toast.error("Elevul 1 nu a fost gasit", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      newRequest.students.push(studentId1);
      if (modalFormData.email2) {
        const userId2 = usersState.find(
          (user: any) => user.email === modalFormData.email2
        )?.userId;
        if (!userId2) {
          toast.error("Elevul 2 nu a fost gasit", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        const studentId2 = studentsState.find(
          (student: any) => student.userId === userId2
        )?.studentId;
        if (!studentId2) {
          toast.error("Elevul 2 nu a fost gasit", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        newRequest.students.push(studentId2);
      }
      newRequest.userId = user.userId;
      newRequest.status = "pending";
      try {
        axios.post("http://localhost:5000/api/requests", newRequest);
        updateRequests.set([...requests, newRequest]);
      } catch (error) {
        console.log(">>>error: ", error);
      }
      updateRequests.set([...requests, newRequest]);
    }
    updateIsModalSavePressed.set(false);
  }

  return (
    <>
      <h1>Cereri</h1>
      {user.role !== "director" && (
        <>
          <h2>Cereri in asteptare:</h2>
          <div>
            {requests.map((request: any) => {
              return (
                <div key={request.requestId}>
                  <p>
                    Cerere de tipul {request.type} de la {request.userId} in
                    asteptare
                  </p>
                </div>
              );
            })}
          </div>
          <div className="request">
            <p>
              Pentru cererea de asignare a parintelui cu un elev, completati
              formularul urmator:
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleMakeRequest(initialValuesType1)}
            >
              Cerere parinte {"->"} elev
            </button>
            <Modal fields={fieldsType1} title={"Adauga ora"} type={"add"} />
          </div>
          <div className="request">
            <p>
              Pentru cererea de asignare a rolului de elev, completati
              formularul urmator:
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleMakeRequest(initialValuesType2)}
            >
              Cerere rol elev
            </button>
            <Modal fields={fieldsType2} title={"Adauga ora"} type={"add"} />
          </div>
          <div className="request">
            <p>
              Pentru cererea de asignare a rolului de profesor, completati
              formularul urmator:
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleMakeRequest(initialValuesType3)}
            >
              Cerere rol profesor
            </button>
            <Modal fields={fieldsType3} title={"Adauga ora"} type={"add"} />
          </div>
        </>
      )}
      {user.role === "director" && (
        <>
          <h2>Cereri in asteptare:</h2>
          <div>
            {requests.map((request: any) => {
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
                  <div key={request.requestId}>
                    <div
                      className="card border-dark mb-5 w-50"
                      style={{ marginLeft: "200px", zIndex: 1 }}
                    >
                      <div
                        className="card-header bg-transparent border-dark"
                        // style={{ display: "flex" }}
                      >
                        Cerere de tipul parinte {`-> elev(i)`}
                      </div>
                      <div className="card-body">
                        {request.type == "1" && (
                          <div>
                            <div className="card-title">
                              Parintele {parentEmail}{" "}
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
                                  <>
                                    <p>
                                      {studentEmail}{" "}
                                      {`(${studentLastName} ${studentFirstName})`}
                                    </p>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              if (request.type == "2") {
                const dataForUser = usersState.find(
                  (userState: any) => userState.userId === request.userId
                );
                const { email, firstName, lastName } = dataForUser;
                return (
                  <div key={request.requestId}>
                    <div
                      className="card border-dark mb-5 w-50"
                      style={{ marginLeft: "200px", zIndex: 1 }}
                    >
                      <div
                        className="card-header bg-transparent border-dark"
                        // style={{ display: "flex" }}
                      >
                        Cerere de tipul elev
                      </div>
                      <div className="card-body">
                        {request.type == "2" && (
                          <div>
                            <div className="card-title">
                              Utilizatorul {email}{" "}
                              {`(${lastName} ${firstName})`}
                              doreste sa isi asigneze rolul de elev.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

Requests.producers(Object.values(producers));
