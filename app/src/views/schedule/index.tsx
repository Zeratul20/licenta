import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "./table";

export const Schedule: view = ({ user = observe.user }) => {
  const [isEditPressed, setIsEditPressed] = useState(false);
  if (user.role === "director") {
    const handleEditSchedule = () => {
      setIsEditPressed(true);
    };
    return (
      <div>
        <h1>Orar director</h1>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleEditSchedule}
        >
          Editare Orar
        </button>
      </div>
    );
  }
  return (
    <div>
      <h1>Orar student</h1>
      <Table />
    </div>
  );
};
