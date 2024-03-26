import { makeApi } from "../../../utils";

export const initState: producer = ({
  updateMessages = update.messages.content,
  updateIsStateInitiated = update.messages.isStateInitiated,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;

  const api = makeApi();

  const getSchedules = async () => {
    const { data } = await api.get("/messages");
    updateMessages.set(data);
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
