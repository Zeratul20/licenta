import React from "react";
import NotFoundImg from "../../assets/img/404.jpg";

export const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={NotFoundImg}
        alt="Interzis"
        style={{ height: "500px", width: "700px" }}
      />
    </div>
  );
};
