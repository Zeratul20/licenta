import { makeApi } from "../../../utils";

export const initState: producer = ({
  updateRequests = update.requests.content,
  updateIsStateInitiated = update.requests.isStateInitiated,
  user = observe.user,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;
  const api = makeApi();
  const { userId } = user;
  const getRequestsForUser = async () => {
    try {
      const { data } = await api.get(`/requests/users/${userId}`);
      updateRequests.set(data);
      console.log("data", data);
      cnt++;
    } catch (e) {
      console.log("error", e);
      updateRequests.set([]);
    }
  };

  const getRequests = async () => {
    try {
      const { data } = await api.get(`/requests`);
      updateRequests.set(data);
      console.log("data", data);
      cnt++;
    } catch (e) {
      console.log("error", e);
      updateRequests.set([]);
    }
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
