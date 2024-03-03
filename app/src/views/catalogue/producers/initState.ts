import axios from "axios";

export const initState: producer = ({
  updateCatalogue = update.catalogue.catalogue,
  updateIsStateInitiated = update.messages.isStateInitiated,
  updateAbsences = update.catalogue.absences,
  user = observe.user,
  catalogueClass = observe.catalogue.class,
  getCatalogueTeacher = get.catalogue.teacher,
  getCatalogueStudent = get.catalogue.student,
}) => {
  const catalogueTeacher = getCatalogueTeacher.value();
  const catalogueStudent = getCatalogueStudent.value();

  if (!catalogueClass || !user) return;

  let cnt = 0;
  const cntMaxVal = 2;

  if (user.role === "teacher") {
    const getStudents = async () => {
      if (catalogueTeacher) {
        const { data: students } = await axios.get(
          `http://localhost:5000/api/students/catalogue/${catalogueTeacher.teacherId}/${catalogueClass.classId}`
        );
        console.log("students in getStudents: ", students);
        updateCatalogue.set(students);
      }
      cnt++;
    };
    getStudents();
  }
  if (user.role === "director") {
    const getStudents = async () => {
      const { data: students } = await axios.get(
        `http://localhost:5000/api/students/catalogue/${catalogueClass.classId}`
      );
      updateCatalogue.set(students);
      cnt++;
    };
    getStudents();
  }
  if (user.role === "student" || user.role === "parent") {
    const getStudents = async () => {
      if (catalogueStudent) {
        const { data: student } = await axios.get(
          `http://localhost:5000/api/students/${catalogueStudent.studentId}`
        );
        const studentsList = [student];
        updateCatalogue.set(studentsList);
      }
      cnt++;
    };
    getStudents();
  }

  const getAbsences = async () => {
    const { data: absences } = await axios.get(
      `http://localhost:5000/api/absences`
    );
    updateAbsences.set(absences);
    cnt++;
  };
  getAbsences();

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
