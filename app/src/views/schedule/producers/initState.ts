import axios from "axios";

export const initState: producer = ({
  updateSchedules = update.schedules,
  updateIsStateInitiated = update.schedule.isStateInitiated,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;

  const getSchedules = async () => {
    const { data } = await axios.get("http://localhost:5000/api/schedules");
    updateSchedules.set(data);
    console.log("data", data)
    cnt++;
  };
  getSchedules();

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
