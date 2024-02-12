import React from "react";
import { Table } from "./table";
import { ClassDropdown } from "../../components/inputs/classDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as producers from "./producers";
import { getClassName } from "../../utils";
import { StudentsDropdown } from "../../components/inputs/studentsDropdown";

export const Catalogue: view = ({
  user = observe.user,
  getClasses = get.classes,
  getTeachers = get.teachers,
  getStudents = get.students,
  getParents = get.parents,
  getUsers = get.users,
  updateCatalogueTeacher = update.catalogue.teacher,
  updateCatalogueClass = update.catalogue.class,
  catalogueClass = observe.catalogue.class,
  updateCatalogueStudent = update.catalogue.student,
}) => {
  console.log(">>>User: ", user);
  if (user.role === "teacher") {
    const teachers = getTeachers.value();
    const classes = getClasses.value();
    const teacher = teachers.find(
      (teacher: any) => teacher.userId === user.userId
    );
    const teacherClassesId = teacher.classes;
    const teacherClasses = classes.filter((classEl: any) =>
      teacherClassesId.includes(classEl.classId)
    );
    console.log(">>>Teacher: ", teacher);
    console.log(">>>Classes: ", classes);
    updateCatalogueTeacher.set(teacher);
    const handleClick = (classId: string) => {
      console.log(classId);
      const classFound = teacherClasses.find(
        (classEl: any) => classEl.classId === classId
      );
      updateCatalogueClass.set(classFound);
    };
    return (
      <div className="object-fit-cover">
        <h1>Catalog</h1>
        {catalogueClass && (
          <h2 style={{ textAlign: "center" }}>
            Clasa {getClassName(catalogueClass.name)}
          </h2>
        )}
        <ClassDropdown classes={teacherClasses} handleClick={handleClick} />
        {catalogueClass && <Table />}
      </div>
    );
  }

  if (user.role === "director") {
    const classes = getClasses.value();
    const handleClick = (classId: string) => {
      console.log(classId);
      const classFound = classes.find(
        (classEl: any) => classEl.classId === classId
      );
      updateCatalogueClass.set(classFound);
    };
    return (
      <div className="object-fit-cover">
        <h1>Catalog</h1>
        {catalogueClass && (
          <h2 style={{ textAlign: "center" }}>
            Clasa {getClassName(catalogueClass.name)}
          </h2>
        )}
        <ClassDropdown classes={classes} handleClick={handleClick} />
        {catalogueClass && <Table />}
      </div>
    );
  }

  if (user.role === "student") {
    const classes = getClasses.value();
    const students = getStudents.value();
    const student = students.find(
      (student: any) => student.userId === user.userId
    );
    updateCatalogueStudent.set(student);
    const classFound = classes.find(
      (classEl: any) => classEl.classId === student.classId
    );
    updateCatalogueClass.set(classFound);

    return (
      <div className="object-fit-cover">
        <h1>Catalog</h1>
        <h2 style={{ textAlign: "center" }}>
          Clasa {getClassName(classFound.name)}
        </h2>
        <Table />
      </div>
    );
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
  const classesState = getClasses.value();
  const studentsState = getStudents.value();
  const parentFound = parentsState.find(
    (parent: any) => parent.userId === user.userId
  );
  if (!parentFound) return null;

  const handleClick = (studentId: string) => {
    const studentFound = studentsState.find(
      (student: any) => student.studentId === studentId
    );
    updateCatalogueStudent.set(studentFound);
    const classFound = classesState.find(
      (classEl: any) => classEl.classId === studentFound.classId
    );
    updateCatalogueClass.set(classFound);
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
    <div className="object-fit-cover">
      <h1>Catalog</h1>
      <StudentsDropdown students={students} handleClick={handleClick} />
      {catalogueClass && (
        <h2 style={{ textAlign: "center" }}>
          Clasa {getClassName(catalogueClass.name)}
        </h2>
      )}
      <Table />
    </div>
  );
};

Catalogue.producers(Object.values(producers));
