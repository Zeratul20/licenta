import React from "react";
import { Table } from "./table";
import { ClassDropdown } from "../../components/inputs/classDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

export const Catalog: view = ({
  user = observe.user,
  getClasses = get.classes,
  getTeachers = get.teachers,
  updateCatalogueTeacher = update.catalogue.teacher,
  updateCatalogue = update.catalogue.catalogue,
  updateCatalogueClass = update.catalogue.class,
  catalogueClass = observe.catalogue.class,
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
        <ClassDropdown classes={teacherClasses} handleClick={handleClick} />
        {catalogueClass && <Table />}
      </div>
    );
  }
  return (
    <div className="object-fit-cover">
      <h1>Catalog</h1>
      <Table />
    </div>
  );
};
