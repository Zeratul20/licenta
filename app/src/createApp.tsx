import { engine, producers, pathFn } from "@c11/engine.runtime";
import { render } from "@c11/engine.react";
import { App } from "./App";

const state: State = {
  user: {},
  isLogoutPressed: false,
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
};

export const createApp = () => {
  const app = engine({
    state,
    use: [render(<App />, "#app")],
  });

  return app;
};
