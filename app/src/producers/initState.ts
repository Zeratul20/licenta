import { makeApi } from "../utils";

export const initState: producer = ({
  updateUser = update.user,
  updateTeachers = update.teachers,
  updateSubjects = update.subjects,
  updateClasses = update.classes,
  updateUsers = update.users,
  updateStudents = update.students,
  updateParents = update.parents,
  isStateInitiated = observe.isStateInitiated,
  updateIsStateInitiated = update.isStateInitiated,
}) => {
  const userId = localStorage.getItem("userIdLicenta");
  if (!userId) {
    updateIsStateInitiated.set(true);
    return;
  }

  const api = makeApi();

  let cnt = 0;

  const cntMaxVal = 7;

  const getUsers = async () => {
    try {
      const { data } = await api.get("/users");
      updateUsers.set(data);
    } catch (e) {
      console.log("error", e);
      updateUsers.set([]);
    }
    cnt++;
  };
  getUsers();

  const getUser = async () => {
    try {
      const { data } = await api.get(`/users/${userId}`);
      updateUser.set(data);
    } catch (e) {
      console.log("error", e);
      updateUser.set({});
    }
    cnt++;
  };
  getUser();

  const getTeachers = async () => {
    try {
      const { data } = await api.get("/teachers");
      updateTeachers.set(data);
    } catch (e) {
      console.log("error", e);
      updateTeachers.set([]);
    }
    cnt++;
  };
  getTeachers();

  const getSubjects = async () => {
    try {
      const { data } = await api.get("/subjects");
      updateSubjects.set(data);
    } catch (e) {
      console.log("error", e);
      updateSubjects.set([]);
    }
    cnt++;
  };
  getSubjects();

  const getClasses = async () => {
    try {
      const { data } = await api.get("/classes");
      updateClasses.set(data);
    } catch (e) {
      console.log("error", e);
      updateClasses.set([]);
    }
    cnt++;
  };
  getClasses();

  const getStudents = async () => {
    try {
      const { data } = await api.get("/students");
      updateStudents.set(data);
    } catch (e) {
      console.log("error", e);
      updateStudents.set([]);
    }
    cnt++;
  };
  getStudents();

  const getParents = async () => {
    try {
      const { data } = await api.get("/parents");
      updateParents.set(data);
    } catch (e) {
      console.log("error", e);
      updateParents.set([]);
    }
    cnt++;
  };
  getParents();

  if (cnt < cntMaxVal) {
    let retries = cntMaxVal;
    while (retries--) {
      console.log("retires, cnt", retries, cnt);
      setTimeout(() => {
        if (cnt === cntMaxVal) {
          updateIsStateInitiated.set(true);
          retries = 0;
        }
      }, 1000 * (retries + 1));
    }
  } else updateIsStateInitiated.set(true);
  return;
};
