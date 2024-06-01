import { makeApi } from "../../../utils";

export const initState: producer = ({
  classes = observe.classes,
  updateNrOfStudents = update.classesDetails.nrOfStudents,
  updateIsStateInitiated = update.classesDetails.isStateInitiated,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;
  const api = makeApi();
  const getClassNrOfStudents = async () => {
    try {
      const { data } = await api.get(`/classes/nrOfStudents`);
      console.log(">>>nrOfStudents initState: ", data);
      updateNrOfStudents.set(data);
      cnt++;
    } catch (e) {
      console.log("error", e);
      updateNrOfStudents.set([]);
    }
  };
  getClassNrOfStudents();
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
