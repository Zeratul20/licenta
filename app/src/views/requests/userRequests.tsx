import React, { useState } from "react";

import { Modal } from "../../components/modals/modalForm";
import { modalOperation } from "../../utils";
import * as producers from "./producers";
// import { toast } from "react-toastify";
import { GreenTick } from "../../assets/icons/greenTick";
import { RedX } from "../../assets/icons/redX";
import "./style.css";
import { getClassName } from "../../utils";

const getRequestFromType = (type: string) => {
  switch (type) {
    case "1":
      return "parinte -> elev";
    case "2":
      return "creare rol elev";
    case "3":
      return "creare rol profesor";
    case "4":
      return "stergere elev";
    case "5":
      return "mutare elev";
    // case 5:
    //   return "Cerere stergere profesor";
    default:
      return "";
  }
};

export const UserRequests: view = ({
  user = observe.user,
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
  requests = observe.requests.content,
  getUsers = get.users,
  getClasses = get.classes,
}) => {
  console.log(">>>user: ", user);
  console.log(">>>requests: ", requests);
  const usersState = getUsers.value();
  const classesState = getClasses.value();
  const [requestType, setRequestType] = useState(0);
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
  const fieldsType4: any = [];
  const fieldsType5: any = [
    {
      field: "className",
      label: "Clasa",
      className: "form-floating mb-3 col-md-12",
      placeholder: "5A",
      type: "text",
    },
  ];

  const initialValuesType1 = {
    requestType: 1,
    email1: "",
    email2: "",
  };
  const initialValuesType2 = { requestType: 2 };
  const initialValuesType3 = { requestType: 3 };
  const initialValuesType4 = { requestType: 4 };
  const initialValuesType5 = { requestType: 5, className: "" };

  const handleMakeRequest = (initialValues: any) => {
    updateModalFormData.set(initialValues);
    console.log(">>>initialValues: ", initialValues);
    setRequestType(initialValues.requestType);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
  };

  const getClassNameForRequest5 = (request: any) => {
    if (request.type !== "5") return null;
    const { classId } = request;
    const className = classesState.find(
      (classItem: any) => classItem.classId === classId
    )?.name;
    return (
      <span>
        la clasa <i>{getClassName(className)}</i>
      </span>
    );
  };

  let fieldsType = [];
  let modalTitle = "";
  if (requestType === 1) {
    fieldsType = fieldsType1;
    modalTitle = "Cerere parinte -> elev";
  } else if (requestType === 2) {
    fieldsType = fieldsType2;
    modalTitle = "Cerere elev";
  } else if (requestType === 3) {
    fieldsType = fieldsType3;
    modalTitle = "Cerere profesor";
  } else if (requestType === 4) {
    fieldsType = fieldsType4;
    modalTitle = "Cerere stergere elev";
  } else if (requestType === 5) {
    fieldsType = fieldsType5;
    modalTitle = "Cerere mutare elev";
  }

  const getUserDataById = (userId: any) => {
    const data = usersState.find((user: any) => user.userId === userId);
    if (!data) {
      return {};
    }
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  };

  const pendingRequests = requests.filter(
    (request: any) => request.status === "pending"
  );

  const acceptedRequests = requests.filter(
    (request: any) => request.status === "accepted"
  );

  const rejectedRequests = requests.filter(
    (request: any) => request.status === "rejected"
  );

  return (
    <>
      <h2 style={{ paddingLeft: "100px", paddingTop: "40px" }}>
        <span>
          <i>Tipuri de cereri</i>
        </span>
      </h2>
      {user.role !== "student" && (
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
        </div>
      )}
      {user.role === "user" && (
        <div className="request">
          <p>
            Pentru cererea de asignare a rolului de elev, completati formularul
            urmator:
          </p>
          <button
            className="btn btn-primary"
            onClick={() => handleMakeRequest(initialValuesType2)}
          >
            Cerere rol elev
          </button>
        </div>
      )}
      {user.role !== "student" && user.role !== "teacher" && (
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
        </div>
      )}
      {user.role === "student" && (
        <div className="request">
          <p>
            Pentru cererea de stergere a rolului de elev, completati formularul
            urmator:
          </p>
          <button
            className="btn btn-primary"
            onClick={() => handleMakeRequest(initialValuesType4)}
          >
            Cerere stergere rol elev
          </button>
        </div>
      )}
      {user.role === "student" && (
        <div className="request">
          <p>
            Pentru cererea de mutare a elevului in alta clasa, completati
            formularul urmator:
          </p>
          <button
            className="btn btn-primary"
            onClick={() => handleMakeRequest(initialValuesType5)}
          >
            Cerere mutare elev
          </button>
        </div>
      )}
      <Modal fields={fieldsType} title={modalTitle} type={"add"} />
      {pendingRequests && pendingRequests.length > 0 && (
        <>
          <h2 style={{ paddingLeft: "100px", paddingTop: "40px" }}>
            <span>
              <i>Cereri in asteptare</i>
            </span>
          </h2>
          <div>
            {pendingRequests.map((request: any) => {
              const { email, firstName, lastName } = getUserDataById(
                request.userId
              );
              return (
                <div key={request.requestId}>
                  <ul>
                    <li>
                      Cerere de tipul <b>{getRequestFromType(request.type)}</b> {" "}
                      {request.type === "5" && getClassNameForRequest5(request)}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
      {rejectedRequests && rejectedRequests.length > 0 && (
        <>
          <h2 style={{ paddingLeft: "100px", paddingTop: "40px" }}>
            <span>
              <i>Cereri respinse</i>
            </span>
          </h2>
          <div>
            {rejectedRequests.map((request: any) => {
              const { email, firstName, lastName } = getUserDataById(
                request.userId
              );
              return (
                <div key={request.requestId}>
                  <ul>
                    <li>
                      <p>
                        Cerere de tipul{" "}
                        <b>{getRequestFromType(request.type)}</b> {" "}
                        {request.type === "5" && getClassNameForRequest5(request)}
                      </p>
                      <p style={{ paddingLeft: "30px" }}>
                        Motiv respingere: {request.response}
                      </p>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
      {acceptedRequests && acceptedRequests.length > 0 && (
        <>
          <h2 style={{ paddingLeft: "100px", paddingTop: "40px" }}>
            <span>
              <i>Cereri acceptate</i>
            </span>
          </h2>
          <div>
            {acceptedRequests.map((request: any) => {
              const { email, firstName, lastName } = getUserDataById(
                request.userId
              );
              return (
                <div key={request.requestId}>
                  <ul>
                    <li>
                      Cerere de tipul <b>{getRequestFromType(request.type)}</b>{" "}
                      {request.type === "5" && getClassNameForRequest5(request)}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
