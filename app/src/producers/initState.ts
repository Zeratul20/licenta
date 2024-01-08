import axios from "axios";

export const initState: producer = ({
  updateUser = update.user,
  updateTeachers = update.teachers,
  updateSubjects = update.subjects,
  updateClasses = update.classes,
  updateSchedules = update.schedules,
  updateUsers = update.users,
  updateIsStateInitiated = update.isStateInitiated,
}) => {
  const userId = localStorage.getItem("userId");

  let cnt = 0;

  const cntMaxVal = 5;

  const getUsers = async () => {
    const { data } = await axios.get("http://localhost:5000/api/users");
    updateUsers.set(data);
    cnt++;
  };
  getUsers();

  const getUser = async () => {
    if (!userId) return;
    const { data } = await axios.get(
      `http://localhost:5000/api/users/${userId}`
    );
    updateUser.set(data);
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
    cnt++;
  };
  getClasses();

  const getSchedules = async () => {
    const { data } = await axios.get("http://localhost:5000/api/schedules");
    updateSchedules.set(data);
    cnt++;
  };
  // getSchedules();

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
