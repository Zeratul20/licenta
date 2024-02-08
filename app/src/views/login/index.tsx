import React, { useState, useEffect } from "react";
// import "./login.css";
import axios from "axios";
import { Form } from "../../components/form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login: view = ({ updateUser = update.user }: any) => {
  const [data, setData]: any = useState({});
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const navigate = useNavigate();

  const { email, password } = data;

  useEffect(() => {
    if (isButtonPressed) {
      console.log(">>>data in login: ", data)
      axios
        .post(`http://localhost:5000/api/users/login/${email}`, { password })
        .then((response: any) => {
          console.log(response);
          const {data} = response;
          updateUser.set(data);
          localStorage.setItem("userIdLicenta", data.userId);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error("Numele de utilizator sau parola nu sunt corecte!", {
              position: "top-left",
            });
          } else {
            toast.error("Va rugam incercati din nou!", {
              position: "top-left",
            });
          }
        });
      setIsButtonPressed(false);
    }
  });

  const fields = [
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
  ];

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
        buttonMessage={"Log in"}
        setIsButtonPressed={setIsButtonPressed}
      />
    </div>
  );
};
