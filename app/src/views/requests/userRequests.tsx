import React, { useState } from "react";

import { Modal } from "../../components/modals/modalForm";
import { modalOperation } from "../../utils";
import * as producers from "./producers";
// import { toast } from "react-toastify";
import { GreenTick } from "../../assets/icons/greenTick";
import { RedX } from "../../assets/icons/redX";
import "./style.css";

export const UserRequests: view = ({
  user = observe.user,
  updateModalFormData = update.modal.formData,
  updateIsModalOpen = update.modal.isOpen,
  requests = observe.requests.content,
  getUsers = get.users,
}) => {
  console.log(">>>user: ", user);
  console.log(">>>requests: ", requests);
  const usersState = getUsers.value();
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
  // const fieldsType5: any = [];

  const initialValuesType1 = {
    requestType: 1,
    email1: "",
    email2: "",
  };
  const initialValuesType2 = { requestType: 2 };
  const initialValuesType3 = { requestType: 3 };
  const initialValuesType4 = { requestType: 4 };
  // const initialValuesType5 = { requestType: 5 };

  const handleMakeRequest = (initialValues: any) => {
    updateModalFormData.set(initialValues);
    console.log(">>>initialValues: ", initialValues);
    setRequestType(initialValues.requestType);
    updateIsModalOpen.set(true);
    modalOperation("modalForm", "show");
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
    fieldsType = fieldsType3;
    modalTitle = "Cerere stergere elev";
  }
  // else if (requestType === 5) {
  //   fieldsType = fieldsType3;
  //   modalTitle = "Cerere stergere profesor";
  // }

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
      {user.role !== "student" && user.role !== "teacher" &&(
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
      {/* <div className="request">
        <p>
          Pentru cererea de stergere a rolului de profesor, completati
          formularul urmator:
        </p>
        <button
          className="btn btn-primary"
          onClick={() => handleMakeRequest(initialValuesType5)}
        >
          Cerere stergere rol profesor
        </button>
      </div> */}
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
                      Cerere de tipul {request.type} de la {email}{" "}
                      {`(${lastName} ${firstName})`} in asteptare
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
                  <p>
                    Respinsa: Cerere de tipul {request.type} de la {email}{" "}
                    {`(${lastName} ${firstName})`}
                  </p>
                  <p>Motiv respingere: {request.response}</p>
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
                      Cerere de tipul {request.type} de la {email}{" "}
                      {`(${lastName} ${firstName})`}
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
