import axios from "axios";

export const initState: producer = ({
  currentClass = observe.classDetails.class,
  updateClassTeachers = update.classDetails.teachers,
  updateIsStateInitiated = update.classDetails.isStateInitiated,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;
  const getClassTeachers = async () => {
    console.log(">>>currentClass", currentClass)
    if (!currentClass) {
      cnt++;
      return;
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/classes/${currentClass.classId}/teachers`
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
