import axios from "axios";

export const initState: producer = ({
  updateRequests = update.requests.content,
  updateIsStateInitiated = update.requests.isStateInitiated,
  user = observe.user,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;
  const { userId } = user;
  const getRequestsForUser = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/requests/users/${userId}`
    );
    updateRequests.set(data);
    console.log("data", data);
    cnt++;
  };

  const getRequests = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/requests/users/${userId}`
    );
    updateRequests.set(data);
    console.log("data", data);
    cnt++;
  };

  if (user.role !== "director") getRequestsForUser();
  else getRequests();

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
