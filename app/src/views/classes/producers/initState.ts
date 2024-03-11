import axios from "axios";

export const initState: producer = ({
  classes = observe.classes,
  updateNrOfStudents = update.classesDetails.nrOfStudents,
  updateIsStateInitiated = update.classesDetails.isStateInitiated,
}) => {
  let cnt = 0;
  const cntMaxVal = 1;
  const getClassNrOfStudents = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/classes/nrOfStudents`
    );
    console.log(">>>nrOfStudents initState: ", data);
    updateNrOfStudents.set(data);
    cnt++;
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
