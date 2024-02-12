import axios from "axios";

export const initState: producer = ({
  updateUser = update.user,
  updateTeachers = update.teachers,
  updateSubjects = update.subjects,
  updateClasses = update.classes,
  updateSchedules = update.schedules,
  updateUsers = update.users,
  updateStudents = update.students,
  updateParents = update.parents,
  updateIsStateInitiated = update.isStateInitiated,
}) => {
  const userId = localStorage.getItem("userIdLicenta");

  let cnt = 0;

  const cntMaxVal = 7;

  const getUsers = async () => {
    const { data } = await axios.get("http://localhost:5000/api/users");
    updateUsers.set(data);
    cnt++;
  };
  getUsers();

  const getUser = async () => {
    if (!userId) {
      cnt++;
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      updateUser.set(data);
    } catch (e) {
      console.log("error", e);
      updateUser.set({});
    }
    cnt++;
  };
  getUser();

  const getTeachers = async () => {
    const { data } = await axios.get("http://localhost:5000/api/teachers");
    updateTeachers.set(data);
    cnt++;
  };
  getTeachers();

  const getSubjects = async () => {
    const { data } = await axios.get("http://localhost:5000/api/subjects");
    updateSubjects.set(data);
    cnt++;
  };
  getSubjects();

  const getClasses = async () => {
    const { data } = await axios.get("http://localhost:5000/api/classes");
    updateClasses.set(data);
    console.log(">>> initState classes", data);
    cnt++;
  };
  getClasses();

  const getStudents = async () => {
    const { data } = await axios.get("http://localhost:5000/api/students");
    updateStudents.set(data);
    cnt++;
  }
  getStudents();

  const getParents = async () => {
    const { data } = await axios.get("http://localhost:5000/api/parents");
    updateParents.set(data);
    cnt++;
  }
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
