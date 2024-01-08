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
  schedules: [],
  users: [],
  isStateInitiated: false,
};

export const createApp = () => {
  const app = engine({
    state,
    use: [render(<App />, "#app")],
  });

  return app;
};
