import React, { useState, useEffect } from "react";
// import "./login.css";
import axios from "axios";
import { Form } from "../../components/form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LogInIcon from "../../assets/img/login.jpg";
import ProfileIcon from "../../assets/img/profile.png";

export const Login: view = ({
  updateUser = update.user,
  updateIsStateInitiated = update.isStateInitiated,
}: any) => {
  const [data, setData]: any = useState({});
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const navigate = useNavigate();

  const { email, password } = data;

  useEffect(() => {
    if (isButtonPressed) {
      console.log(">>>data in login: ", data);
      axios
        .post(`http://localhost:5000/api/users/login/${email}`, { password })
        .then((response: any) => {
          console.log(response);
          const { data } = response;
          updateUser.set(data);
          localStorage.setItem("userIdLicenta", data.userId);
          localStorage.setItem("tokenLicenta", data.token);
          updateIsStateInitiated.set(false);
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
      className: "form-floating mb-3 col-md-8 pb-4",
      placeholder: "nume@exemplu.com",
      type: "email",
    },
    {
      field: "password",
      label: "Parola",
      className: "form-floating mb-3 col-md-8",
      placeholder: "",
      type: "password",
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src={LogInIcon}
          style={{
            width: "47%",
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
            src={ProfileIcon}
            style={{
              width: "30%",
              height: "auto",
              display: "block",
              marginLeft: "175px",
              marginRight: "auto",
              flexDirection: "column",
            }}
          />
          <h2
            style={{
              justifyContent: "center",
              paddingLeft: "160px",
              paddingTop: "25px",
            }}
          >
            <b>Autentificare</b>
          </h2>
          <div
            className="container"
            style={{
              height: "auto",
              paddingTop: "25px",
              paddingLeft: "100px",
              flexDirection: "column",
              paddingBottom: "20px",
            }}
          >
            <Form
              fields={fields}
              setData={setData}
              buttonMessage={"Autentificare"}
              buttonWidth={"340px"}
              setIsButtonPressed={setIsButtonPressed}
            />
          </div>
        </div>
      </div>
    </>
  );
};
