import React, { useState } from "react";
import { Table } from "./table";
import { ClassDropdown } from "../../components/inputs/classDropdown";
import { StudentsDropdown } from "../../components/inputs/studentsDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as producers from "./producers";
import { Loader } from "../../components/helpers/loader";
import { sortedClassesByName } from "../../utils";
import ScheduleImg from "../../assets/img/schedule.png";
import "../../style.css";
import "./style.css";

export const Schedule: view = ({
  user = observe.user,
  getClasses = get.classes,
  getStudents = get.students,
  getParents = get.parents,
  getUsers = get.users,
  schedules = observe.schedules,
  updateScheduleClass = update.schedule.class,
  updateSchedule = update.schedule.schedule,
  updateScheduleStudent = update.schedule.student,
  isStateInitiated = observe.schedule.isStateInitiated,
}) => {
  if (!isStateInitiated) return <Loader />;
  // const schedules = getSchedules.value();
  if (user.role === "director") {
    const classes = getClasses.value();
    const sortedClasses = sortedClassesByName(classes);
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
      <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
        <h1 className="font-family">Orar</h1>
        <ClassDropdown classes={sortedClasses} handleClick={handleClick} />
        <Table />
      </div>
    );
  }

  if (user.role === "teacher") {
    return (
      <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
        <h1 className="font-family">Orar profesor</h1>
        <Table />
      </div>
    );
  }

  if (user.role === "student") {
    const students = getStudents.value();
    const classes = getClasses.value();
    const student = students.find(
      (student: any) => student.userId === user.userId
    );
    const studentClass = classes.find(
      (classEl: any) => classEl.classId === student.classId
    );
    const scheduleFound = schedules.find(
      (schedule: any) => schedule.classId === student.classId
    );
    updateSchedule.set(scheduleFound);
    updateScheduleClass.set(studentClass);
    return (
      <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
        <h1 className="font-family">Orar</h1>
        <Table />
      </div>
    );
    // return (
    //   <div className="image-container">
    //     <img
    //       src={ScheduleImg}
    //       alt="Schedule"
    //       style={{
    //         filter: "blur(1px)",
    //         height: "auto",
    //         width: "auto",
    //         position: "relative",

    //         /* Center and scale the image nicely */
    //         backgroundPosition: "center",
    //         backgroundRepeat: "no-repeat",
    //         backgroundSize: "cover",
    //       }}
    //     />
    //     <div className="overlay-text">
    //       <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
    //         <h1 className="font-family">Orar</h1>
    //         <Table />
    //       </div>
    //     </div>
    //   </div>
    // );
  }

  const getNameByStudentId = (studentId: string) => {
    const students = getStudents.value();
    const users = getUsers.value();
    const student = students.find(
      (student: any) => student.studentId === studentId
    );
    const user = users.find((user: any) => user.userId === student.userId);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  };

  const parentsState = getParents.value();
  const studentsState = getStudents.value();
  const classesState = getClasses.value();
  const parentFound = parentsState.find(
    (parent: any) => parent.userId === user.userId
  );
  if (!parentFound) return null;
  const handleClick = (studentId: string) => {
    const studentClassId = studentsState.find(
      (student: any) => student.studentId === studentId
    ).classId;
    const classFound = classesState.find(
      (classEl: any) => classEl.classId === studentClassId
    );
    const scheduleFound = schedules.find(
      (schedule: any) => schedule.classId === studentClassId
    );
    const { firstName, lastName } = getNameByStudentId(studentId);
    updateScheduleStudent.set({ studentId, firstName, lastName });
    updateSchedule.set(scheduleFound);
    updateScheduleClass.set(classFound);
  };
  const { students: parentStudents } = parentFound;
  const students: any = [];
  parentStudents.forEach((studentId: string) => {
    const { firstName, lastName } = getNameByStudentId(studentId);
    students.push({
      studentId,
      firstName,
      lastName,
    });
  });
  return (
    <div className="object-fit-cover" style={{ paddingLeft: "20px" }}>
      <h1 className="font-family">Orar</h1>
      <StudentsDropdown students={students} handleClick={handleClick} />
      <Table />
    </div>
  );
};

Schedule.producers(Object.values(producers));
