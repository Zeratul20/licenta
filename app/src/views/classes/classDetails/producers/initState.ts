import axios from "axios";
import { makeApi } from "../../../../utils";

export const initState: producer = ({
  currentClass = observe.classDetails.class,
  updateClassTeachers = update.classDetails.teachers,
  updateIsStateInitiated = update.classDetails.isStateInitiated,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;
  const api = makeApi();
  const getClassTeachers = async () => {
    console.log(">>>currentClass", currentClass)
    if (!currentClass) {
      cnt++;
      return;
    }
    const { data } = await api.get(
      `/classes/${currentClass.classId}/teachers`
    );
    console.log(">>>currentClassTeachers: ", data)
    updateClassTeachers.set(data);
    cnt++;
  };
  getClassTeachers();
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
