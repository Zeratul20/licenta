import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const bootstrap = require("bootstrap");

export const makeApi = () => {
  const token = localStorage.getItem("tokenLicenta");
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });
  console.log(">>> token in utils", token);
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return api;
};

export const isTokenValid = () => {
  const token = localStorage.getItem("tokenLicenta");
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;
    if (decodedToken.exp * 1000 < Date.now()) return false;
    return true;
  } catch (e) {
    return false;
  }
};

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

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortedClassesByName = (classes: any) => {
  return classes.sort((a: any, b: any) => {
    console.log(">>>a.name", a.name);
    if (a.name.length < b.name.length) {
      console.log(
        ">>>a.name.length < b.name.length",
        a.name.length,
        b.name.length
      );
      return -1;
    }
    if (a.name.length > b.name.length) {
      console.log(
        ">>>a.name.length > b.name.length",
        a.name.length,
        b.name.length
      );
      return 1;
    }
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};

export const getClassName = (className: any) => {
  switch (className) {
    case "5A":
      return "a V-a A";
    case "5B":
      return "a V-a B";
    case "6A":
      return "a VI-a A";
    case "6B":
      return "a VI-a B";
    case "7A":
      return "a VII-a A";
    case "7B":
      return "a VII-a B";
    case "8A":
      return "a VIII-a A";
    case "8B":
      return "a VIII-a B";
    case "9A":
      return "a IX-a A";
    case "9B":
      return "a IX-a B";
    case "9C":
      return "a IX-a C";
    case "10A":
      return "a X-a A";
    case "10B":
      return "a X-a B";
    case "10C":
      return "a X-a C";
    case "11A":
      return "a XI-a A";
    case "11B":
      return "a XI-a B";
    case "11C":
      return "a XI-a C";
    case "12A":
      return "a XII-a A";
    case "12B":
      return "a XII-a B";
    case "12C":
      return "a XII-a C";
    default:
      return "";
  }
};

export const getShortClassName = (className: any) => {
  switch (className) {
    case "5A":
      return "VA";
    case "5B":
      return "VB";
    case "6A":
      return "VIA";
    case "6B":
      return "VIB";
    case "7A":
      return "VIIA";
    case "7B":
      return "VIIB";
    case "8A":
      return "VIIIA";
    case "8B":
      return "VIIIB";
    case "9A":
      return "IXA";
    case "9B":
      return "IXB";
    case "9C":
      return "IXC";
    case "10A":
      return "XA";
    case "10B":
      return "XB";
    case "10C":
      return "XC";
    case "11A":
      return "XIA";
    case "11B":
      return "XIB";
    case "11C":
      return "XIC";
    case "12A":
      return "XIIA";
    case "12B":
      return "XIIB";
    case "12C":
      return "XIIC";
    default:
      return "";
  }
};
