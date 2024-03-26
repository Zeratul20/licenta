import { engine, producers, pathFn } from "@c11/engine.runtime";
import { render } from "@c11/engine.react";
import { App } from "./App";

const state: State = {
  user: {},
  isLogoutPressed: false,
  isTokenExpired: false,
  schedule: {
    class: null,
    schedule: null,
    teacher: null,
    student: null,
    isStateInitiated: false,
  },
  catalogue: {
    class: null,
    catalogue: null,
    teacher: null,
    student: null,
    absences: [],
    currentPage: 1,
    isStateInitiated: false,
  },
  modal: {
    isOpen: false,
    formData: {},
    isSavePressed: false,
  },
  teachers: [],
  subjects: [],
  classes: [],
  students: [],
  schedules: [],
  users: [],
  parents: [],
  isStateInitiated: false,
  messages: {
    content: [],
    isStateInitiated: false,
    currentPage: 1,
  },
  requests: {
    content: [],
    isStateInitiated: false,
  },
  classDetails: {
    teachers: [],
    class: null,
    isStateInitiated: false,
  },
  classesDetails: {
    nrOfStudents: [],
    isStateInitiated: false,
  },
  reports: {
    content: [],
    student: null,
    isStateInitiated: false,
  },
};

export const createApp = () => {
  const app = engine({
    state,
    use: [render(<App />, "#app")],
  });

  return app;
};
