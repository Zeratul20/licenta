import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import "./signup.css";
import { Form } from "../../components/form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SchoolEnteringIcon from "../../assets/img/school-entering.jpg";
import SignUpIcon from "../../assets/img/sign-up.png";

export const SignUp = () => {
  const [data, setData]: any = useState({});
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  let userAlreadyExists = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isButtonPressed) {
      if(!data.email || !data.password || !data.firstName || !data.lastName || !data.phoneNumber) {
        toast.error("Toate câmpurile sunt obligatorii", {
          position: "top-left",
        });
        setIsButtonPressed(false);
        return;
      }
      axios
        .post("http://localhost:5000/api/users/signUp", data)
        .then((response) => {
          console.log(response);
          navigate("/login");
        })
        .catch((error) => {
          // console.log(error);
          const message: string = error.response.data;
          console.log(message);
          if (message.includes("lastName")) {
            toast.error("Nume de familie invalid", {
              position: "top-left",
            });
          } else if (message.includes("firstName")) {
            toast.error("Prenume invalid", {
              position: "top-left",
            });
          } else if (message.includes("email")) {
            toast.error("Email invalid", {
              position: "top-left",
            });
          } else if (message.includes("password")) {
            toast.error("Parolă invalidă", {
              position: "top-left",
            });
          } else if (message.includes("phoneNumber")) {
            toast.error("Număr de telefon invalid", {
              position: "top-left",
            });
          } else {
            toast.error("Utilizator deja înregistrat", {
              position: "top-left",
            });
          }
        });
      setIsButtonPressed(false);
    }
  }, [isButtonPressed, data]);

  const fields = [
    {
      field: "lastName",
      label: "Nume",
      className: "form-floating mb-3 col-md-6",
      placeholder: "Popescu",
      type: "text",
    },
    {
      field: "firstName",
      label: "Prenume",
      className: "form-floating mb-3 col-md-6",
      placeholder: "Ion",
      type: "text",
    },
    {
      field: "email",
      label: "E-mail",
      className: "form-floating mb-3 col-md-6",
      placeholder: "nume@exemplu.com",
      type: "email",
    },
    {
      field: "password",
      label: "Parola",
      className: "form-floating mb-3 col-md-6",
      placeholder: "",
      type: "password",
    },
    {
      field: "phoneNumber",
      label: "Număr de telefon",
      className: "form-floating mb-3 col-md-6",
      placeholder: "07********",
      type: "text",
    },
  ];

  if (!isButtonPressed) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <img
            src={SchoolEnteringIcon}
            style={{
              width: "50%",
              height: "auto",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.5)",
              border: "5px solid #989796",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f0f0f0",
            }}
          >
            <img
              src={SignUpIcon}
              style={{
                width: "30%",
                height: "auto",
                display: "block",
                marginLeft: "200px",
                marginRight: "auto",
                flexDirection: "column",
              }}
            />
            <h2
              style={{
                justifyContent: "center",
                textAlign: "center",
                paddingTop: "25px",
              }}
            >
              <b>Înregistrare</b>
            </h2>
            <div
              className="container"
              style={{
                height: "auto",
                paddingTop: "25px",
                // paddingLeft: "50px",
                flexDirection: "column",
                paddingBottom: "10px",
              }}
            >
              <Form
                fields={fields}
                setData={setData}
                buttonMessage={"Înregistrare"}
                buttonWidth={"600px"}
                setIsButtonPressed={setIsButtonPressed}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};
