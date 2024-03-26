import { makeApi } from "../../../utils";

export const initState: producer = ({
  updateSchedules = update.schedules,
  updateIsStateInitiated = update.schedule.isStateInitiated,
  updateScheduleTeacher = update.schedule.teacher,
  user = observe.user,
  getTeachersState = get.teachers,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;

  const api = makeApi();

  if (user.role !== "teacher") {
    const getSchedules = async () => {
      const { data } = await api.get("/schedules");
      updateSchedules.set(data);
      console.log("data", data);
      cnt++;
    };
    getSchedules();
  } else {
    const getScheduleForTeacher = async () => {
      const teachersState = getTeachersState.value();
      const { teacherId } = teachersState.find(
        (teacher: any) => teacher.userId === user.userId
      );
      const { data } = await api.get(
        `/schedules/teachers/${teacherId}`
      );
      updateScheduleTeacher.set(data);
      console.log("data", data);
      cnt++;
    };
    getScheduleForTeacher();
  }

  if (cnt < cntMaxVal) {
    let retries = 5;
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
