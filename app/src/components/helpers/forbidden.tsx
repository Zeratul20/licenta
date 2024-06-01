import React from "react";
import ForbiddenImg from "../../assets/img/403.jpg";

export const Forbidden = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={ForbiddenImg}
        alt="Interzis"
        style={{ height: "500px", width: "700px" }}
      />
      <p style={{fontFamily: "cursive", fontSize: "30px", color: "InfoText"}}>
        Nu aveți permisiunea necesară pentru a accesa această pagină.
      </p>
    </div>
  );
};
