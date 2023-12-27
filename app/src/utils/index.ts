import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const bootstrap = require("bootstrap");

export const modalOperation = (name: string, operation: string) => {
  const modal = new bootstrap.Modal(document.getElementById(name), {
    backdrop: true,
    keyboard: true,
    focus: true,
  });
  if (operation === "hide") modal.hide();
  else modal.show();
};

export const getUserData = (users: any, userId: any) => {
  console.log("userId in getUserData", userId);
  return users.find((user: any) => user.userId === userId);
};

export const getTeacherData = (teachers: any, teacherId: any) => {
  console.log("teacherId in getTeacherData", teacherId);
  console.log("teachers in getTeacherData", teachers);
  return teachers.find((teacher: any) => teacher.teacherId === teacherId);
};

export const getSubjectData = (subjects: any, subjectId: any) => {
  return subjects.find((subject: any) => subject.subjectId === subjectId);
};
