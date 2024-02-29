import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import "./signup.css";
import { Form } from "../../components/form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SignUp = () => {
  const [data, setData]: any = useState({});
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [errorSingUp, setErrorSignUp] = useState(false);

  let userAlreadyExists = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (isButtonPressed) {
      axios
        .post("http://localhost:5000/api/users/signUp", data)
        .then((response) => {
          console.log(response);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error("User already exists", {
              position: "top-left",
            });
          } else {
            toast.error("Something went wrong. Please try again", {
              position: "top-left",
            });
          }
          setErrorSignUp(true);
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
      label: "Numar de telefon",
      className: "form-floating mb-3 col-md-6",
      placeholder: "07********",
      type: "text",
    },
  ];

  if (!isButtonPressed) {
    return (
      <div
        className="container"
        style={{
          height: "600px",
          paddingTop: "100px",
          paddingLeft: "150px",
          paddingRight: "150px",
        }}
      >
        <Form
          fields={fields}
          setData={setData}
          buttonMessage={"Sign up"}
          setIsButtonPressed={setIsButtonPressed}
        />
      </div>
    );
  }
  if (userAlreadyExists) {
    return (
      <div>
        An account with the username {data.username} already exists. Please
        refresh and choose another username.
      </div>
    );
  }
  if (errorSingUp) {
    return (
      <div>
        You entered an invalid username or password. Please refresh the page and
        try again.
      </div>
    );
  }
  return <div>You have been signed up. </div>;
};
