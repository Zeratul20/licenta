import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "./table";

export const Schedule: view = ({
  user = observe.user,
  getClasses = get.classes,
  getSchedules = get.schedules,
  updateScheduleClass = update.schedule.class,
  updateSchedule = update.schedule.schedule,
}) => {
  const schedules = getSchedules.value();
  if (user.role === "director") {
    const classes = getClasses.value();
    const handleClick = (classId: string) => {
      console.log(classId);
      const classFound = classes.find(
        (classEl: any) => classEl.classId === classId
      );
      const scheduleFound = schedules.find(
        (schedule: any) => schedule.classId === classId
      );
      updateSchedule.set(scheduleFound);
      updateScheduleClass.set(classFound);
    };
    return (
      <div>
        <h1>Orar</h1>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Clasa
          </button>
          <ul className="dropdown-menu">
            {classes.map((classEl: any) => {
              return (
                <li>
                  <button
                    key={classEl.classId}
                    className="dropdown-item"
                    onClick={() => handleClick(classEl.classId)}
                  >
                    {classEl.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <Table />
      </div>
    );
  }
  return (
    <div>
      <h1>Orar</h1>
      <Table />
    </div>
  );
};
